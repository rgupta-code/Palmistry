import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const AboutScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const features = [
    {
      icon: 'psychology',
      title: 'AI-Powered Analysis',
      description: 'Advanced artificial intelligence analyzes your palm features using Google Gemini technology.',
      color: '#ff6b6b',
    },
    {
      icon: 'timeline',
      title: 'Detailed Palm Reading',
      description: 'Comprehensive analysis of palm lines, mounts, and finger characteristics.',
      color: '#4ecdc4',
    },
    {
      icon: 'favorite',
      title: 'Love & Relationships',
      description: 'Insights into your romantic life and relationship patterns.',
      color: '#fd79a8',
    },
    {
      icon: 'work',
      title: 'Career Guidance',
      description: 'Professional insights and career path recommendations.',
      color: '#f9ca24',
    },
    {
      icon: 'health-and-safety',
      title: 'Health Indicators',
      description: 'Health-related insights visible in your palm features.',
      color: '#00b894',
    },
    {
      icon: 'person',
      title: 'Personality Analysis',
      description: 'Deep dive into your personality traits and behavioral patterns.',
      color: '#6c5ce7',
    },
  ];

  const FeatureCard = ({ feature, index }) => (
    <Animated.View
      style={[
        styles.featureCard,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 50],
                outputRange: [0, 50 + index * 20],
              }),
            },
          ],
        },
      ]}
    >
      <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
        <Icon name={feature.icon} size={30} color={feature.color} />
      </View>
      <Text style={styles.featureTitle}>{feature.title}</Text>
      <Text style={styles.featureDescription}>{feature.description}</Text>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>About Palmistry</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Hero Section */}
            <View style={styles.heroSection}>
              <Icon name="palm" size={80} color="#ff6b6b" />
              <Text style={styles.heroTitle}>Palmistry AI</Text>
              <Text style={styles.heroSubtitle}>
                Discover the ancient art of palm reading with modern AI technology
              </Text>
            </View>

            {/* About Section */}
            <View style={styles.aboutSection}>
              <Text style={styles.sectionTitle}>What is Palmistry?</Text>
              <Text style={styles.aboutText}>
                Palmistry, also known as chiromancy, is the ancient practice of analyzing the lines, 
                shapes, and features of the human palm to gain insights into personality traits, 
                life events, and future possibilities. Our app combines this traditional wisdom 
                with cutting-edge artificial intelligence to provide accurate and detailed palm readings.
              </Text>
            </View>

            {/* Features Section */}
            <View style={styles.featuresSection}>
              <Text style={styles.sectionTitle}>App Features</Text>
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </View>

            {/* How It Works Section */}
            <View style={styles.howItWorksSection}>
              <Text style={styles.sectionTitle}>How It Works</Text>
              <View style={styles.stepsContainer}>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepText}>Take a clear photo of your palm</Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepText}>AI analyzes your palm features</Text>
                </View>
                <View style={styles.step}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepText}>Receive detailed palmistry insights</Text>
                </View>
              </View>
            </View>

            {/* Technology Section */}
            <View style={styles.technologySection}>
              <Text style={styles.sectionTitle}>Powered by AI</Text>
              <Text style={styles.technologyText}>
                Our app uses Google's Gemini AI to analyze palm images with unprecedented accuracy. 
                The AI examines various palm features including lines, mounts, finger shapes, and 
                overall hand structure to provide comprehensive palmistry readings.
              </Text>
            </View>

            {/* Disclaimer */}
            <View style={styles.disclaimerSection}>
              <Icon name="info" size={20} color="#f9ca24" />
              <Text style={styles.disclaimerText}>
                Palmistry readings are for entertainment purposes only and should not be 
                considered as professional advice for health, financial, or personal decisions.
              </Text>
            </View>

            {/* Action Button */}
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => navigation.navigate('Camera')}
            >
              <LinearGradient
                colors={['#ff6b6b', '#ee5a52']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Icon name="camera-alt" size={24} color="#fff" />
                <Text style={styles.buttonText}>Start Your Reading</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#b8b8b8',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  aboutSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 16,
    color: '#b8b8b8',
    lineHeight: 24,
    textAlign: 'justify',
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#b8b8b8',
    lineHeight: 20,
  },
  howItWorksSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  stepsContainer: {
    marginTop: 10,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#b8b8b8',
    lineHeight: 22,
  },
  technologySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  technologyText: {
    fontSize: 16,
    color: '#b8b8b8',
    lineHeight: 24,
    textAlign: 'justify',
  },
  disclaimerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(249, 202, 36, 0.1)',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(249, 202, 36, 0.3)',
    marginBottom: 30,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 14,
    color: '#f9ca24',
    lineHeight: 20,
    marginLeft: 10,
  },
  startButton: {
    marginHorizontal: 20,
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
});

export default AboutScreen;
