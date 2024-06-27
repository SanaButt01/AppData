import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { icons } from "../constants";

const AddressForm = ({ navigation, route }) => {
  const { cartItems, totalPrice } = route.params; // Extracting params from navigation route

  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [error, setError] = useState('');

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text.trimStart());
  };

  const handleAddressChange = (text) => {
    setAddress(text.trimStart());
  };

  const handleEmailChange = (text) => {
    setEmail(text.trim());
  };

  const handleCardNumberChange = (text) => {
    setCardNumber(text.trim());
  };

  
  const handleCVCChange = (text) => {
    setCVC(text.trim());
  };

  const validatePhoneNumber = (phone_number) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(phone_number);
  };

  const validateForm = () => {
    if (!email.trim() || !phone_number.trim() || !address.trim() || !cardNumber.trim() || !expiry.trim() || !cvc.trim()) {
      setError('All fields must be filled.');
      return false;
    } else if (!validatePhoneNumber(phone_number)) {
      setError('Please enter a valid phone number (11 digits).');
      return false;
    }
    return true;
  };
  const handleExpiryChange = (text) => {
    // Remove non-numeric characters
    let formattedText = text.replace(/\D/g, '');
  
    // Format the text to MM/YY format
    if (formattedText.length > 2) {
      formattedText = formattedText.slice(0, 2) + '/' + formattedText.slice(2);
    }
  
    // Update state with formatted text
    setExpiry(formattedText);
  };
  
  const handleForm = () => {
    if (validateForm()) {
      console.log('Email:', email);
      console.log('Phone Number:', phone_number);
      console.log('Address:', address);
      console.log('Card Number:', cardNumber);
      console.log('Expiry:', expiry);
      console.log('CVC:', cvc);
      console.log('Total Price:', totalPrice);
      console.log('Cart Items:', cartItems);
      setError('');
  
      // Perform actions after successful form validation (e.g., submit payment, navigate to next screen)
      // For now, let's simulate an order confirmation:
      alert('Order Done!'); // Display a message indicating the order is done
    }
  };
  

  return (
    <View style={styles.container}>
      {/* <View style={styles.logoContainer}>
        <Image
          source={icons.logo2}
          style={styles.logo}
        />
      </View> */}
      <Text style={styles.totalText}>Order Details:</Text>
          {cartItems.map((item, index) => (
            <View key={index}>
              <Text style={styles.sectionTitle}>{item.title}</Text>
            </View>
          ))}
           <Text style={styles.sectionTitle}>Total Price: Rs. {totalPrice}</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
        <View style={styles.inputContainer}>
       
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              onChangeText={handleEmailChange}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Image source={icons.email2} style={styles.email} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#888"
              onChangeText={handlePhoneNumberChange}
              value={phone_number}
              keyboardType="phone-pad"
            />
            <Image source={icons.phn} style={styles.email} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#888"
              onChangeText={handleAddressChange}
              value={address}
            />
             <Image source={icons.loc} style={styles.email} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              placeholderTextColor="#888"
              onChangeText={handleCardNumberChange}
              value={cardNumber}
              keyboardType="numeric"
              secureTextEntry
            />
            {/* Add Visa icon here */}
            <Image source={icons.visa} style={styles.icon} />
          </View>

          <View style={styles.rowContainer}>
          <View style={[styles.inputContainer, { width: '50%', marginRight: 2 }]}>
  <TextInput
    style={styles.input}
    placeholder="Expiry(MM/YY)"
    placeholderTextColor="#888"
    onChangeText={handleExpiryChange}
    value={expiry}
    keyboardType="numeric"
  />
</View>

            <View style={[styles.inputContainer, { width: '50%' }]}>
              <TextInput
                style={styles.input}
                placeholder="CVC"
                placeholderTextColor="#888"
                onChangeText={handleCVCChange}
                value={cvc}
                keyboardType="number-pad"
                secureTextEntry
              />
                <Image source={icons.cvv} style={styles.icon} />
            </View>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleForm}>
            <Text style={styles.buttonText}>Pay</Text>
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
    height: 50,
    width: 40,
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    fontFamily: 'Roboto-Regular',
    fontSize: 14, // Adjust font size for smaller inputs if needed
  },
  cvcInput: {
    letterSpacing: 8, // Adjust letterSpacing for CVC
    textAlign: 'center', // Center the text in the CVC field
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  totalText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    marginLeft: 10,
    
  },
  icon: {
    width: 40,
    height: 25,
    marginLeft: 10,
  },
  email: {
    width: 24,
    height: 24,
    // marginLeft: 10,
  },

});

export default AddressForm;
