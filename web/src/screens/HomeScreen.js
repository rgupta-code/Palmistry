import React, { useEffect, useState } from 'react';
import './HomeScreen.css';

const HomeScreen = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`home-screen ${isVisible ? 'fade-in' : ''}`}>
      <div className="gradient-bg">
        <div className="content">
          {/* Header */}
          <div className="header">
            <div className="icon">🖐️</div>
            <h1 className="title">Palmistry AI</h1>
            <p className="subtitle">
              Discover your destiny through the ancient art of palm reading
            </p>
          </div>

          {/* Features */}
          <div className="features-container">
            <div className="feature-item">
              <div className="feature-icon">📸</div>
              <span className="feature-text">AI-Powered Analysis</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🧠</div>
              <span className="feature-text">Detailed Insights</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💕</div>
              <span className="feature-text">Love & Career</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="button-container">
            <button
              className="gradient-button"
              onClick={() => onNavigate('camera')}
            >
              📸 Scan Your Palm
            </button>

            <button
              className="secondary-button"
              onClick={() => onNavigate('about')}
            >
              ℹ️ About Palmistry
            </button>
          </div>

          {/* Footer */}
          <div className="footer">
            <p className="footer-text">
              Powered by Google Gemini AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
