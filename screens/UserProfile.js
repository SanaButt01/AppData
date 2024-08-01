import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { API_HOST } from '../myenv';
import { icons } from '../constants';

const UserProfile = () => {
  const localImage = require("../assets/sup.jpg");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [icon, setIcon] = useState(null);
  const [errors, setErrors] = useState({});

  const handleNameChange = (text) => setName(text.trimStart());
  const handleEmailChange = (text) => setEmail(text.trimStart());
  const handleCurrentPasswordChange = (text) => setCurrentPassword(text.trimStart());

  const toggleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  

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
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
    let valid = true;
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name.';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email.';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (!currentPassword.trim()) {
      newErrors.currentPassword = 'Please enter your current password.';
    } else if (newPassword.length < 8) {
        newErrors.newPassword = 'New password must be at least 8 characters long.';
        valid = false;
      } else if (!passwordRegex.test(newPassword)) {
        newErrors.newPassword = 'New password must contain a combination of characters and numbers.';
      valid = false;
    }
    setErrors(newErrors);
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

  const [showOptions, setShowOptions] = useState(false);

  const handleIconPress = () => {
    setShowOptions((prev) => !prev);
  };

  const removePhoto = () => {
    setShowOptions(false);
    setIcon(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.cardContainer}>
          <View style={styles.imageContainer}>
            <Image source={localImage} style={styles.topImage} />
            <View style={styles.logoContainer}>
              {icon ? (
                <View>
                  <Image
                    style={styles.profileImage}
                    source={{ uri: `data:${icon.type};base64,${icon.base64}` }}
                  />
                  <TouchableOpacity style={styles.cameraOverlay} onPress={handleIconPress}>
                    <Image source={icons.camera} style={styles.cameraIcon} />
                  </TouchableOpacity>
                  {showOptions && (
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
                  placeholder="Name"
                  placeholderTextColor="#888"
                  onChangeText={handleNameChange}
                  value={name}
                />
              </View>
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
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
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              <View style={styles.inputContainer}>
                <Image source={icons.pass2} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Current Password"
                  placeholderTextColor="#888"
                  onChangeText={handleCurrentPasswordChange}
                  value={currentPassword}
                  secureTextEntry={!showCurrentPassword}
                />
                <TouchableOpacity onPress={toggleShowCurrentPassword} style={styles.showPasswordButton}>
                  <Image source={icons.show} style={styles.showPasswordIcon} />
                </TouchableOpacity>
              </View>
              {errors.currentPassword && <Text style={styles.errorText}>{errors.currentPassword}</Text>}
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
backgroundColor: '#fff',
},
scrollContainer: {
flexGrow: 1,
justifyContent: 'center',
paddingHorizontal: 20,
},
cardContainer: {
flex: 1,
backgroundColor: '#f5f5f5',
borderRadius: 10,
padding: 15,
elevation: 2,
},
imageContainer: {
alignItems: 'center',
marginBottom: 50,
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
    marginBottom: 50,
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

export default UserProfile;