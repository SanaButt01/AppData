import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import axios from 'axios';
import { API_HOST } from '../myenv';
import { icons } from "../constants"; // Import your icons

const ForgotPassword = ({ route,  navigation }) => {
  const { email, authToken } = route.params;
  const localImage = require("../assets/sup.jpg"); // Local image

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const handleNewPasswordChange = (text) => setNewPassword(text.trimStart());
  const handleConfirmPasswordChange = (text) => setConfirmPassword(text.trimStart());

  const validateForm = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    let valid = true;
    setErrorNewPassword('');
    setErrorConfirmPassword('');

    if (!newPassword.trim()) {
      setErrorNewPassword('Please enter your new password.');
      valid = false;
    } else if (newPassword.length < 8) {
      setErrorNewPassword('Password must be at least 8 characters long.');
      valid = false;
    } else if (!passwordRegex.test(newPassword)) {
      setErrorNewPassword('Password must contain a combination of characters and numbers.');
      valid = false;
    }

    if (confirmPassword !== newPassword) {
      setErrorConfirmPassword('Passwords do not match.');
      valid = false;
    }

    return valid;
  };

  const handleResetPassword = async () => {
    if (validateForm()) {

      axios.post(API_HOST + '/api/password-reset/reset-password', { email, auth_token: authToken, password: newPassword, password_confirmation: newPassword })
      .then(response => {
        ToastAndroid.show('Password Reset Successful', ToastAndroid.SHORT);
        // Navigate to login or another appropriate screen
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to reset password. Please try again.');
      });
      
    }

  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <Image source={localImage} style={styles.topImage} />
          </View>
          <Text style={styles.title}>Reset Password</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Image source={icons.pass2} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#888"
                onChangeText={handleNewPasswordChange}
                value={newPassword}
                secureTextEntry
              />
            </View>
            {errorNewPassword ? <Text style={styles.errorText}>{errorNewPassword}</Text> : null}
            <View style={styles.inputContainer}>
              <Image source={icons.pass2} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                onChangeText={handleConfirmPasswordChange}
                value={confirmPassword}
                secureTextEntry
              />
            </View>
            {errorConfirmPassword ? <Text style={styles.errorText}>{errorConfirmPassword}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Back to</Text>
                <Text style={styles.loginLink}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  topImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -50,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000000',
    width: '100%',
    borderRadius: 25,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default ForgotPassword;
