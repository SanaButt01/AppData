import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addtocart } from "../ACTIONS";
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from "./SearchBar";
import { booksData } from "./BookScreen"; // Import booksData from BookScreen or wherever it is defined
import { COLORS, FONTS, SIZES, images, icons } from '../constants'; 
import axios from 'axios';
import { API_HOST } from '../myenv';


const BookScreen = ({ route }) => {
  const { categoryId } = route.params;
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.reducer);
  const [addedToCart, setAddedToCart] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize booksData with hardcoded data
  const [booksData, setBooksData] = useState([
    { book_id: 1, category_id: 1, title: "Introducing Linguistics", author: "Joyce Bruhn de Garavito", path: require("../assets/images/eng1.jpg"),price:500 },
    { book_id: 2, category_id: 1, title: "Linguistics An Introduction", author: "Andrew Radford", path: require("../assets/images/eng2.jpg"),price:650},
    { book_id: 3, category_id: 2, title: "Data Structures & Algorithms", author: "Alfred V. AHO", path: require("../assets/images/LA.jpg"),price:10},
    { book_id: 4, category_id: 2, title: "Artificial Intelligence", author: "Andrew Radford", path: require("../assets/images/AI.jpg"),price:1500},
  ]);

  useEffect(() => {
    // Initialize addedToCart state based on cartData
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
    
    // Replace the hardcoded booksData with API call below:
    axios.get(`${API_HOST}/api/books`, {
      params: {
        category_id: categoryId
      }
    })
    .then(response => {
      const data = response.data;
      setBooks(data); // Assuming API returns an array of books similar to booksData format
    })
    .catch(error => {
      console.error("Error fetching books:", error);
      // Handle error case
    });
  }, [categoryId]); // Ensure categoryId is in the dependency array

  const navigateToBookDetail = (bookId) => {
    // Pass booksData to BookDetail route
    navigation.navigate('BookDetail', { book_id: bookId, booksData });
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
        <Text style={styles.price}>Rs. {item.price}</Text>
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
  price: {
    fontSize: SIZES.body3,
    fontFamily: 'PlayfairDisplay-Bold',
    color: COLORS.black,
    marginBottom: 5,
},
  author: {
    fontSize: 14,
    color: '#666',
  },
  
});

export default BookScreen;
