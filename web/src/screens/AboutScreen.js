import React from 'react';
import './AboutScreen.css';

const AboutScreen = ({ onNavigate }) => {
  const features = [
    {
      icon: '🧠',
      title: 'AI-Powered Analysis',
      description: 'Advanced artificial intelligence analyzes your palm features using Google Gemini technology.',
      color: '#ff6b6b'
    },
    {
      icon: '📏',
      title: 'Detailed Palm Reading',
      description: 'Comprehensive analysis of palm lines, mounts, and finger characteristics.',
      color: '#4ecdc4'
    },
    {
      icon: '💕',
      title: 'Love & Relationships',
      description: 'Insights into your romantic life and relationship patterns.',
      color: '#fd79a8'
    },
    {
      icon: '💼',
      title: 'Career Guidance',
      description: 'Professional insights and career path recommendations.',
      color: '#f9ca24'
    },
    {
      icon: '🏥',
      title: 'Health Indicators',
      description: 'Health-related insights visible in your palm features.',
      color: '#00b894'
    },
    {
      icon: '🧠',
      title: 'Personality Analysis',
      description: 'Deep dive into your personality traits and behavioral patterns.',
      color: '#6c5ce7'
    }
  ];

  const steps = [
    'Take a clear photo of your palm',
    'AI analyzes your palm features',
    'Receive detailed palmistry insights'
  ];

  const goBack = () => {
    onNavigate('home');
  };

  const startReading = () => {
    onNavigate('camera');
  };

  return (
    <div className="about-screen">
      <div className="gradient-bg">
        <div className="about-container">
          {/* Header */}
          <div className="header">
            <button className="back-button" onClick={goBack}>
              ← Back
            </button>
            <h2 className="header-title">About Palmistry</h2>
            <div className="placeholder"></div>
          </div>

          <div className="content">
            {/* Hero Section */}
            <div className="hero-section">
              <div className="hero-icon">🖐️</div>
              <h1 className="hero-title">Palmistry AI</h1>
              <p className="hero-subtitle">
                Discover the ancient art of palm reading with modern AI technology
              </p>
            </div>

            {/* About Section */}
            <div className="about-section">
              <h3 className="section-title">What is Palmistry?</h3>
              <p className="about-text">
                Palmistry, also known as chiromancy, is the ancient practice of analyzing the lines, 
                shapes, and features of the human palm to gain insights into personality traits, 
                life events, and future possibilities. Our app combines this traditional wisdom 
                with cutting-edge artificial intelligence to provide accurate and detailed palm readings.
              </p>
            </div>

            {/* Features Section */}
            <div className="features-section">
              <h3 className="section-title">App Features</h3>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div 
                      className="feature-icon"
                      style={{ backgroundColor: feature.color + '20' }}
                    >
                      {feature.icon}
                    </div>
                    <h4 className="feature-title">{feature.title}</h4>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works Section */}
            <div className="how-it-works-section">
              <h3 className="section-title">How It Works</h3>
              <div className="steps-container">
                {steps.map((step, index) => (
                  <div key={index} className="step">
                    <div className="step-number">
                      {index + 1}
                    </div>
                    <p className="step-text">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Section */}
            <div className="technology-section">
              <h3 className="section-title">Powered by AI</h3>
              <p className="technology-text">
                Our app uses Google's Gemini AI to analyze palm images with unprecedented accuracy. 
                The AI examines various palm features including lines, mounts, finger shapes, and 
                overall hand structure to provide comprehensive palmistry readings.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="disclaimer-section">
              <div className="disclaimer-icon">⚠️</div>
              <p className="disclaimer-text">
                Palmistry readings are for entertainment purposes only and should not be 
                considered as professional advice for health, financial, or personal decisions.
              </p>
            </div>

            {/* Action Button */}
            <div className="action-section">
              <button
                className="gradient-button"
                onClick={startReading}
              >
                📸 Start Your Reading
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
