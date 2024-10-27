import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {addtocart} from '../ACTIONS';
import {useSelector, useDispatch} from 'react-redux';
import SearchBar from './SearchBar';
import {COLORS, FONTS, SIZES, images, icons} from '../constants';
import axios from 'axios';
import { API_HOST } from '../myenv';



const BookScreen = ({ route }) => {
  const { categoryId } = route.params;
  const [books, setBooks] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart); // Update this to match combined reducer key
  const [cartItems, setCartItems] = useState(0);
  const [addedToCart, setAddedToCart] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const texts = [
    'Top books!',
    'New arrivals!',
    'Best deals!',
    'Hidden gems!'
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 1000); // Change message every second
    return () => clearInterval(interval);
  }, []);

  const goToCart = () => {
    navigation.navigate('ShoppingCart');
  };

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


  const navigateToBookDetail = (book) => {
    // Pass book details to BookDetail route
    navigation.navigate('BookInsight', { book });
  };


  useEffect(() => {
    const updatedAddedToCart = {};
    cartData.forEach((item) => {
      updatedAddedToCart[item.title] = true;
    });
    setAddedToCart(updatedAddedToCart);
  }, [cartData]);

  const handleAddtoCart = (item) => {
    const discountedPrice = item.disc
      ? item.price - (item.price * item.disc / 100)
      : item.price;
  
    if (addedToCart[item.title]) {
      // If item is in the cart, remove it
      dispatch(removeFromCart(item.title));
    } else {
      // Add item to cart
      dispatch(addtocart({ ...item, price: discountedPrice }));
    }
  };
  
  useEffect(() => {
    setCartItems(cartData.length);
  }, [cartData]);

  const handleSearch = query => {
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    console.log("Query: ", query);
    console.log("Category: ",categoryId);
    axios
      .get(`${API_HOST}/api/books/search`, {
      params: {
        title: query, 
        category_id: categoryId, 
      }
      })
      .then(response => {
        const data = response.data;
        setSearchResults(data);
        setBooksData(data);
            })
        .catch(error => {
        console.error('Error searching books:', error);
        console.log('Server response:', error.response.data);
            });
        // Fallback to client-side filtering if API call fails
        const filteredBooks = books.filter(
          book =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredBooks);
        setBooksData(filteredBooks);
      };

  const getImageSource = (icon) => {
    return { uri: `${API_HOST}/storage/${icon}` }; // Adjusted to match your API structure
  };

 
  const renderBookItem = ({ item }) => {
    const discountedPrice = item.price - (item.price * item.disc / 100);

    return (
      <TouchableOpacity style={styles.bookContainer} onPress={() => navigateToBookDetail(item)}>
        <View style={styles.imageContainer}>
          <Image source={getImageSource(item.path)} resizeMode="cover" style={styles.bookImage} />
        </View>
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.author}>By: {item.author}</Text>
          <View style={styles.priceContainer}>
            <Text style={item.disc ? styles.priceWithDiscount : styles.price}>Rs. {item.price}</Text>
            {item.disc && (
              <Text style={styles.discountedPrice}>Rs. {discountedPrice.toFixed(2)}</Text>
            )}
          </View>
          {item.disc && (
            <View style={styles.discountContainer}>
              <Text style={styles.discountText}>{item.disc}% Off</Text>
            </View>
          )}
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerMessage}>{texts[currentTextIndex]}</Text>
      <TouchableOpacity style={styles.cartIconContainer} onPress={goToCart}>
  <Image
    source={icons.bookmark_icon}
    resizeMode="contain"
    style={styles.cartIcon}
  />
  {cartItems > 0 && ( // Show count only if items > 0
    <Text style={styles.cartItemCount}>{cartItems}</Text>
  )}
</TouchableOpacity>

      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'black',
    elevation: 4,
    borderBottomLeftRadius: 84,
    borderBottomRightRadius: 84
  },
  headerMessage: {
    fontSize: 23,
    fontWeight: 'bold',
    color: "white"
  },
  cartIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  cartIcon: {
    width: 44,
    height: 44,
    marginRight: 4,
  },
  cartItemCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "black"
  },
  bookList: {
    paddingVertical: 70,
    paddingHorizontal: 20,
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
    shadowOpacity: 0.5,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: "black"
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: SIZES.body3,
    fontFamily: 'PlayfairDisplay-Bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  priceWithDiscount: {
    fontSize: SIZES.body3,
    fontFamily: 'PlayfairDisplay-Bold',
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountedPrice: {
    fontSize: SIZES.body3,
    fontFamily: 'PlayfairDisplay-Bold',
    color: COLORS.black,
  },
  discountContainer: {
    position: 'absolute',
    top: -10,
    right: 250,
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BookScreen;
