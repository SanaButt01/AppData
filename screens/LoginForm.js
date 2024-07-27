import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { icons, COLORS } from "../constants";
import axios from 'axios';
import { API_HOST } from '../myenv';

const Login = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (text) => {
    setPassword(text.trimStart());
  };

  const handleEmailChange = (text) => {
    setEmail(text.trimStart());
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

    if (!password.trim() || !email.trim()) {
      Alert.alert('Please enter all fields.');
      return false;
    } else if (!validateEmail(email)) {
      Alert.alert('Please enter a valid email address.');
      return false;
    } else if (password.length < 8) {
      Alert.alert('Password must be at least 8 characters long.');
      return false;
    } else if (!passwordRegex.test(password)) {
      Alert.alert('Password must contain a combination of characters, numbers, and symbols.');
      return false;
    }

    return true;
  };

  const validateEmail = (email) => {
    const regex = /\S+@gmail\.com/;
    return regex.test(email);
  };

  const handleSign = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(API_HOST + '/api/login', {
          email: email,
          password: password,
        });

        if (response.status === 200) {
          // Login successful
          navigation.navigate('DrawerScreens', { screen: 'Dashboard' });
        } else {
          // Handle other status codes if needed
          Alert.alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        Alert.alert('Login failed. Please try again later.');
      }
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

          <View style={styles.inputContainer}>
            <Image source={icons.pass2} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              onChangeText={handlePasswordChange}
              value={password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.showPasswordButton}>
              <Image source={icons.back_arrow_icon} style={styles.showPasswordIcon} />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSign}>
            <Text style={styles.buttonText}>Login</Text>
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
  showPasswordButton: {
    position: 'absolute',
    right: 10,
  },
  showPasswordIcon: {
    width: 24,
    height: 24,
    tintColor: '#888',
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

export default Login;
