const API_BASE_URL = 'http://localhost:3000';

export const analyzePalm = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('palmImage', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'palm.jpg',
    });

    const response = await fetch(`${API_BASE_URL}/api/analyze-palm`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to analyze palm image');
  }
};

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Health check error:', error);
    throw new Error('Backend service unavailable');
  }
};
