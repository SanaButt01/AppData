import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView,ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FONTS, COLORS, icons } from "../constants";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../ACTIONS";

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const ShoppingCart = ({ navigation }) => {
  const localImage=require("../assets/new.jpeg");
  const localIm=require("../assets/empty.png");
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.reducer);

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item.title));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item.title));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item.title));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <Image source={item.path} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.title}</Text>
          <Text style={styles.itemAuthor}>{item.author}</Text>
          <Text style={styles.itemPrice}>Rs. {item.price}</Text>
          <View style={{ flexDirection: 'row', borderRadius: 5, padding:3 }}>
            <TouchableOpacity onPress={() => handleDecreaseQuantity(item)} style={styles.quantityButton}>
              <Text style={{ fontSize:25, paddingHorizontal:5,color: "white"}}>-</Text>
            </TouchableOpacity>
            <Text style={{ fontFamily:'PlayfairDisplay-Bold' ,  fontSize: 25, paddingHorizontal:5,backgroundColor: '#000510',color: "white" }}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleIncreaseQuantity(item)} style={styles.quantityButton}>
              <Text style={{fontSize:25,paddingHorizontal:5, color: "white" }}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRemoveItem(item)}>
          <Image source={icons.page_filled_icon} 
          style={{
            marginLeft:105,
            height:20,
            width:20,
            marginTop:15
          }}/>
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
              <Text style={styles.totalText}>Total Price: Rs. {calculateTotalPrice(cartItems)}</Text>
              <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('AddressForm')}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
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
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
  },
  itemAuthor: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 16,
    color: COLORS.gray,
  },
  itemPrice: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 16,
    // marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor:"black",
    borderRadius: 5,
    padding: 6,
  },
  quantityButtonText: {
    ...FONTS.bold,
    color: COLORS.white,
    fontSize: 16,
  },
  quantity: {
    ...FONTS.bold,
    fontSize: 16,
    marginHorizontal: 10,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontFamily:'PlayfairDisplay-Bold' ,
    fontSize: 20,
  },
  checkoutButton: {
    backgroundColor:"black",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  checkoutButtonText: {
    fontFamily:'PlayfairDisplay-Bold' ,
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
  },
  emptyCartText: {
    ...FONTS.bold,
    fontSize: 18,
    marginTop: 10,
  },
});

export default ShoppingCart;
