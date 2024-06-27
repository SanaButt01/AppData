import React, { useState } from 'react';
import { ScrollView, Button, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { icons } from "../constants"; // Assuming you have icons imported

const AddressForm = ({ navigation, route }) => {
  const { cartItems, totalPrice } = route.params; // Extracting params from navigation route
  const [cardDetails, setCardDetails] = useState(null);
  const { confirmPayment } = useStripe();

  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
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

  const validatePhoneNumber = (phone_number) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(phone_number);
  };

  const validateForm = () => {
    if (!email.trim() || !phone_number.trim() || !address.trim()) {
      setError('All fields must be filled.');
      return false;
    } else if (!validatePhoneNumber(phone_number)) {
      setError('Please enter a valid phone number (11 digits).');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    console.log(totalPrice);
    if (validateForm()) {
      if (!cardDetails?.complete) {
        console.log('Please fill out the card details');
        return;
      }
      
      // Fetch the payment intent client secret from your backend
      const response = await fetch('http://192.168.10.11:8000/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalPrice * 100 }), // Example amount
      });
  
      const { clientSecret } = await response.json();
  
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        type: 'Card',
        paymentMethodType: 'Card',
        billingDetails: {  },
      });
  
      if (error) {
        console.log('Payment confirmation error', error);
      } else if (paymentIntent) {
        console.log('Payment successful', paymentIntent);
      }
    }
  };

  return (
    <View style={styles.container}>
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
      <CardField
        postalCodeEnabled={false}
        placeholders={{ number: '4242 4242 4242 4242' }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => setCardDetails(cardDetails)}
      />
{/* 
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
          </View> */}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handlePayment}>
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
    marginBottom: 20,
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
    marginTop: 20,
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
  card: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    borderWidth: 2,
    borderColor: 'black',
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
    backgroundColor: 'black',
    width: '100%',
    borderWidth: 2,
  },
});

export default AddressForm;
