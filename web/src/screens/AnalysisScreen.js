import React, { useState } from 'react';
import './AnalysisScreen.css';

const AnalysisScreen = ({ analysis, onNavigate }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const shareAnalysis = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Palmistry Analysis',
          text: `Check out my palmistry analysis!\n\n${analysis}`,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`My Palmistry Analysis:\n\n${analysis}`);
      alert('Analysis copied to clipboard!');
    }
  };

  const goBack = () => {
    onNavigate('camera');
  };

  const goHome = () => {
    onNavigate('home');
  };

  const sections = [
    {
      title: 'Hand Shape',
      content: 'Your hand shape indicates your basic personality type and approach to life.',
      icon: '🖐️',
      color: '#ff6b6b'
    },
    {
      title: 'Palm Lines',
      content: 'The major lines on your palm reveal insights about your life path, relationships, and career.',
      icon: '📏',
      color: '#4ecdc4'
    },
    {
      title: 'Mount Analysis',
      content: 'The mounts on your palm represent different aspects of your personality and talents.',
      icon: '🏔️',
      color: '#45b7d1'
    },
    {
      title: 'Finger Analysis',
      content: 'Your fingers reveal details about your communication style and decision-making process.',
      icon: '👆',
      color: '#f9ca24'
    },
    {
      title: 'Personality Traits',
      content: 'Your palm reveals key personality characteristics and behavioral patterns.',
      icon: '🧠',
      color: '#6c5ce7'
    },
    {
      title: 'Career Insights',
      content: 'Career guidance based on your palm\'s unique features and characteristics.',
      icon: '💼',
      color: '#a29bfe'
    },
    {
      title: 'Relationship Insights',
      content: 'What your palm reveals about your approach to love and relationships.',
      icon: '💕',
      color: '#fd79a8'
    },
    {
      title: 'Health Indicators',
      content: 'Health-related insights that may be visible in your palm features.',
      icon: '🏥',
      color: '#00b894'
    }
  ];

  const SectionCard = ({ section }) => {
    const isExpanded = expandedSections[section.title];
    
    return (
      <div 
        className={`section-card ${isExpanded ? 'expanded' : ''}`}
        style={{ borderLeftColor: section.color }}
        onClick={() => toggleSection(section.title)}
      >
        <div className="section-header">
          <div className="section-title-container">
            <span className="section-icon">{section.icon}</span>
            <h3 className="section-title">{section.title}</h3>
          </div>
          <span className="expand-icon">
            {isExpanded ? '▲' : '▼'}
          </span>
        </div>
        {isExpanded && (
          <div className="section-content">
            <p className="section-text">{section.content}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="analysis-screen">
      <div className="gradient-bg">
        <div className="analysis-container">
          {/* Header */}
          <div className="header">
            <button className="back-button" onClick={goBack}>
              ← Back
            </button>
            <h2 className="header-title">Palm Analysis</h2>
            <button className="share-button" onClick={shareAnalysis}>
              📤 Share
            </button>
          </div>

          {/* Main Analysis */}
          <div className="main-analysis-card">
            <div className="analysis-icon">🧠</div>
            <h2 className="main-title">Your Palm Reading</h2>
            <p className="main-description">
              Based on advanced AI analysis of your palm features
            </p>
          </div>

          {/* AI Analysis Text */}
          <div className="analysis-text-container">
            <p className="analysis-text">{analysis}</p>
          </div>

          {/* Section Cards */}
          <div className="sections-container">
            <h3 className="sections-title">Detailed Analysis</h3>
            {sections.map((section, index) => (
              <SectionCard key={index} section={section} />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="gradient-button"
              onClick={() => onNavigate('camera')}
            >
              📸 Scan Again
            </button>

            <button
              className="secondary-button"
              onClick={goHome}
            >
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisScreen;
