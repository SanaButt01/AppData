import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { icons } from "../constants";
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { API_HOST } from '../myenv';
import LinearGradient from 'react-native-linear-gradient';

const Register = ({ navigation }) => {
  const localImage2 = require("../assets/sup.jpg");
  const [name, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [icon, setIcon] = useState(null);
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorIcon, setErrorIcon] = useState('');
  const [message, setMessage] = useState(''); // State for displaying messages
  const handleNameChange = (text) => {
    setUsername(text.trimStart());
    if (errorUsername) setErrorUsername(''); // Clear error when typing
  };
  
  const handlePasswordChange = (text) => {
    setPassword(text.trimStart());
    if (errorPassword) setErrorPassword(''); // Clear error when typing
  };
  
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text.trimStart());
    if (errorConfirmPassword) setErrorConfirmPassword(''); // Clear error when typing
  };
  
  const handleEmailChange = (text) => {
    setEmail(text.trimStart());
    if (errorEmail) setErrorEmail(''); // Clear error when typing
  };
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const selectImage = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 350,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User canceled image selection');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        setIcon(response.assets[0]);
        setErrorIcon('');
      }
    });
  };

  const validateForm = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    let valid = true;
    setErrorUsername('');
    setErrorPassword('');
    setErrorConfirmPassword('');
    setErrorEmail('');

    if (!name.trim()) {
      setErrorUsername('Please enter your username.');
      valid = false;
    } else if (!validateName(name)) {
      setErrorUsername('Username must start with a letter and contain only letters or numbers.');
      valid = false;
    } else {
      setErrorUsername(''); // Clear any previous error
    }
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
    } else if (password.length < 8) {
      setErrorPassword('Password must be at least 8 characters long.');
      valid = false;
    } else if (!passwordRegex.test(password)) {
      setErrorPassword('Password must contain a combination of characters and numbers.');
      valid = false;
    }

    if (!confirmPassword.trim()) {
      setErrorConfirmPassword('Please confirm your password.');
      valid = false;
    } else if (password !== confirmPassword) {
      setErrorConfirmPassword('Passwords do not match.');
      valid = false;
    }
    // if (!icon) { // Check if profile photo is not selected
    //   setErrorIcon('Please select a profile photo.');
    //   valid = false;
    // }


    return valid;
  };

  const validateEmail = (email) => /^[a-zA-Z][a-zA-Z0-9]*@gmail\.com$/.test(email);
  const validateName = (name) => /^[a-zA-Z][a-zA-Z0-9_]*$/.test(name) && /[a-zA-Z]/.test(name);


  const handleSign = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', confirmPassword);

        if (icon) {
          formData.append('icon', {
            uri: icon.uri,
            type: icon.type,
            name: icon.fileName,
          });
        }

        const response = await axios.post(API_HOST + '/api/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          setMessage('Registration successful! Now you can login.');
          ToastAndroid.show('Registration successful! Now you can login.', ToastAndroid.LONG);
          navigation.navigate('Login');
        } else {
          setMessage('Registration failed. Please try again.');
        }
      } catch (error) {
        ToastAndroid.show(
          error.response && error.response.data.message
            ? error.response.data.message
            : 'An error occurred. Please try again.',
          ToastAndroid.SHORT
        );
      
      }
    } else {
      ToastAndroid.show('Registration failed. Please try again.', ToastAndroid.LONG);
    }
  };

  const [showText, setShowText] = useState(false);

  const handleCameraIconPress = () => {
    setShowText((prevShowText) => !prevShowText);
  };

  const removePhoto = () => {
    setShowText(false);
    setIcon(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
        <Image source={localImage2} style={styles.topImage} />
          <View style={styles.logoContainer}>
            {icon ? (
              <View>
               <Image
        style={styles.profileImage}
        source={{ uri: `data:${icon.type};base64,${icon.base64}` }}
      />
                <TouchableOpacity style={styles.cameraOverlay} onPress={handleCameraIconPress}>
                  <Image source={icons.camera} style={styles.cameraIcon} />
                </TouchableOpacity>
                {showText && (
                  <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={removePhoto}>
                      <Text style={styles.optionText}>Remove Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={selectImage}>
                      <Text style={styles.optionText}>Change Photo</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ) : (
              <TouchableOpacity onPress={selectImage}>
                <View style={styles.uploadContainer}>
                <Image source={icons.camera} style={styles.cameraIcon} />
                </View>
              </TouchableOpacity>
            )}
          </View>
          {errorIcon ? <Text style={styles.errorText}>{errorIcon}</Text> : null}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Image source={icons.page_icon} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                onChangeText={handleNameChange}
                value={name}
              />
            </View>
            {errorUsername ? <Text style={styles.errorText}>{errorUsername}</Text> : null}
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
            <View style={styles.inputContainer}>
              <Image source={icons.pass2} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                onChangeText={handleConfirmPasswordChange}
                value={confirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.showPasswordButton}>
                <Image source={icons.back_arrow_icon} style={styles.showPasswordIcon} />
              </TouchableOpacity>
            </View>
            {errorConfirmPassword ? <Text style={styles.errorText}>{errorConfirmPassword}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleSign}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <Text style={styles.loginLink}>Login</Text>
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
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
 
  },
  topImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
       marginBottom: -150,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  uploadContainer: {
    width: 120,
    height: 120,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 999,
    padding: 5,
  },
  cameraIcon: {
    width: 24,
    height: 24,
  },
  uploadButtonText: {
    color: '#555',
    fontSize: 16,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 70,
    right: 10,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  optionText: {
    color: '#000',
    fontSize: 16,
    marginVertical: 5,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -4,
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

export default Register;