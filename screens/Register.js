import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { icons } from "../constants";
import { launchImageLibrary } from 'react-native-image-picker';

const Register = ({ navigation }) => {
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

  const handleNameChange = (text) => setUsername(text.trimStart());
  const handlePasswordChange = (text) => setPassword(text.trimStart());
  const handleConfirmPasswordChange = (text) => setConfirmPassword(text.trimStart());
  const handleEmailChange = (text) => setEmail(text.trimStart());
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const selectImage = () => {
    setShowText(false);
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
        return;
      } else if (response.error) {
        console.log('Error:', response.error);
        return;
      }
      setIcon(response.assets[0]);
    });
  };

  const validateForm = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    let valid = true;
    setErrorUsername('');
    setErrorPassword('');
    setErrorConfirmPassword('');
    setErrorEmail('');

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

    return valid;
  };

  const validateEmail = (email) => /\S+@gmail\.com/.test(email);

  const handleSign = () => {
    if (validateForm()) {
      console.log('Name:', name);
      console.log('Password:', password);
      console.log('Email:', email);
      // Registration logic goes here
      navigation.navigate('Dashboard');
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
              <Text style={styles.uploadButtonText}>Upload Photo</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
  },
  logoContainer: {
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  uploadContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Adjust the background color and opacity as needed
    borderRadius: 999, // A large value to ensure it's a circle
  },
  cameraIcon: {
    width: 24,
    height: 24,
  },
  uploadButtonText: {
    color: '#555555',
    fontSize: 16,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 50, // Adjust this value to position the options
    right: -10, // Adjust this value to position the options
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  optionText: {
    color: '#000',
    fontSize: 16,
    marginVertical: 5,
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
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
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
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#333',
    fontSize: 14,
  },
  loginLink: {
    color: 'black',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default Register;
