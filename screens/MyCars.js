import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, Text } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const MyCarousel = ({navigation}) => {
  const localImage1 = require("../assets/splash1.png");
  const localImage2 = require("../assets/splash2.png");
  const localImage3 = require("../assets/splash3.png");
  const localImage4 = require("../assets/splash4.png");
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const page = Math.round(contentOffset.x / SCREEN_WIDTH);
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      >
        <View style={styles.slide}>
          <Image source={localImage1} style={styles.image} />
        
            <View style={styles.buttonContainer}>
               <TouchableOpacity style={styles.buttonWrapper} 
               onPress={()=>navigation.navigate('Signup')}>
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonWrappe} 
               onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
      
        </View>
  
        <View style={styles.slide}>
          <Image source={localImage2}  style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Image source={localImage3}  style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Image source={localImage4}  style={styles.image} />
          {currentPage === 3 && (
            <View style={styles.buttonContainer}>
               <TouchableOpacity style={styles.buttonWrapper} 
               onPress={()=>navigation.navigate('Signup')}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

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
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
    marginHorizontal: 6,
  },
  paginationDotActive: {
    backgroundColor: '#000',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50, // Adjust button position as needed
    alignSelf: 'center',
    width: 180,
  },
  buttonWrapper: {
    borderRadius: 50, // Apply borderRadius to the wrapper
    backgroundColor: 'black', // Background color of the button
    paddingVertical: 20, // Adjust padding as needed
    paddingHorizontal: 20, // Adjust padding as needed
    marginBottom:5
  },


  buttonWrappe: {
    borderRadius: 50, // Apply borderRadius to the wrapper
    backgroundColor: 'black', // Background color of the button
    paddingVertical: 20, // Adjust padding as needed
    paddingHorizontal: 20, // Adjust padding as needed
  },
  buttonText: {
    color: '#fff', // Text color
    textAlign: 'center', // Center align the text
    fontSize:20, // Font size of the text
    fontFamily: 'Roboto-Bold' 
  },

});

export default MyCarousel;
