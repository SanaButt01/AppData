import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const EnterCodeScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']); // Array to store each digit
  const inputRefs = useRef([]); // Refs to manage focus on inputs

  const handleChangeText = (text, index) => {
    if (/^\d*$/.test(text) && text.length <= 1) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (index < 3 && text) {
        // Move to the next input automatically
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerifyCode = () => {
    const fullCode = code.join('');
    if (fullCode.length !== 4) {
      Alert.alert('Invalid Code', 'Please enter a 4-digit code.');
      return;
    }
    // Handle code verification logic here
    Alert.alert('Success', 'Code verified successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('ForgotPassword') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        A 4-digit code has been sent to your email. Please enter it below.
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
