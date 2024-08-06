import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../ACTIONS";
import { FONTS, COLORS, icons } from "../constants";
import { API_HOST } from '../myenv';
const ShoppingCart = ({ navigation }) => {

  const localIm=require("../assets/empty.png");
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.reducer);

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item.title));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item.title));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item.title));
  };
  const getImageSource = (icon) => {
    return { uri: `${API_HOST}/storage/${icon}` }; // Adjusted to match your API structure
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Image source={getImageSource(item.path)}style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.title}</Text>
          <Text style={styles.itemAuthor}>{item.author}</Text>
          <Text style={styles.itemPrice}>Rs. {item.price}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleDecreaseQuantity(item)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleIncreaseQuantity(item)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveItem(item)}>
              <Image source={icons.page_filled_icon} style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {cartItems.length > 0 ? (
          <View style={styles.cartContainer}>
            {cartItems.map((item, index) => (
              <View key={index}>{renderItem({ item })}</View>
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total Price:Rs. {calculateTotalPrice(cartItems)}</Text>
              <TouchableOpacity 
  style={styles.checkoutButton} 
  onPress={() =>
    navigation.navigate('AddressForm', {
      cartItems: cartItems.map(item => ({
        title: item.title,
      })),
      totalPrice: calculateTotalPrice(cartItems),
    })
  }
>
  <Text style={styles.checkoutButtonText}>Pay With Stripe</Text>
</TouchableOpacity>
            </View>
          </View>
          ) : (
            <ImageBackground
            source={localIm}
            resizeMode='contain'
            style={{
              backgroundColor:"white",
              // aspectRatio: 1, // Maintains the aspect ratio of the image
              width: 350, // Adjust width as needed
              height: 500, // Automatically calculates height based on aspect ratio   
            }} >
               <Text style={{ textAlign: 'center',marginTop:400,fontSize:20,fontFamily:'PlayfairDisplay-Bold',color:COLORS.black}}>"Oops!!"Your cart is empty</Text>
            </ImageBackground>
          )}
        </ScrollView>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      padding: 10,
    },
    cartContainer: {
      marginBottom: 20,
    },
    itemContainer: {
      marginBottom: 20,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.lightGray3,
      borderRadius: 10,
      padding: 10,
    },
    itemImage: {
      width: 80,
      height: 100,
      borderRadius: 5,
    },
    itemInfo: {
      flex: 1,
      marginLeft: 10,
    },
    itemName: {
      ...FONTS.bold,
      fontSize: 18,
       color:"black"
    },
    itemAuthor: {
      ...FONTS.regular,
      fontSize: 16,
     color:"black"
    },
    itemPrice: {
      ...FONTS.regular,
      fontSize: 16,
       color:"black"
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    quantityButton: {
      backgroundColor: COLORS.black,
      borderRadius: 5,
      padding: 6,
    },
    quantityButtonText: {
      ...FONTS.bold,
      color: COLORS.white,
      fontSize: 18,
    },
    quantity: {
      ...FONTS.bold,
      fontSize: 18,
      marginHorizontal: 10,
    },
    removeIcon: {
      width: 20,
      height: 20,
      marginLeft: 10,
    },
    totalContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    totalText: {
      ...FONTS.bold,
      fontSize: 20,
      color:"black"
    },
    checkoutButton: {
      backgroundColor: COLORS.black,
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginTop: 10,
    },
    checkoutButtonText: {
      ...FONTS.bold,
      color: COLORS.white,
      fontSize: 18,
    },
    emptyCartContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyCartImage: {
      width: 100,
      height: 100,
      marginBottom: 10,
    },
    emptyCartText: {
      ...FONTS.bold,
      fontSize: 20,
      color: COLORS.gray,
    },
  });
  
  
  export default ShoppingCart;
