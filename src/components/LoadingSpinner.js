import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoadingSpinner = ({ message = 'Loading...', size = 'large' }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.9)']}
        style={styles.overlay}
      >
        <View style={styles.content}>
          <ActivityIndicator size={size} color="#ff6b6b" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  message: {
    color: '#fff',
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
  },
});

export default LoadingSpinner;
