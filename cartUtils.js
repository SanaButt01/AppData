// cartUtils.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Save cart data to AsyncStorage with user-specific key
export async function saveCartToStorage(userId, cart) {
    try {
        const key = `cart_${userId}`;
        await AsyncStorage.setItem(key, JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to storage:', error);
    }
}

// Load cart data from AsyncStorage with user-specific key
export async function loadCartFromStorage(userId) {
    try {
        const key = `cart_${userId}`;
        const cartData = await AsyncStorage.getItem(key);
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        return [];
    }
}
