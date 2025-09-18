#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Running post-install setup...');

// Check if we're on macOS and if iOS directory exists
const isMacOS = process.platform === 'darwin';
const iosDir = path.join(__dirname, '..', 'ios');

if (isMacOS && fs.existsSync(iosDir)) {
  console.log('🍎 macOS detected - installing iOS dependencies...');
  try {
    // Check if pod is available
    execSync('which pod', { stdio: 'pipe' });
    console.log('Installing CocoaPods dependencies...');
    execSync('cd ios && pod install', { stdio: 'inherit' });
    console.log('✅ iOS dependencies installed successfully');
  } catch (error) {
    console.log('⚠️  CocoaPods not found. Please install it first:');
    console.log('   sudo gem install cocoapods');
    console.log('   Then run: cd ios && pod install');
  }
} else if (!isMacOS) {
  console.log('🪟 Windows/Linux detected - skipping iOS setup');
  console.log('   iOS development requires macOS with Xcode');
} else {
  console.log('📱 No iOS directory found - skipping iOS setup');
}

console.log('✅ Post-install setup completed');
