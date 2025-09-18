const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const axios = require('axios');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_VISION_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const GEMINI_TEXT_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Image processing function
async function processImage(imageBuffer) {
  try {
    // Resize and optimize image for better API performance
    const processedImage = await sharp(imageBuffer)
      .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 85 })
      .toBuffer();
    
    return processedImage.toString('base64');
  } catch (error) {
    throw new Error('Image processing failed: ' + error.message);
  }
}

// Palmistry analysis function
async function analyzePalm(imageBase64) {
  try {
    const prompt = `Analyze this palm image for palmistry features. Please provide a detailed palm reading including:

1. Hand shape and size analysis
2. Major palm lines (heart line, head line, life line, fate line)
3. Mount analysis (Venus, Jupiter, Saturn, Apollo, Mercury, Mars, Moon)
4. Finger analysis (length, shape, characteristics)
5. Personality traits and behavioral patterns
6. Career and relationship insights
7. Health indicators

Please provide a comprehensive, professional palmistry analysis in a clear, structured format.`;

    const requestBody = {
      contents: [{
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: imageBase64
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    const response = await axios.post(
      `${GEMINI_VISION_URL}?key=${GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000
      }
    );

    if (!response.data || !response.data.candidates || !response.data.candidates[0]) {
      throw new Error('Invalid response from Gemini API');
    }

    return response.data;
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    
    // Check if it's a model not found error
    if (error.response?.data?.error?.message?.includes('not found')) {
      console.log('Vision model not available, providing general palmistry reading...');
      return provideGeneralPalmistryReading();
    }
    
    throw new Error('Palmistry analysis failed: ' + (error.response?.data?.error?.message || error.message));
  }
}

// Fallback function for general palmistry reading
async function provideGeneralPalmistryReading() {
  try {
    const prompt = `Provide a comprehensive general palmistry reading that covers:

1. Hand shape and size analysis
2. Major palm lines (heart line, head line, life line, fate line)
3. Mount analysis (Venus, Jupiter, Saturn, Apollo, Mercury, Mars, Moon)
4. Finger analysis (length, shape, characteristics)
5. Personality traits and behavioral patterns
6. Career and relationship insights
7. Health indicators

Please provide detailed, professional palmistry insights that would be helpful for someone learning about palm reading.`;

    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    const response = await axios.post(
      `${GEMINI_TEXT_URL}?key=${GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000
      }
    );

    if (!response.data || !response.data.candidates || !response.data.candidates[0]) {
      throw new Error('Invalid response from Gemini API');
    }

    return response.data;
  } catch (error) {
    console.error('Fallback Gemini API Error:', error.response?.data || error.message);
    throw new Error('Palmistry analysis failed: ' + (error.response?.data?.error?.message || error.message));
  }
}

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Palmistry API is running' });
});

app.post('/api/analyze-palm', upload.single('palmImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    // Process the image
    const processedImage = await processImage(req.file.buffer);
    
    // Analyze with Gemini
    const analysis = await analyzePalm(processedImage);

    res.json({
      success: true,
      analysis: analysis.candidates[0]?.content?.parts[0]?.text || 'Analysis completed',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Palmistry API server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
