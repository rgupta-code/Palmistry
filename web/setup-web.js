#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌐 Setting up Palmistry AI Web App...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed:', nodeVersion);

// Install dependencies
console.log('\n📦 Installing web dependencies...');

try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Web dependencies installed successfully');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

console.log('\n🎉 Web setup completed!');
console.log('\n🚀 To start the web app:');
console.log('1. Make sure your backend is running: npm run backend');
console.log('2. Start the web app: npm start');
console.log('3. Open your browser to: http://localhost:3001');
console.log('\n📱 The web app will work in any modern browser!');
