import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';
import { icons } from "../constants";// Update this path to where your icons are stored

const ContactUsScreen = () => {
  const appEmail = 'bookscityinfo@gmail.com';
  const appAddressLine1 = '123 B_Block Model Town';
  const appAddressLine2 = 'Gujranwala, Pakistan';

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${appEmail}`);
  };

  return (
    <View style={styles.container}>
      <Image
        source={icons.logo2}
        style={styles.logo}
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <TouchableOpacity onPress={handleEmailPress}>
        <View style={styles.addressContainer}>
        <Image source={icons.email2} style={styles.icon} />
          <Text style={styles.email}>{appEmail}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Address:</Text>
        <View style={styles.addressContainer}>
          <Image source={icons.loc} style={styles.icon} />
          <View>
            <Text style={styles.text}>{appAddressLine1}</Text>
            <Text style={styles.text}>{appAddressLine2}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 100,
    height: 140,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F8F8F8',
    borderColor: '#000000',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: '#1E90FF',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: '#333333',
  },
});

export default ContactUsScreen;
