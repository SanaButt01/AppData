import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../ACTIONS';
import { FONTS, COLORS, icons } from '../constants';
import { API_HOST } from '../myenv';

const ShoppingCart = ({ navigation }) => {
  const localIm = require('../assets/empty.png');
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart); // Update to match combined reducer key

  const SHIPPING_COST = 500; // Shipping cost
  const TAX_RATE = 0.2; // 20% tax rate

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = (totalPrice) => {
    return totalPrice * TAX_RATE;
  };

  const calculateGrandTotal = (totalPrice) => {
    const tax = calculateTax(totalPrice);
    return totalPrice + tax + SHIPPING_COST;
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
    return { uri: `${API_HOST}/storage/${icon}` };
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Image source={getImageSource(item.path)} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.title}</Text>
          <Text style={styles.itemAuthor}>{item.author}</Text>
          <Text style={styles.itemPrice}>Rs. {item.price}</Text>
          <View style={styles.quantityContainer}>
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

  const totalPrice = calculateTotalPrice(cartItems);
  const tax = calculateTax(totalPrice);
  const grandTotal = calculateGrandTotal(totalPrice);

  return (
    <View style={styles.container}>
      <ScrollView>
        {cartItems.length > 0 ? (
          <View style={styles.cartContainer}>
            {cartItems.map((item, index) => (
              <View key={index}>{renderItem({ item })}</View>
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total Price: Rs. {totalPrice}</Text>
              <Text style={styles.totalText}>Shipping: Rs. {SHIPPING_COST}</Text>
              <Text style={styles.totalText}>Tax: Rs. {tax.toFixed(2)}</Text>
              <Text style={styles.grandTotalText}>Grand Total: Rs. {grandTotal.toFixed(2)}</Text>
              <TouchableOpacity 
                style={styles.checkoutButton} 
                onPress={() =>
                  navigation.navigate('OrderCheckout', {
                    cartItems: cartItems.map(item => ({
                      title: item.title,
                    })),
                    grandTotal: calculateGrandTotal(totalPrice),
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
            style={styles.emptyCartContainer}
          >
            <Text style={styles.emptyCartText}>Oops!! Your cart is empty</Text>
          </ImageBackground>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 15,
  },
  cartContainer: {
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    elevation: 5, // Adds shadow on Android
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    ...FONTS.bold,
    fontSize: 18,
    color: COLORS.black,
  },
  itemAuthor: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.secondary,
  },
  itemPrice: {
    ...FONTS.regular,
    fontSize: 16,
    color: COLORS.black,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: COLORS.black,
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    ...FONTS.bold,
    color: COLORS.white,
    fontSize: 18,
  },
  quantity: {
   color:"black",
    fontSize: 18,
  },
  removeIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  totalText: {
    ...FONTS.bold,
    fontSize: 16,
    color: COLORS.black,
    marginVertical: 5,
  },
  grandTotalText: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: COLORS.black,
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: COLORS.black,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 10,
    alignItems: 'center',

  },
  checkoutButtonText: {
    fontFamily: 'PlayfairDisplay-Bold',
    color: COLORS.white,
    fontSize: 18,
  },
  emptyCartContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'PlayfairDisplay-Bold',
    color: COLORS.black,
    marginTop:350
  },
});

export default ShoppingCart;
