import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_HOST } from '../myenv';
import { COLORS } from '../constants';

const { width, height } = Dimensions.get('window');

const SidePanel = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [footerText, setFooterText] = useState('Discover unbeatable deals now!');
  const [textIndex, setTextIndex] = useState(0);

  // Array of texts to rotate through
  const texts = [
    'Discover unbeatable deals now!',
    'Everything must go!',
    'Huge savings on all items!',
    'Don’t miss out on clearance bargains!'
  ];

  useEffect(() => {
    axios.get(`${API_HOST}/api/categories`)
      .then(response => {
        const data = response.data;
        const filteredCategories = data.filter(category => category.type === 'Clearance Sale');
        setCategories(filteredCategories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    // Update the text every second
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  useEffect(() => {
    setFooterText(texts[textIndex]);
  }, [textIndex]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigation.navigate('BookScreen', { categoryId });
  };

  const getImageSource = (icon) => {
    return { uri: `${API_HOST}/storage/${icon}` };
  };

  return (
    <SafeAreaView style={styles.container}>
    
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.category_id}
              onPress={() => handleCategoryClick(category.category_id)}
              style={styles.card}
            >
              <Image source={getImageSource(category.icon)} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{footerText}</Text>
        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


  scrollContainer: {
    alignItems: 'center',
    // paddingVertical: 30,
  },
  card: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    // marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
    imageContainer: {
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 390,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay-Bold',
    color: '#333',
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    padding:55,
    backgroundColor:"black", // Semi-transparent background for footer
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  footerText: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Bold',
    color: '#fff',
  },
});

export default SidePanel;
