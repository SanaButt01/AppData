import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addtocart } from "../ACTIONS";
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from "./SearchBar";
 // BOOK SCREEN
// Hardcoded book data (replace with actual API fetch if needed)
export const booksData = [
  { book_id: 1, category_id: 1, title: "Introducing Linguistics", author: "Joyce Bruhn de Garavito", path: require("../assets/images/eng1.jpg") },
  { book_id: 2, category_id: 1, title: "Linguistics An Introduction", author: "Andrew Radford", path: require("../assets/images/eng2.jpg")},
  { book_id: 3, category_id: 2, title: "Data Structures & Algorithms", author: "Alfred V. AHO", path: require("../assets/images/LA.jpg")},
  { book_id: 4, category_id: 2, title: "Artificial Intelligence", author: "Andrew Radford", path: require("../assets/images/AI.jpg")},
];

const BookScreen = ({ route }) => {
  const { categoryId } = route.params;
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.reducer);
  const [addedToCart, setAddedToCart] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const updatedAddedToCart = {};
    cartData.forEach((item) => {
      updatedAddedToCart[item.title] = true;
    });
    setAddedToCart(updatedAddedToCart);
  }, [cartData]);

  useEffect(() => {
    // Simulate fetching books based on the selected category ID
    const filteredBooks = booksData.filter(book => book.category_id === categoryId);
    setBooks(filteredBooks);
  }, [categoryId]);

  const navigateToBookDetail = (bookId) => {
    navigation.navigate('BookDetail', { book_id: bookId });
  };

  const handleAddtoCart = (item) => {
    if (addedToCart[item.title]) {
      // If already added to cart, remove it
      // Dispatch action to remove item from cart
    } else {
      // If not added to cart, add it
      dispatch(addtocart(item));
    }
  };

  const handleSearch = (query) => {
    const filteredData = query.trim() === "" ?
      [] :
      booksData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.author.toLowerCase().includes(query.toLowerCase())
      );

    setSearchResults(filteredData);
    setIsSearching(query.trim() !== "");
  };

  const renderBookItem = ({ item }) => (
    <TouchableOpacity style={styles.bookContainer} onPress={() => navigateToBookDetail(item.book_id)}>
      <View style={styles.imageContainer}>
        <Image source={item.path} resizeMode="cover" style={styles.bookImage} />
      </View>
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.author}>By: {item.author}</Text>
        <Button
          onPress={() => handleAddtoCart(item)}
          color='black'
          title={addedToCart[item.title] ? 'Added to Cart' : 'ADD TO CART'}
          disabled={addedToCart[item.title]}
          style={styles.addButton}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={isSearching ? searchResults : books}
        keyExtractor={item => item.book_id.toString()}
        renderItem={renderBookItem}
        contentContainerStyle={styles.bookList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bookList: {
    paddingVertical: 76,
    paddingHorizontal: 26,
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  imageContainer: {
    width: 80,
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  bookDetails: {
    flex: 1,
    marginLeft: 12,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
});

export default BookScreen;
