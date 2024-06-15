import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { icons } from '../constants'; // Adjust the import based on your file structure

const SidePanel = ({ onCategoryClick, categories, selectedCategory }) => {
  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  const handleCategoryClick = (index) => {
    setLastClickedIndex(index);
    onCategoryClick(categories[index].category_id);
  };

  const resetSelection = () => {
    setLastClickedIndex(null);
    onCategoryClick(null);
  };

  return (
    <View style={styles.container}>
      {selectedCategory !== null && (
        <TouchableOpacity onPress={resetSelection} style={styles.backButtonContainer}>
          <Image source={icons.backArrow} style={styles.backArrow} />
          <Text style={styles.backText}>{categories[lastClickedIndex]?.type}</Text>
        </TouchableOpacity>
      )}

        {lastClickedIndex === null && (
          <View style={styles.categoryHeaderTextContainer}>
            <Text style={styles.categoryHeaderText}>Categories</Text>
          </View>
        )}
          <ScrollView contentContainerStyle={styles.categoriesContainer}>
        {categories.map((category, index) => (
          lastClickedIndex === null || index === lastClickedIndex ? (
            <TouchableOpacity
              key={category.category_id}
              onPress={() => handleCategoryClick(index)}
              style={styles.categoryItem}

            >
             
              {lastClickedIndex !== index && (
                <>
                  <Image source={category.icon} style={styles.categoryImage} />
                  <Text style={styles.menuItemText}>{category.type}</Text>
                </>
              )}
            </TouchableOpacity>
          ) : null
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 50,
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
    flexWrap: 'wrap',
  },
  categoryHeaderTextContainer: {
    width: '100%',
  },
  categoryHeaderText: {
    fontSize: 28,
    color: '#333',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  categoryImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 15,
    marginBottom: 10,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backArrow: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  backText: {
    fontSize: 30,
    fontFamily: 'PlayfairDisplay-Bold',
    color: "black",
},
  
});

export default SidePanel;
