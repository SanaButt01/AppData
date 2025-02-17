import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_HOST } from '../myenv';

const { width } = Dimensions.get('window');

const messages = [
  'Explore the latest book categories!',
  'Find your next favorite book!',
  'Discover new genres and authors!',
  'Check out our exclusive collection !',
  
];

const SidePanel = () => {
  const localImage2 = require("../assets/bookd.jpg");
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [messageIndex, setMessageIndex] = useState(0);

  // Example user data, replace this with real data
  // const [user, setUser] = useState({ name: 'Slex Johnson', email: 'alex@example.com' });

  useEffect(() => {
    fetchCategories();

    // Rotate message every 1 second
    const messageInterval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 1000);

    return () => {
      clearInterval(messageInterval); // Clear the message interval on component unmount
    };
  }, []);

  const fetchCategories = () => {
    axios.get(`${API_HOST}/api/categories`)
      .then(response => {
        const data = response.data;
        // Filter out the category with the type "Clearance Sale"
        const filteredCategories = data.filter(category => category.type !== 'Clearance Sale');
        setCategories(filteredCategories);
      })
      .catch(error => {
        const errorMsg = 'Error fetching categories: ' + (error.message || 'An unexpected error occurred');
        ToastAndroid.show(errorMsg, ToastAndroid.LONG); // Display the error as a toast notification
      });
      
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigation.navigate('BookScreen', { categoryId });
  };

  const getImageSource = (icon) => {
    return { uri: `${API_HOST}/storage/${icon}` }; // Adjusted to match your API structure
  };

  // Extract the first letter of the user's name
  // const userInitial = user.name ? user.name.charAt(0).toUpperCase() : '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image source={localImage2} style={styles.topImage} />
        </View>
        <Text style={styles.messageText}>{messages[messageIndex]}</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Categories</Text>
        </View>
        <ScrollView contentContainerStyle={styles.categoriesContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.category_id}
              onPress={() => handleCategoryClick(category.category_id)}
              style={styles.categoryItem}
            >
              <Image source={getImageSource(category.icon)} style={styles.categoryImage} />
              <Text style={styles.menuItemText}>{category.type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 5,
  },
  imageWrapper: {
    width: '100%',
    height: 140,
    borderBottomLeftRadius:30,
    borderBottomRightRadius: 100,
    overflow: 'hidden', // To ensure the shadow appears correctly
  
  },
  topImage: {
    width: '100%',
    height: '95%',
    resizeMode: 'cover',
  },
  messageText: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 22,
    color: 'white', // White text
    backgroundColor: 'rgba(110, 120, 120, 0.5)', // Semi-transparent black background
    padding: 15,
    borderRadius: 15,
    fontFamily: 'PlayfairDisplay-Bold',
   
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    color: '#333',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  categoriesContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  categoryItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryImage: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'PlayfairDisplay-Bold',
    textAlign: 'center',
  },
});

export default SidePanel;
