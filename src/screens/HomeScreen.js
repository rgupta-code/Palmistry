import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleScanPress = () => {
    navigation.navigate('Camera');
  };

  const handleAboutPress = () => {
    navigation.navigate('About');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <Icon name="palm" size={80} color="#ff6b6b" />
            <Text style={styles.title}>Palmistry AI</Text>
            <Text style={styles.subtitle}>
              Discover your destiny through the ancient art of palm reading
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Icon name="camera-alt" size={30} color="#4ecdc4" />
              <Text style={styles.featureText}>AI-Powered Analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="psychology" size={30} color="#45b7d1" />
              <Text style={styles.featureText}>Detailed Insights</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="favorite" size={30} color="#f9ca24" />
              <Text style={styles.featureText}>Love & Career</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.scanButton}
              onPress={handleScanPress}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#ff6b6b', '#ee5a52']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Icon name="camera-alt" size={24} color="#fff" />
                <Text style={styles.buttonText}>Scan Your Palm</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.aboutButton}
              onPress={handleAboutPress}
              activeOpacity={0.8}
            >
              <Icon name="info-outline" size={20} color="#4ecdc4" />
              <Text style={styles.aboutButtonText}>About Palmistry</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Powered by Google Gemini AI
            </Text>
          </View>
        </Animated.View>
      </LinearGradient>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#b8b8b8',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 40,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  scanButton: {
    width: '100%',
    marginBottom: 20,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  aboutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  aboutButtonText: {
    color: '#4ecdc4',
    fontSize: 16,
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 12,
  },
});

export default HomeScreen;
