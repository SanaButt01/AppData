import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_HOST } from '../myenv';

const Home = () => {

  const texts = [
    'Shop now, save more !',
    'Special discounts !',
    "Don't miss out !",
    'Limited time offers !'
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios.get(`${API_HOST}/api/categories`)
      .then(response => {
        const data = response.data;
        // Filter the categories to only include the one with category_id: 5
        const filteredCategories = data.filter(category => category.type === 'Clearance Sale');
        setCategories(filteredCategories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  useEffect(() => {
    fetchCategories();
    const interval = setInterval(fetchCategories, 1000); // Polling every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 1000); // Change message every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigation.navigate('BookScreen', { categoryId });
  };

  const getImageSource = (icon) => {
    return { uri: `${API_HOST}/storage/${icon}` }; // Adjusted to match your API structure
  };

  return (
    <SafeAreaView style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.category_id}
          onPress={() => handleCategoryClick(category.category_id)}
          style={styles.categoryItem}
        >
          <Image source={getImageSource(category.icon)} style={styles.categoryImage} />
        </TouchableOpacity>
      ))}

      <View style={styles.header}>
        <Text style={styles.headerMessage}>{texts[currentTextIndex]}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'black',
    elevation: 4,
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100
  },
  headerMessage: {
    fontSize: 23,
    color: "white",
    fontFamily: 'PlayfairDisplay-Bold',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  categoryItem: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: 'white',
  },
  categoryImage: {
    width: 250,
    height: 400,
    borderRadius: 25,
  },
});

export default Home;
