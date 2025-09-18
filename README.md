# Palmistry AI App

A modern, interactive palmistry application that uses AI to analyze palm features and provide detailed palmistry insights. Built with React Native and Node.js, powered by Google Gemini AI.

## 🌟 Features

- **AI-Powered Analysis**: Advanced palm reading using Google Gemini AI
- **Modern UI**: Beautiful gradients, smooth animations, and intuitive design
- **Camera Integration**: Real-time palm scanning with guide overlay
- **Gallery Support**: Upload existing palm photos for analysis
- **Detailed Insights**: Comprehensive analysis including:
  - Hand shape and size analysis
  - Major palm lines (heart, head, life, fate lines)
  - Mount analysis (Venus, Jupiter, Saturn, Apollo, Mercury, Mars, Moon)
  - Finger analysis and characteristics
  - Personality traits and behavioral patterns
  - Career and relationship predictions
  - Health indicators

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd palmistry-app
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp backend/env.example backend/.env
   
   # Edit backend/.env and add your Gemini API key
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   # Backend (Terminal 1)
   npm run backend
   
   # Frontend (Terminal 2)
   npm start
   ```

5. **Run the app**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   ```

## 🔧 Configuration

### Backend Configuration

The backend server runs on port 3000 by default. You can configure this in `backend/.env`:

```env
PORT=3000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```

### API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/analyze-palm` - Analyze palm image (multipart/form-data)

### Frontend Configuration

The React Native app is configured to connect to `http://localhost:3000` for the backend API. For production, update the API URL in the camera screen.

## 📱 App Structure

```
src/
├── screens/
│   ├── HomeScreen.js      # Main landing screen
│   ├── CameraScreen.js    # Camera interface for palm scanning
│   ├── AnalysisScreen.js  # Results display and detailed analysis
│   └── AboutScreen.js     # Information about palmistry and app features
├── components/            # Reusable UI components (if any)
└── utils/                 # Utility functions (if any)
```

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful color gradients throughout the app
- **Smooth Animations**: Fade-in, slide, and scale animations
- **Modern UI Elements**: Rounded corners, shadows, and modern styling
- **Responsive Design**: Adapts to different screen sizes
- **Intuitive Navigation**: Easy-to-use navigation between screens

## 🔍 How It Works

1. **Palm Scanning**: Users can either take a photo using the camera or select from gallery
2. **Image Processing**: The backend processes and optimizes the image for AI analysis
3. **AI Analysis**: Google Gemini AI analyzes the palm features and provides insights
4. **Results Display**: Detailed analysis is presented in an organized, expandable format
5. **Sharing**: Users can share their palmistry analysis with others

## 🛠️ Technical Stack

### Frontend
- React Native 0.72.6
- React Navigation 6
- React Native Camera
- React Native Linear Gradient
- React Native Vector Icons
- React Native Reanimated
- React Native Gesture Handler

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- Sharp (image processing)
- Axios (HTTP client)
- Google Gemini AI API

## 📋 Requirements

### Android
- Android 6.0 (API level 23) or higher
- Camera permission
- Storage permission

### iOS
- iOS 11.0 or higher
- Camera usage permission
- Photo library access permission

## 🔐 Security

- Image processing is done server-side
- No images are stored permanently
- API keys are kept secure in environment variables
- Input validation and error handling

## 🚀 Deployment

### Backend Deployment

1. Deploy to your preferred cloud provider (Heroku, AWS, DigitalOcean, etc.)
2. Set environment variables in your deployment platform
3. Update the API URL in the React Native app

### Mobile App Deployment

1. Build the app for production
2. Test on physical devices
3. Deploy to app stores (Google Play Store, Apple App Store)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

## ⚠️ Disclaimer

Palmistry readings provided by this app are for entertainment purposes only and should not be considered as professional advice for health, financial, or personal decisions. The app uses AI technology to provide insights based on traditional palmistry principles, but results should be taken with appropriate skepticism.

---

**Built with ❤️ using React Native and Google Gemini AI**
