import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Image, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import axios from 'axios';
import { API_HOST } from '../myenv';
import { COLORS, FONTS, SIZES, images } from '../constants';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendLink = () => {
    const trimmedEmail = email.trim();
    // Validate email
    if (trimmedEmail === '') {
      setErrorMessage('Email cannot be empty');
      return;
    }

    if (!trimmedEmail.endsWith('@gmail.com')) {
      setErrorMessage('Please enter a valid email address ');
      return;
    }

    // Check for just "@gmail.com"
    if (trimmedEmail === '@gmail.com' || trimmedEmail.split('@')[0] === '') {
      setErrorMessage('Please enter a valid email address');
      return;
    }


    if (!/^[a-zA-Z][a-zA-Z0-9_]*@gmail\.com$/.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address (e.g., example@gmail.com)');
      return false;
    }

    setErrorMessage(''); // Clear error message if input is valid
    axios.post(API_HOST + '/api/password-reset/request-code', { email: trimmedEmail }) // Use trimmed email for the request
      .then(response => {
        ToastAndroid.show('Code has been sent to ' + trimmedEmail, ToastAndroid.SHORT);
        navigation.navigate('Verification Code', { email: trimmedEmail });
      })
      .catch(error => {
        const errorMsg = error.response?.data?.message || 'An error occurred';
        setErrorMessage(errorMsg); // Set the error message in state
        ToastAndroid.show(errorMsg, ToastAndroid.LONG); // Display the error as a toast notification
      });
      
  };

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHide.remove();
      keyboardDidShow.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.screenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        {!isKeyboardVisible && (
          <Image 
            source={images.resetPass} // Replace with your background image path
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <Text style={styles.title}>Reset Your Password</Text>
        <Text style={styles.subtitle}>
          Enter the email associated with your account, and we'll send you a link to reset your password.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={text => {
            setEmail(text.replace(/\s+/g, '')); // Remove all whitespace
            setErrorMessage(''); // Clear error message when typing
          }} 
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSendLink}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  image: {
    marginTop: -80,
    width: '150%',
    height: 350,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: -40,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
    width: '100%',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 20,
  },
});

export default ForgotPasswordScreen;
