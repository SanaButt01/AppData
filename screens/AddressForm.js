import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { icons } from "../constants";

const AddressForm= ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [address, setAddress] = useState('');
  
  const [error, setError] = useState('');

  const handleNameChange = (text) => {
    setName(text.trimStart());
  };

  const handlePhoneNumberChange = (text) => {
    setphone_number(text.trimStart());
  };

  const handleAddressChange = (text) => {
    setAddress(text.trimStart());
  };

  const validatePhoneNumber = (phone_number) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(phone_number);
  };

  const validateForm = () => {
    if (!name.trim() || !phone_number.trim() || !address.trim()) {
      setError('All fields must be filled.');
      return false;
    }
     else if (!validatePhoneNumber(phone_number)) {
      setError('Please enter a valid phone number (11 digits).');
      return false;
    }
    return true;
  };

  const handleForm = () => {
    if (validateForm()) {
      console.log('Name:', name);
      console.log('Phone Number:', phone_number);
      console.log('Address:', address);
     
      setError('');
    
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={icons.logo2}
          style={styles.logo}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#888"
              onChangeText={handleNameChange}
              value={name}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#888"
              onChangeText={handlePhoneNumberChange}
              value={phone_number}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#888"
              onChangeText={handleAddressChange}
              value={address}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleForm}>
            <Text style={styles.buttonText}>Pay With Stripe</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    height: 180,
    width: 130,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    fontFamily: 'Roboto-Regular',
  },
  button: {
    backgroundColor: '#000000',
    width: '80%',
    borderRadius: 25,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AddressForm;
