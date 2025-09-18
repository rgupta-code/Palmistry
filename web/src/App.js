import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import AboutScreen from './screens/AboutScreen';
import './App.css';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [analysisData, setAnalysisData] = useState(null);

  const navigateTo = (screen, data = null) => {
    setCurrentScreen(screen);
    if (data) {
      setAnalysisData(data);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={navigateTo} />;
      case 'camera':
        return <CameraScreen onNavigate={navigateTo} />;
      case 'analysis':
        return <AnalysisScreen analysis={analysisData} onNavigate={navigateTo} />;
      case 'about':
        return <AboutScreen onNavigate={navigateTo} />;
      default:
        return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
};

export default App;
