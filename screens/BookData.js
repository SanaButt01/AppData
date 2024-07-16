import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_HOST } from '../myenv';

const SidePanel = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
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
        console.error('Error fetching categories:', error);
      });
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigation.navigate('BookScreen', { categoryId });
  };

  const getImageSource = (icon) => {
    return { uri: `${API_HOST}/storage/${icon}` }; // Adjusted to match your API structure
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categoryHeaderTextContainer}>
        <Text style={styles.categoryHeaderText}>Categories</Text>
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
    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 15,
  },
  categoriesContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    paddingBottom: 5,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    marginTop: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menuItemText: {
    fontSize: 15,
    color: '#333',
    fontFamily: 'PlayfairDisplay-Bold',
    textAlign: 'center',
    marginTop: 10,
  },
  categoryHeaderTextContainer: {
    width: '100%',
  },
  categoryHeaderText: {
    fontSize: 28,
    color: 'black',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  categoryImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
    marginBottom: 10,
  },
});

export default SidePanel;
