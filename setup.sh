#!/bin/bash

# Passwordless Authentication Setup Script

set -e

echo "🔐 Setting up Passwordless Authentication System..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed. Please install Python 3.11 or higher."
    exit 1
fi

# Check Python version
PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
REQUIRED_VERSION="3.11"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$PYTHON_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Python $REQUIRED_VERSION or higher is required. You have Python $PYTHON_VERSION."
    exit 1
fi

echo "✅ Python $PYTHON_VERSION detected"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️  Creating environment configuration..."
    cp .env.example .env
    
    # Generate a secure secret key
    SECRET_KEY=$(python3 -c 'import secrets; print(secrets.token_hex(32))')
    sed -i "s/your-very-long-and-secure-secret-key-change-this-in-production/$SECRET_KEY/" .env
    
    echo "🔑 Generated secure secret key"
fi

# Create data directory
mkdir -p data

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "  1. Activate the virtual environment: source venv/bin/activate"
echo "  2. Run the application: python app.py"
echo "  3. Open your browser to: http://localhost:5000"
echo ""
echo "🔒 Make sure you have a hardware authenticator ready:"
echo "  • YubiKey (USB/NFC)"
echo "  • Smartphone with biometrics"
echo "  • Built-in platform authenticator (Touch ID, Windows Hello, etc.)"
echo ""
echo "📖 For more information, see README.md"