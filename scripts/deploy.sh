#!/bin/sh

# Example deployment script
echo "Starting deployment..."

# Stop the existing application
echo "Stopping existing application..."
pm2 stop all

# Pull the latest changes from the repository
echo "Pulling latest changes..."
git pull origin main

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building application..."
npm run build

# Start the application
echo "Starting application..."
pm2 start npm --name "BizFind" -- start

echo "Deployment completed successfully."
