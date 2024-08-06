import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const MyCarousel = ({ navigation }) => {
  const localImage1 = require("../assets/splash1.png");
  const localImage2 = require("../assets/splash2.png");
  const localImage3 = require("../assets/splash3.png");
  const localImage4 = require("../assets/splash4.png");
  const images = [localImage1, localImage2, localImage3, localImage4];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Image source={images[currentImageIndex]} style={styles.image} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    width: 300,
  },
  buttonWrapper: {
    borderRadius: 5,
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
});

export default MyCarousel;
