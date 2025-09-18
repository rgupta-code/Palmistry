import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { analyzePalm } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const { width, height } = Dimensions.get('window');

const CameraScreen = ({ navigation }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const cameraRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && !isAnalyzing) {
      try {
        setIsAnalyzing(true);
        const options = {
          quality: 0.8,
          base64: false,
          skipProcessing: false,
        };
        
        const data = await cameraRef.current.takePictureAsync(options);
        await analyzeImage(data.uri);
      } catch (error) {
        console.error('Camera error:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
        setIsAnalyzing(false);
      }
    }
  };

  const selectFromGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.assets && response.assets[0]) {
        setIsAnalyzing(true);
        await analyzeImage(response.assets[0].uri);
      }
    });
  };

  const analyzeImage = async (imageUri) => {
    try {
      const result = await analyzePalm(imageUri);

      if (result.success) {
        navigation.navigate('Analysis', { analysis: result.analysis });
      } else {
        Alert.alert('Analysis Failed', result.error || 'Unable to analyze the palm image.');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      Alert.alert('Error', error.message || 'Failed to connect to the analysis service. Please check your internet connection.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleFlash = () => {
    setFlashMode(
      flashMode === RNCamera.Constants.FlashMode.off
        ? RNCamera.Constants.FlashMode.torch
        : RNCamera.Constants.FlashMode.off
    );
  };

  const switchCamera = () => {
    setCameraType(
      cameraType === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.gradient}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Palm Scanner</Text>
            <TouchableOpacity
              style={styles.flashButton}
              onPress={toggleFlash}
            >
              <Icon
                name={flashMode === RNCamera.Constants.FlashMode.off ? 'flash-off' : 'flash-on'}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* Camera View */}
          <View style={styles.cameraContainer}>
            <RNCamera
              ref={cameraRef}
              style={styles.camera}
              type={cameraType}
              flashMode={flashMode}
              captureAudio={false}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
              {/* Palm Guide Overlay */}
              <View style={styles.overlay}>
                <View style={styles.guideContainer}>
                  <View style={styles.guideFrame}>
                    <Text style={styles.guideText}>
                      Position your palm within the frame
                    </Text>
                  </View>
                </View>
              </View>
            </RNCamera>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={selectFromGallery}
              disabled={isAnalyzing}
            >
              <Icon name="photo-library" size={24} color="#4ecdc4" />
              <Text style={styles.controlText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.captureButton, isAnalyzing && styles.captureButtonDisabled]}
              onPress={takePicture}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={switchCamera}
              disabled={isAnalyzing}
            >
              <Icon name="flip-camera-android" size={24} color="#4ecdc4" />
              <Text style={styles.controlText}>Switch</Text>
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>
              {isAnalyzing
                ? 'Analyzing your palm...'
                : 'Ensure good lighting and position your palm clearly in the frame'}
            </Text>
          </View>
        </Animated.View>
      </LinearGradient>
      
      {/* Loading Overlay */}
      {isAnalyzing && <LoadingSpinner message="Analyzing your palm with AI..." />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  flashButton: {
    padding: 8,
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideContainer: {
    width: width * 0.7,
    height: width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideFrame: {
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderColor: '#ff6b6b',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  guideText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  galleryButton: {
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  captureButtonDisabled: {
    backgroundColor: '#666',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  switchButton: {
    alignItems: 'center',
  },
  controlText: {
    color: '#4ecdc4',
    fontSize: 12,
    marginTop: 5,
  },
  instructions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  instructionText: {
    color: '#b8b8b8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default CameraScreen;
