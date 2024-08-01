import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import axios from 'axios';
import { API_HOST } from '../myenv';
import { icons } from "../constants"; // Import your icons

const ForgotPassword = ({ navigation }) => {
  const localImage = require("../assets/sup.jpg"); // Local image

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorNewPassword, setErrorNewPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const handleEmailChange = (text) => setEmail(text.trimStart());
  const handleNewPasswordChange = (text) => setNewPassword(text.trimStart());
  const handleConfirmPasswordChange = (text) => setConfirmPassword(text.trimStart());

  const validateForm = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    let valid = true;
    setErrorEmail('');
    setErrorNewPassword('');
    setErrorConfirmPassword('');

    if (!email.trim()) {
      setErrorEmail('Please enter your email.');
      valid = false;
    } else if (!validateEmail(email)) {
      setErrorEmail('Please enter a valid email address.');
      valid = false;
    }

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

  const validateEmail = (email) => /\S+@gmail\.com/.test(email);

  const handleResetPassword = async () => {
    // if (validateForm()) {
    //   try {
    //     const response = await axios.post(API_HOST + '/api/forgot_password', {
    //       email: email,
    //       newPassword: newPassword,
    //     });

    //     if (response.status === 200) {
    //       // Password reset successful
    //       ToastAndroid.show('Password reset successful!', ToastAndroid.SHORT);
    //       navigation.navigate('Login');
    //     } else {
    //       // Handle other status codes if needed
    //       ToastAndroid.show('Password reset failed. Please try again.', ToastAndroid.SHORT);
    //     }
    //   } catch (error) {
    //     console.error('Error resetting password:', error);
    //     ToastAndroid.show('Password reset failed. Please try again later.', ToastAndroid.SHORT);
    //   }
    // }
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
              <Image source={icons.email2} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                onChangeText={handleEmailChange}
                value={email}
                keyboardType="email-address"
              />
            </View>
            {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}
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
