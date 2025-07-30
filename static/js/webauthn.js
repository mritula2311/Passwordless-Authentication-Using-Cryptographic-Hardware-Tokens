/**
 * WebAuthn Helper Functions
 * Handles base64url encoding/decoding and WebAuthn credential conversion
 */

// Base64URL encoding functions
function base64URLToArrayBuffer(base64url) {
    // Add padding if necessary
    const padding = '='.repeat((4 - base64url.length % 4) % 4);
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/') + padding;
    
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes.buffer;
}

function arrayBufferToBase64URL(buffer) {
    const bytes = new Uint8Array(buffer);
    let binaryString = '';
    
    for (let i = 0; i < bytes.byteLength; i++) {
        binaryString += String.fromCharCode(bytes[i]);
    }
    
    const base64 = btoa(binaryString);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// WebAuthn support detection
function isWebAuthnSupported() {
    return !!(navigator.credentials && 
              navigator.credentials.create && 
              navigator.credentials.get && 
              window.PublicKeyCredential);
}

// Platform authenticator detection
async function isPlatformAuthenticatorAvailable() {
    if (!isWebAuthnSupported()) {
        return false;
    }
    
    try {
        return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    } catch (error) {
        console.error('Error checking platform authenticator:', error);
        return false;
    }
}

// Display WebAuthn support status
function displayWebAuthnStatus() {
    const supported = isWebAuthnSupported();
    const statusElement = document.getElementById('webauthn-status');
    
    if (statusElement) {
        if (supported) {
            statusElement.innerHTML = `
                <div class="alert alert-success">
                    <i class="fas fa-check-circle me-2"></i>
                    WebAuthn is supported in your browser
                </div>
            `;
            
            // Check for platform authenticator
            isPlatformAuthenticatorAvailable().then(available => {
                if (available) {
                    statusElement.innerHTML += `
                        <div class="alert alert-info mt-2">
                            <i class="fas fa-fingerprint me-2"></i>
                            Platform authenticator (biometrics) is available
                        </div>
                    `;
                }
            });
        } else {
            statusElement.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    WebAuthn is not supported in your browser. Please use a modern browser like Chrome, Firefox, Safari, or Edge.
                </div>
            `;
        }
    }
}

// Error handling for WebAuthn
function handleWebAuthnError(error) {
    console.error('WebAuthn error:', error);
    
    let message = 'An unknown error occurred';
    let type = 'danger';
    
    switch (error.name) {
        case 'NotAllowedError':
            message = 'The operation was cancelled or timed out. Please try again.';
            type = 'warning';
            break;
        case 'NotSupportedError':
            message = 'This device or browser does not support WebAuthn.';
            break;
        case 'SecurityError':
            message = 'A security error occurred. Please ensure you are on a secure connection (HTTPS).';
            break;
        case 'InvalidStateError':
            message = 'This authenticator is already registered or in an invalid state.';
            break;
        case 'ConstraintError':
            message = 'The authenticator does not meet the requirements.';
            break;
        case 'UnknownError':
            message = 'An unknown error occurred with the authenticator.';
            break;
        case 'NetworkError':
            message = 'A network error occurred. Please check your connection and try again.';
            break;
        default:
            if (error.message) {
                message = error.message;
            }
            break;
    }
    
    return { message, type };
}

// Show loading spinner
function showLoading(element, text = 'Loading...') {
    if (element) {
        element.innerHTML = `
            <div class="d-flex align-items-center justify-content-center">
                <div class="spinner-border spinner-border-sm me-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                ${text}
            </div>
        `;
        element.disabled = true;
    }
}

// Hide loading spinner
function hideLoading(element, originalText) {
    if (element) {
        element.innerHTML = originalText;
        element.disabled = false;
    }
}

// Format credential ID for display
function formatCredentialId(credentialId) {
    if (!credentialId) return 'Unknown';
    
    const maxLength = 16;
    if (credentialId.length <= maxLength) {
        return credentialId;
    }
    
    return credentialId.substring(0, maxLength) + '...';
}

// Get device type based on AAGUID or user agent
function getDeviceType(aaguid) {
    // Common AAGUIDs for known devices
    const knownDevices = {
        '00000000-0000-0000-0000-000000000000': 'Generic Authenticator',
        'adce0002-35bc-c60a-648b-0b25f1f05503': 'Chrome Touch ID',
        '08987058-cadc-4b81-b6e1-30de50dcbe96': 'Windows Hello',
        '9ddd1817-af5a-4672-a2b9-3e3dd95000a9': 'Windows Hello',
        'ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4': 'YubiKey 5 Series',
        '2fc0579f-8113-47ea-b116-bb5a8db9202a': 'YubiKey 5 Series',
        'c1f9a0bc-1dd2-404a-b27f-8e29047a43fd': 'YubiKey 5 FIPS Series'
    };
    
    if (aaguid && knownDevices[aaguid]) {
        return knownDevices[aaguid];
    }
    
    // Fallback to user agent detection
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome') && userAgent.includes('Mac')) {
        return 'Touch ID';
    } else if (userAgent.includes('Chrome') && userAgent.includes('Windows')) {
        return 'Windows Hello';
    } else if (userAgent.includes('Safari') && userAgent.includes('Mac')) {
        return 'Touch ID';
    } else if (userAgent.includes('Safari') && userAgent.includes('iPhone')) {
        return 'Face ID / Touch ID';
    }
    
    return 'Unknown Authenticator';
}

// Validate username
function validateUsername(username) {
    const errors = [];
    
    if (!username || username.trim().length === 0) {
        errors.push('Username is required');
    } else {
        const trimmed = username.trim();
        
        if (trimmed.length < 3) {
            errors.push('Username must be at least 3 characters long');
        }
        
        if (trimmed.length > 50) {
            errors.push('Username must be less than 50 characters long');
        }
        
        if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
            errors.push('Username can only contain letters, numbers, underscores, and hyphens');
        }
    }
    
    return errors;
}

// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    const toastId = 'toast-' + Date.now();
    const iconClass = {
        'success': 'fa-check-circle',
        'error': 'fa-exclamation-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    }[type] || 'fa-info-circle';
    
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast align-items-center text-white bg-${type === 'error' ? 'danger' : type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas ${iconClass} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast, {
        autohide: true,
        delay: 5000
    });
    
    bsToast.show();
    
    // Remove toast element after it's hidden
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

// Initialize WebAuthn status on page load
document.addEventListener('DOMContentLoaded', function() {
    // Display WebAuthn support status if there's a status element
    displayWebAuthnStatus();
    
    // Check if WebAuthn is supported and show warning if not
    if (!isWebAuthnSupported()) {
        const alerts = document.querySelectorAll('.alert-info');
        alerts.forEach(alert => {
            if (alert.textContent.includes('WebAuthn') || alert.textContent.includes('hardware token')) {
                alert.className = 'alert alert-warning';
                alert.innerHTML = `
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    <strong>WebAuthn not supported!</strong><br>
                    Your browser does not support WebAuthn. Please use Chrome 67+, Firefox 60+, Safari 14+, or Edge 18+.
                `;
            }
        });
    }
});

// Export functions for use in other scripts
window.WebAuthnHelpers = {
    base64URLToArrayBuffer,
    arrayBufferToBase64URL,
    isWebAuthnSupported,
    isPlatformAuthenticatorAvailable,
    handleWebAuthnError,
    showLoading,
    hideLoading,
    formatCredentialId,
    getDeviceType,
    validateUsername,
    showToast
};