# Passwordless Authentication Using Cryptographic Hardware Tokens

A modern, secure passwordless authentication system built with **FIDO2/WebAuthn** that supports cryptographic hardware tokens like YubiKey, TPM, and smartphone biometrics. This implementation provides phishing-resistant authentication using public key cryptography.

![Passwordless Authentication Demo](https://img.shields.io/badge/Security-FIDO2%2FWebAuthn-green)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![Flask](https://img.shields.io/badge/Framework-Flask-red)

## 🔒 Security Features

- **Passwordless Authentication**: No passwords to remember, manage, or steal
- **Phishing Resistant**: Hardware-backed challenge-response prevents replay attacks
- **FIDO2/WebAuthn Standard**: Industry-standard authentication protocol
- **Hardware Security**: Private keys never leave the secure hardware
- **Multi-Device Support**: YubiKey, TPM, Touch ID, Face ID, Windows Hello
- **Zero Knowledge**: Server never sees or stores authentication secrets

## 🚀 Quick Start

### Prerequisites

- Python 3.11 or higher
- Modern web browser with WebAuthn support (Chrome 67+, Firefox 60+, Safari 14+, Edge 18+)
- Hardware authenticator (YubiKey, smartphone with biometrics, or built-in platform authenticator)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mritula2311/Passwordless-Authentication-Using-Cryptographic-Hardware-Tokens.git
   cd Passwordless-Authentication-Using-Cryptographic-Hardware-Tokens
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

## 🐳 Docker Deployment

### Quick Start with Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run with Docker
docker build -t passwordless-auth .
docker run -p 5000:5000 passwordless-auth
```

### Production Deployment

```bash
# Use production profile with nginx
docker-compose --profile production up -d
```

## 🛠 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Flask secret key for sessions | Required |
| `RP_ID` | Relying Party ID (domain) | `localhost` |
| `RP_NAME` | Display name for your service | `Passwordless Authentication Demo` |
| `ORIGIN` | Expected origin for WebAuthn | `http://localhost:5000` |
| `FLASK_ENV` | Flask environment | `production` |

### HTTPS Requirements

For production deployment, HTTPS is required for WebAuthn. Update your configuration:

```bash
export RP_ID=yourdomain.com
export ORIGIN=https://yourdomain.com
```

## 📱 Supported Devices

| Device Type | Platform | Description |
|-------------|----------|-------------|
| **YubiKey** | All | USB/NFC security keys with FIDO2 support |
| **Touch ID** | macOS/iOS | Apple's fingerprint authentication |
| **Face ID** | iOS | Apple's facial recognition |
| **Windows Hello** | Windows | Fingerprint, face, or PIN authentication |
| **Android Biometrics** | Android | Fingerprint or face authentication |
| **Built-in TPM** | Windows/Linux | Trusted Platform Module chips |

## 🔄 Authentication Flow

### Registration Process

1. **User Input**: Enter username and display name
2. **Key Generation**: Hardware token generates asymmetric key pair
3. **Public Key Storage**: Server stores public key, private key stays on device
4. **User Verification**: Physical authentication (touch, biometric, PIN)
5. **Completion**: Account created and linked to hardware token

### Login Process

1. **Username Entry**: User enters their username
2. **Challenge Generation**: Server creates cryptographic challenge
3. **Hardware Signing**: Device signs challenge with private key
4. **Verification**: Server verifies signature with stored public key
5. **Access Granted**: User authenticated and logged in

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Browser   │    │  Flask Server   │    │    Database     │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │  WebAuthn   │◄├────┤ │  WebAuthn   │ │    │ │    Users    │ │
│ │   Client    │ │    │ │   Server    │◄├────┤ │             │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ │ Credentials │ │
│        │        │    │        │        │    │ └─────────────┘ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    └─────────────────┘
│ │  Hardware   │ │    │ │  Challenge  │ │
│ │Authenticator│ │    │ │ Generation  │ │
│ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
├── .env.example          # Environment variables template
├── templates/            # HTML templates
│   ├── base.html         # Base template
│   ├── index.html        # Homepage
│   ├── register.html     # Registration page
│   ├── login.html        # Login page
│   └── dashboard.html    # User dashboard
├── static/              # Static assets
│   ├── css/
│   │   └── style.css    # Custom styles
│   └── js/
│       └── webauthn.js  # WebAuthn helper functions
└── README.md           # This file
```

## 🧪 Testing

### Manual Testing

1. **Registration Test**
   - Go to `/register`
   - Enter a username
   - Follow hardware authentication prompts
   - Verify account creation

2. **Login Test**
   - Go to `/login`
   - Enter your username
   - Authenticate with hardware token
   - Verify dashboard access

3. **Browser Compatibility**
   - Test with Chrome, Firefox, Safari, Edge
   - Verify WebAuthn API availability
   - Test on mobile devices

### Security Testing

- **Phishing Resistance**: Try authentication on different domains
- **Replay Protection**: Verify challenges are unique and time-limited
- **Device Binding**: Ensure credentials work only on registered devices

## 🔧 Troubleshooting

### Common Issues

1. **WebAuthn Not Supported**
   - Update to a modern browser
   - Ensure HTTPS in production
   - Check browser console for errors

2. **Authentication Fails**
   - Verify hardware token is working
   - Check USB connection for YubiKey
   - Ensure biometrics are set up

3. **HTTPS Required Error**
   - Use localhost for development
   - Set up SSL certificate for production
   - Update ORIGIN environment variable

### Debug Mode

Enable debug logging:

```bash
export FLASK_ENV=development
python app.py
```

## 🚀 Production Deployment

### Requirements

- HTTPS certificate (Let's Encrypt recommended)
- Domain name configured in DNS
- Hardware load balancer (optional)
- Database backup strategy

### Steps

1. **Configure Environment**
   ```bash
   export SECRET_KEY="$(openssl rand -hex 32)"
   export RP_ID="yourdomain.com"
   export ORIGIN="https://yourdomain.com"
   export FLASK_ENV="production"
   ```

2. **Set up SSL**
   ```bash
   # Using certbot for Let's Encrypt
   certbot --nginx -d yourdomain.com
   ```

3. **Deploy with Docker**
   ```bash
   docker-compose --profile production up -d
   ```

## 📖 API Documentation

### Registration Endpoints

- `POST /api/register/begin` - Start registration process
- `POST /api/register/complete` - Complete registration

### Authentication Endpoints

- `POST /api/authenticate/begin` - Start authentication
- `POST /api/authenticate/complete` - Complete authentication

### User Management

- `GET /api/user/credentials` - List user's registered devices
- `POST /api/logout` - Sign out user

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 References

- [FIDO Alliance](https://fidoalliance.org/)
- [WebAuthn Specification](https://www.w3.org/TR/webauthn/)
- [YubiKey Developer Docs](https://developers.yubico.com/)
- [MDN WebAuthn Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)

## 🛡 Security Considerations

- Always use HTTPS in production
- Regularly update dependencies
- Implement proper session management
- Monitor for suspicious authentication attempts
- Have a device recovery process for users
- Implement proper logging and monitoring

---

**Built with ❤️ for a passwordless future**