#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Palmistry AI App...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed:', nodeVersion);

// Create backend .env file if it doesn't exist
const envPath = path.join(__dirname, 'backend', '.env');
const envExamplePath = path.join(__dirname, 'backend', 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created backend/.env file from template');
    console.log('⚠️  Please add your Gemini API key to backend/.env');
  } else {
    console.log('⚠️  Please create backend/.env file with your Gemini API key');
  }
} else {
  console.log('✅ Backend .env file already exists');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');

try {
  console.log('Installing frontend dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Installing backend dependencies...');
  execSync('npm install', { cwd: path.join(__dirname, 'backend'), stdio: 'inherit' });
  
  console.log('✅ All dependencies installed successfully');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Check for required tools
console.log('\n🔧 Checking development environment...');

try {
  // Check if React Native CLI is available
  execSync('npx react-native --version', { stdio: 'pipe' });
  console.log('✅ React Native CLI is available');
} catch (error) {
  console.log('⚠️  React Native CLI not found. Installing globally...');
  try {
    execSync('npm install -g @react-native-community/cli', { stdio: 'inherit' });
    console.log('✅ React Native CLI installed');
  } catch (installError) {
    console.log('⚠️  Please install React Native CLI manually: npm install -g @react-native-community/cli');
  }
}

// Platform-specific setup
const platform = process.platform;
console.log(`\n📱 Platform detected: ${platform}`);

if (platform === 'darwin') {
  console.log('🍎 iOS setup:');
  console.log('   - Make sure Xcode is installed');
  console.log('   - Run: cd ios && pod install');
} else if (platform === 'win32') {
  console.log('🪟 Windows setup:');
  console.log('   - Make sure Android Studio is installed');
  console.log('   - Set up Android SDK and environment variables');
} else {
  console.log('🐧 Linux setup:');
  console.log('   - Make sure Android Studio is installed');
  console.log('   - Set up Android SDK and environment variables');
}

console.log('\n🎉 Setup completed! Next steps:');
console.log('1. Add your Gemini API key to backend/.env');
console.log('2. Start the backend: npm run backend');
console.log('3. Start the frontend: npm start');
console.log('4. Run the app: npm run android (or npm run ios)');
console.log('\n📚 For detailed instructions, see README.md');

console.log('\n🔑 To get a Gemini API key:');
console.log('1. Visit: https://makersuite.google.com/app/apikey');
console.log('2. Create a new API key');
console.log('3. Add it to backend/.env as GEMINI_API_KEY=your_key_here');
