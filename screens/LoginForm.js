import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, Animated } from 'react-native';
import { icons } from "../constants";
import {CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { API_HOST } from '../myenv';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../ACTIONS';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const localImage2 = require("../assets/sup.jpg");
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  // Animation setup
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePasswordChange = (text) => setPassword(text.trimStart());
  const handleEmailChange = (text) => setEmail(text.trimStart());
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const validateForm = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    let valid = true;
    setErrorEmail('');
    setErrorPassword('');

    if (!email.trim()) {
      setErrorEmail('Please enter your email.');
      valid = false;
    } else if (!validateEmail(email)) {
      setErrorEmail('Please enter a valid email address.');
      valid = false;
    }

    if (!password.trim()) {
      setErrorPassword('Please enter your password.');
      valid = false;
    } 

    return valid;
  };

  const validateEmail = (email) => /\S+@gmail\.com/.test(email);

 
  const dispatch = useDispatch();
  const handleSign = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(API_HOST + '/api/login', {
          email: email,
          password: password,
        });
  
        if (response.status === 200) {
          const { userProfile, rememberToken } = response.data; // Adjust based on your API response
          dispatch(setUserProfile(userProfile)); // Dispatch user profile to Redux
          await AsyncStorage.setItem('isLoggedIn', 'true'); // Set login status
          await AsyncStorage.setItem('rememberToken', rememberToken); // Store the token
          ToastAndroid.show('Login successful!', ToastAndroid.SHORT);
          navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'DrawerScreens' }],
            })
          );
        } else {
          ToastAndroid.show('Login failed. Please check your credentials.', ToastAndroid.LONG);
        }
      } catch (error) {
        console.error(error);
        ToastAndroid.show('Login failed. Please check your credentials.', ToastAndroid.LONG);
      }
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <Image source={localImage2} style={styles.topImage} />
            <View style={styles.logoContainer}>
              <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>
                Welcome Back!
              </Animated.Text>
            </View>
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
              {errorPassword ? <Text style={styles.errorText}>{errorPassword}</Text> : null}
              <TouchableOpacity onPress={() => navigation.navigate('Reset Password')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSign}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>Don't have an account?</Text>
                  <Text style={styles.registerLink}>Register</Text>
                </View>
              </TouchableOpacity>
            </View>
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
    padding: 10,
    paddingBottom: 45,
    width: '90%',
    height: '95%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  imageContainer: {
    alignItems: 'center',
  },
  topImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    marginBottom: -70,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    color: '#000', // Black text
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: '#ddd',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
    width: '100%',
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
  showPasswordButton: {
    position: 'absolute',
    right: 10,
  },
  showPasswordIcon: {
    width: 24,
    height: 24,
    tintColor: '#888',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#000',
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
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
    marginVertical: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#666',
    fontSize: 14,
  },
  registerLink: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Login;
