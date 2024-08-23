import axios from 'axios';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ToastAndroid } from 'react-native';
import { API_HOST } from '../myenv';

const EnterCodeScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [code, setCode] = useState(Array(6).fill('')); // Initialize an array of 6 empty strings
  const inputRefs = useRef([]); // Refs to manage focus on inputs

  const handleChangeText = (text, index) => {
    if (/^\d$/.test(text)) { // Ensure only a single digit is entered
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Move to the next input automatically if there is a next input
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (text === '') { // Allow clearing of the input
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter a 6-digit code.');
      return;
    }

    try {
      const response = await axios.post(`${API_HOST}/api/password-reset/verify-code`, { email, code: fullCode });
      const { auth_token } = response.data;
      
      if (auth_token) {
        ToastAndroid.show('Code verified', ToastAndroid.SHORT);
        navigation.navigate('ForgotPassword', { email, authToken: auth_token });
      } else {
        Alert.alert('Error', 'Invalid response from server.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Verification Failed', error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        A 6-digit code has been sent to your email. Please enter it below.
      </Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            autoFocus={index === 0} // Automatically focus on the first input
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EnterCodeScreen;
