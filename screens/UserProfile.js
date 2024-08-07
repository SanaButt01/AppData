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
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(null);
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const handleNameChange = (text) => setUsername(text.trimStart());
  const handlePasswordChange = (text) => setPassword(text.trimStart());
  const handleEmailChange = (text) => setEmail(text.trimStart());
  const toggleShowPassword = () => setShowPassword(!showPassword);


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
      }
    });
  };

  const validateForm = () => {
   
    let valid = true;
    setErrorUsername('');
    setErrorPassword('');
    setErrorEmail('');

    if (!name.trim()) {
      setErrorUsername('Please enter your username.');
      valid = false;
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
    } 
    return valid;
  };

  const validateEmail = (email) => /\S+@gmail\.com/.test(email);

  const handleUpdate = async () => {
    // if (validateForm()) {
    //   try {
    //     const formData = new FormData();
    //     formData.append('name', name);
    //     formData.append('email', email);
    //     formData.append('current_password', currentPassword);

    //     if (icon) {
    //       formData.append('icon', {
    //         uri: icon.uri,
    //         type: icon.type,
    //         name: icon.fileName,
    //       });
    //     }

    //     const response = await axios.post(API_HOST + '/api/update-profile', formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });

    //     if (response.status === 200) {
    //       console.log('Profile update successful:', response.data);
    //       ToastAndroid.show('Profile updated successfully!', ToastAndroid.LONG);
    //     } else {
    //       console.log('Profile update failed:', response.data);
    //     }
    //   } catch (error) {
    //     console.error('Error updating profile:', error.response ? error.response.data : error.message);
    //   }
    // }
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
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update</Text>
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