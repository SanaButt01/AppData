import React, { useState, useEffect } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { icons } from "../constants";
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_HOST } from '../myenv';
import { setUserProfile } from '../ACTIONS';

const Profile = ({ navigation }) => {
  
  const localImage2 = require("../assets/sup.jpg");
  const [icon, setIcon] = useState(null);
  const [errorUsername, setErrorUsername] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.profile);
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    console.log('Profile data:', userProfile);
    if (userProfile && userProfile.user) {
      console.log('Profile:', userProfile.user); // Log the entire profile
      setUsername(userProfile.user.name || '');
      setEmail(userProfile.user.email || '');
      setIcon(userProfile.user.icon ? `${API_HOST}/storage/${userProfile.user.icon}` : null);
    }
  }, [userProfile]);

  useEffect(() => {
    console.log('Current state:', { name, email });
  }, [name, email]);
  const handleNameChange = (text) => setUsername(text.trimStart());
  const handleEmailChange = (text) => setEmail(text.trimStart());


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
    return valid;
  };

  const validateEmail = (email) => /\S+@gmail\.com/.test(email);

  const handleUpdate = async () => {
    if (validateForm()) {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('rememberToken');
  
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
  
        if (icon) {
          formData.append('icon', {
            uri: icon.uri,
            type: icon.type,
            name: icon.fileName,
          });
        }
  
        // Make the API request with the token in the headers
        const response = await axios.post(`${API_HOST}/api/update-profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
  
        if (response.status === 200) {
          console.log('Profile update successful:', response.data);
          dispatch(setUserProfile(response.data));
          ToastAndroid.show('Profile updated successfully!', ToastAndroid.LONG);
        } else {
          console.log('Profile update failed:', response.data);
          ToastAndroid.show('Profile update failed. Please try again.', ToastAndroid.LONG);
        }
      } catch (error) {
        console.error('Error updating profile:', error.response ? error.response.data : error.message);
        ToastAndroid.show('Error updating profile. Please try again.', ToastAndroid.LONG);
      }
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
                    source={{ uri: icon.uri || icon }}
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
                  editable={false}
                />
              </View>
              {errorEmail ? <Text style={styles.errorText}>{errorEmail}</Text> : null}
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
  readOnlyInput: {
    backgroundColor: '#e0e0e0', // Light gray background
    color: '#888', // Lighter text color
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

export default Profile;