#!/bin/bash

# Exit the script if any command fails
set -e

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Installing Node.js dependencies..."
npm install

echo "All dependencies installed successfully!"
