import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const AnalysisScreen = ({ route, navigation }) => {
  const { analysis } = route.params;
  const [expandedSections, setExpandedSections] = useState({});
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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const shareAnalysis = async () => {
    try {
      await Share.share({
        message: `Check out my palmistry analysis!\n\n${analysis}`,
        title: 'My Palmistry Analysis',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const parseAnalysis = (text) => {
    // Simple parsing to extract sections from the AI response
    const sections = {
      'Hand Shape': 'Based on your palm analysis...',
      'Palm Lines': 'Your palm lines reveal...',
      'Mount Analysis': 'The mounts on your palm indicate...',
      'Finger Analysis': 'Your fingers show...',
      'Personality Traits': 'Your personality traits include...',
      'Career Insights': 'Career-wise, your palm suggests...',
      'Relationship Insights': 'In relationships, you tend to...',
      'Health Indicators': 'Health-wise, your palm shows...',
    };

    return sections;
  };

  const sections = parseAnalysis(analysis);

  const SectionCard = ({ title, content, icon, color }) => {
    const isExpanded = expandedSections[title];
    
    return (
      <TouchableOpacity
        style={[styles.sectionCard, { borderLeftColor: color }]}
        onPress={() => toggleSection(title)}
        activeOpacity={0.8}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Icon name={icon} size={24} color={color} />
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
          <Icon
            name={isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="#666"
          />
        </View>
        {isExpanded && (
          <Animated.View style={styles.sectionContent}>
            <Text style={styles.sectionText}>{content}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  };

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
            <Text style={styles.headerTitle}>Palm Analysis</Text>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={shareAnalysis}
            >
              <Icon name="share" size={24} color="#4ecdc4" />
            </TouchableOpacity>
          </View>

          {/* Analysis Content */}
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Main Analysis */}
            <View style={styles.mainAnalysisCard}>
              <Icon name="psychology" size={40} color="#ff6b6b" />
              <Text style={styles.mainTitle}>Your Palm Reading</Text>
              <Text style={styles.mainDescription}>
                Based on advanced AI analysis of your palm features
              </Text>
            </View>

            {/* Detailed Analysis */}
            <View style={styles.analysisContainer}>
              <Text style={styles.analysisText}>{analysis}</Text>
            </View>

            {/* Section Cards */}
            <View style={styles.sectionsContainer}>
              <SectionCard
                title="Hand Shape"
                content="Your hand shape indicates your basic personality type and approach to life."
                icon="pan-tool"
                color="#ff6b6b"
              />
              <SectionCard
                title="Palm Lines"
                content="The major lines on your palm reveal insights about your life path, relationships, and career."
                icon="timeline"
                color="#4ecdc4"
              />
              <SectionCard
                title="Mount Analysis"
                content="The mounts on your palm represent different aspects of your personality and talents."
                icon="terrain"
                color="#45b7d1"
              />
              <SectionCard
                title="Finger Analysis"
                content="Your fingers reveal details about your communication style and decision-making process."
                icon="gesture"
                color="#f9ca24"
              />
              <SectionCard
                title="Personality Traits"
                content="Your palm reveals key personality characteristics and behavioral patterns."
                icon="person"
                color="#6c5ce7"
              />
              <SectionCard
                title="Career Insights"
                content="Career guidance based on your palm's unique features and characteristics."
                icon="work"
                color="#a29bfe"
              />
              <SectionCard
                title="Relationship Insights"
                content="What your palm reveals about your approach to love and relationships."
                icon="favorite"
                color="#fd79a8"
              />
              <SectionCard
                title="Health Indicators"
                content="Health-related insights that may be visible in your palm features."
                icon="health-and-safety"
                color="#00b894"
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.scanAgainButton}
                onPress={() => navigation.navigate('Camera')}
              >
                <LinearGradient
                  colors={['#ff6b6b', '#ee5a52']}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Icon name="camera-alt" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Scan Again</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Icon name="home" size={20} color="#4ecdc4" />
                <Text style={styles.homeButtonText}>Home</Text>
              </TouchableOpacity>
            </View>
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
  shareButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  mainAnalysisCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    textAlign: 'center',
  },
  mainDescription: {
    fontSize: 14,
    color: '#b8b8b8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  analysisContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  analysisText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'justify',
  },
  sectionsContainer: {
    paddingHorizontal: 20,
  },
  sectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 15,
    borderRadius: 15,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionText: {
    fontSize: 14,
    color: '#b8b8b8',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  scanAgainButton: {
    flex: 1,
    marginRight: 10,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#4ecdc4',
  },
  homeButtonText: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default AnalysisScreen;
