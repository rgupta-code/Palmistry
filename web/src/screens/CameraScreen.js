import React, { useState, useRef } from 'react';
import './CameraScreen.css';

const CameraScreen = ({ onNavigate }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    try {
      // Convert base64 to blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('palmImage', blob, 'palm.jpg');

      const result = await fetch('http://localhost:3000/api/analyze-palm', {
        method: 'POST',
        body: formData,
      });

      const data = await result.json();

      if (data.success) {
        onNavigate('analysis', data.analysis);
      } else {
        alert('Analysis failed: ' + (data.error || 'Unable to analyze the palm image.'));
      }
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Error: ' + error.message || 'Failed to connect to the analysis service.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const goBack = () => {
    onNavigate('home');
  };

  return (
    <div className="camera-screen">
      <div className="gradient-bg">
        <div className="camera-container">
          {/* Header */}
          <div className="header">
            <button className="back-button" onClick={goBack}>
              ← Back
            </button>
            <h2 className="header-title">Palm Scanner</h2>
            <div className="placeholder"></div>
          </div>

          {/* Image Upload Area */}
          <div className="upload-area">
            {selectedImage ? (
              <div className="image-preview">
                <img src={selectedImage} alt="Selected palm" />
                <div className="image-overlay">
                  <div className="guide-frame">
                    <p className="guide-text">
                      Position your palm within the frame
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">📷</div>
                <h3>Upload Your Palm Photo</h3>
                <p>Click below to select a palm image from your computer</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button
                  className="gradient-button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Image
                </button>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="controls">
            {selectedImage && (
              <button
                className="gradient-button"
                onClick={analyzeImage}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="loading-spinner"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    🔍 Analyze Palm
                  </>
                )}
              </button>
            )}

            <button
              className="secondary-button"
              onClick={() => fileInputRef.current?.click()}
            >
              📁 Choose Different Image
            </button>
          </div>

          {/* Instructions */}
          <div className="instructions">
            <p className="instruction-text">
              {isAnalyzing
                ? 'Analyzing your palm with AI...'
                : 'Upload a clear photo of your palm for analysis'}
            </p>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner large"></div>
            <p>Analyzing your palm with AI...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraScreen;
