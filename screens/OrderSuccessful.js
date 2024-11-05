import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SIZES, images } from '../constants';

const OrderSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground 
      source={images.order} // Replace with your image path
      style={styles.background}
    >
      <View style={styles.container}>
        {/* <View style={styles.Text}>
      <Text style={styles.congratsText}>Order Paid Successfully</Text>
      </View> */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>
     
    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:400,
    width:'98%',
    marginLeft:10,
    marginTop:50
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
      marginTop:'100%'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  // congratsText: {
  //   color: 'black',
  //   fontFamily: 'PlayfairDisplay-Bold',
  //   textAlign: 'center',
  //   fontSize: 25,
  // },
  Text:{
    marginTop:'100%'
  }
});

export default OrderSuccessScreen;
