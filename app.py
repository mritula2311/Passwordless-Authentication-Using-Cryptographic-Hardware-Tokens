import os
import base64
import secrets
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from webauthn import generate_registration_options, verify_registration_response, generate_authentication_options, verify_authentication_response
from webauthn.helpers.structs import (
    RegistrationCredential,
    AuthenticationCredential,
    UserVerificationRequirement,
    AttestationConveyancePreference,
    AuthenticatorSelectionCriteria,
    ResidentKeyRequirement,
)
from webauthn.helpers.cose import COSEAlgorithmIdentifier
from webauthn.helpers.exceptions import InvalidRegistrationResponse, InvalidAuthenticationResponse
import json
from datetime import datetime

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', secrets.token_hex(32))

# Database configuration
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "passwordless_auth.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# WebAuthn configuration
RP_ID = os.environ.get('RP_ID', 'localhost')
RP_NAME = os.environ.get('RP_NAME', 'Passwordless Authentication Demo')
ORIGIN = os.environ.get('ORIGIN', 'http://localhost:5000')

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    user_id = db.Column(db.String(64), unique=True, nullable=False)
    display_name = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    credentials = db.relationship('Credential', backref='user', lazy=True, cascade='all, delete-orphan')

class Credential(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    credential_id = db.Column(db.LargeBinary, nullable=False)
    public_key = db.Column(db.LargeBinary, nullable=False)
    sign_count = db.Column(db.Integer, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    aaguid = db.Column(db.String(36))
    authenticator_name = db.Column(db.String(100))

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('index'))
    
    user = User.query.filter_by(user_id=session['user_id']).first()
    if not user:
        session.pop('user_id', None)
        return redirect(url_for('index'))
    
    return render_template('dashboard.html', user=user)

# WebAuthn API Routes
@app.route('/api/register/begin', methods=['POST'])
def register_begin():
    data = request.get_json()
    username = data.get('username')
    display_name = data.get('displayName', username)
    
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    # Check if user already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'User already exists'}), 400
    
    # Generate user ID
    user_id = base64.urlsafe_b64encode(secrets.token_bytes(32)).decode('utf-8').rstrip('=')
    
    # Store user data in session for completion
    session['pending_user'] = {
        'username': username,
        'user_id': user_id,
        'display_name': display_name
    }
    
    # Generate registration options
    options = generate_registration_options(
        rp_id=RP_ID,
        rp_name=RP_NAME,
        user_id=user_id.encode('utf-8'),
        user_name=username,
        user_display_name=display_name,
        attestation=AttestationConveyancePreference.DIRECT,
        authenticator_selection=AuthenticatorSelectionCriteria(
            resident_key=ResidentKeyRequirement.PREFERRED,
            user_verification=UserVerificationRequirement.PREFERRED,
        ),
        supported_pub_key_algs=[
            COSEAlgorithmIdentifier.ECDSA_SHA_256,
            COSEAlgorithmIdentifier.RSASSA_PKCS1_v1_5_SHA_256,
        ],
    )
    
    # Store challenge in session
    session['challenge'] = base64.urlsafe_b64encode(options.challenge).decode('utf-8').rstrip('=')
    
    return jsonify(options)

@app.route('/api/register/complete', methods=['POST'])
def register_complete():
    if 'pending_user' not in session or 'challenge' not in session:
        return jsonify({'error': 'No pending registration'}), 400
    
    data = request.get_json()
    pending_user = session['pending_user']
    
    try:
        # Parse the credential
        credential = RegistrationCredential.parse_raw(json.dumps(data))
        
        # Verify the registration response
        verification = verify_registration_response(
            credential=credential,
            expected_challenge=base64.urlsafe_b64decode(session['challenge'] + '=='),
            expected_origin=ORIGIN,
            expected_rp_id=RP_ID,
        )
        
        if verification.verified:
            # Create new user
            user = User(
                username=pending_user['username'],
                user_id=pending_user['user_id'],
                display_name=pending_user['display_name']
            )
            db.session.add(user)
            db.session.flush()  # Get the user ID
            
            # Store the credential
            credential_entry = Credential(
                credential_id=verification.credential_id,
                public_key=verification.credential_public_key,
                sign_count=verification.sign_count,
                user_id=user.id,
                aaguid=str(verification.aaguid) if verification.aaguid else None
            )
            db.session.add(credential_entry)
            db.session.commit()
            
            # Clean up session
            session.pop('pending_user', None)
            session.pop('challenge', None)
            
            return jsonify({'verified': True, 'message': 'Registration successful'})
        else:
            return jsonify({'error': 'Registration verification failed'}), 400
            
    except InvalidRegistrationResponse as e:
        return jsonify({'error': f'Registration failed: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

@app.route('/api/authenticate/begin', methods=['POST'])
def authenticate_begin():
    data = request.get_json()
    username = data.get('username')
    
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    
    # Find user
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Get user's credentials
    credentials = Credential.query.filter_by(user_id=user.id).all()
    if not credentials:
        return jsonify({'error': 'No credentials found for user'}), 404
    
    # Prepare allowed credentials
    allowed_credentials = [
        {
            'id': base64.urlsafe_b64encode(cred.credential_id).decode('utf-8').rstrip('='),
            'type': 'public-key'
        }
        for cred in credentials
    ]
    
    # Generate authentication options
    options = generate_authentication_options(
        rp_id=RP_ID,
        allow_credentials=allowed_credentials,
        user_verification=UserVerificationRequirement.PREFERRED,
    )
    
    # Store challenge and user info in session
    session['challenge'] = base64.urlsafe_b64encode(options.challenge).decode('utf-8').rstrip('=')
    session['authenticating_user'] = user.user_id
    
    return jsonify(options)

@app.route('/api/authenticate/complete', methods=['POST'])
def authenticate_complete():
    if 'challenge' not in session or 'authenticating_user' not in session:
        return jsonify({'error': 'No pending authentication'}), 400
    
    data = request.get_json()
    user_id = session['authenticating_user']
    
    try:
        # Find user and credential
        user = User.query.filter_by(user_id=user_id).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Parse the credential
        credential = AuthenticationCredential.parse_raw(json.dumps(data))
        
        # Find the credential in database
        credential_id = base64.urlsafe_b64decode(credential.raw_id + '==')
        stored_credential = Credential.query.filter_by(credential_id=credential_id).first()
        
        if not stored_credential:
            return jsonify({'error': 'Credential not found'}), 404
        
        # Verify the authentication response
        verification = verify_authentication_response(
            credential=credential,
            expected_challenge=base64.urlsafe_b64decode(session['challenge'] + '=='),
            expected_origin=ORIGIN,
            expected_rp_id=RP_ID,
            credential_public_key=stored_credential.public_key,
            credential_current_sign_count=stored_credential.sign_count,
        )
        
        if verification.verified:
            # Update sign count
            stored_credential.sign_count = verification.new_sign_count
            db.session.commit()
            
            # Set user session
            session['user_id'] = user.user_id
            session.pop('challenge', None)
            session.pop('authenticating_user', None)
            
            return jsonify({'verified': True, 'message': 'Authentication successful'})
        else:
            return jsonify({'error': 'Authentication verification failed'}), 400
            
    except InvalidAuthenticationResponse as e:
        return jsonify({'error': f'Authentication failed: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Unexpected error: {str(e)}'}), 500

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'})

@app.route('/api/user/credentials')
def user_credentials():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    
    user = User.query.filter_by(user_id=session['user_id']).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    credentials = []
    for cred in user.credentials:
        credentials.append({
            'id': base64.urlsafe_b64encode(cred.credential_id).decode('utf-8').rstrip('='),
            'created_at': cred.created_at.isoformat(),
            'aaguid': cred.aaguid,
            'authenticator_name': cred.authenticator_name or 'Unknown Authenticator'
        })
    
    return jsonify({'credentials': credentials})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(debug=True, host='0.0.0.0', port=5000)