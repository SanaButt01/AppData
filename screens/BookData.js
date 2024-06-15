import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Button,
  StyleSheet
} from 'react-native';
import SidePanel from './SidePanel';
import { addtocart } from "../ACTIONS";
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONTS, SIZES, images, icons } from '../constants'; // Adjust the import paths accordingly
import React, { useEffect, useState } from 'react';
import SearchBar from "./SearchBar";
import { ScrollView } from 'react-native-gesture-handler';

const BookData = ({ navigation }) => {
  const [addedToCart, setAddedToCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.reducer);
  const [isSearching, setIsSearching] = useState(false);
  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  const [categories, setCategories] = useState([
    {
      category_id: 1,
      type: "Linguistics",
      icon: images.p1,
      books: [
          {
              book_id: 1,
              title: "Introducing Linguistics",
              path: images.eng1,
              author: "Joyce Bruhn de Garavito",
              description: "'Linguistics Tidbits' and 'Eyes on World Languages' boxes provide colourful accents, giving real language data from around the world and making complex theories more accessible to students from non-Science backgrounds ",
              price: 323,
              paths: [
                { im: images.otherWordsForHome },
                { im: images.otherWordsForHome },
                { im: images.otherWordsForHome },
                // preview pages 
              ]
          },
          {
              book_id: 2,
              title: "Linguistics An Introduction",
              path: images.eng2,
              author: "Andrew Radford",
              description: "Written by a team based at one of the world's leading centres for linguistic teaching and research, the second edition of this highly successful textbook offers a unified approach to language, viewed from a range of perspectives essential for students' understanding of the subject. Using clear explanations throughout, the book is divided into three main sections: sounds, words, and sentences..",
              price: 500,
              paths: [
                { im: images.otherWordsForHome },
                { im: images.otherWordsForHome },
                { im: images.otherWordsForHome },
                // Add more pages as needed
              ]
          },
         
      ]
  },
  {
    category_id: 2,
    type: "Computer_Science",
    icon: images.comp,
    books: [
      // Add books here
      {
        book_id: 1,
        title: "Artificial Intelligence",
        path: images.AI,
        author: "Andrew Radford",
        description: "Written by a team based at one of the world's leading centres for linguistic teaching and research, the second edition of this highly successful textbook offers a unified approach to language, viewed from a range of perspectives essential for students' understanding of the subject. Using clear explanations throughout, the book is divided into three main sections: sounds, words, and sentences..",
        price: 500,
        paths: [
          { im: images.otherWordsForHome },
          { im: images.otherWordsForHome },
          { im: images.otherWordsForHome },
          // Add more pages as needed
        ]
    },
    {
      book_id: 2,
      title: "Practical Oracle SQL",
      path: images.ora,
      author: "Kim Berg Hansen",
      description: "Written by a team based at one of the world's leading centres for linguistic teaching and research, the second edition of this highly successful textbook offers a unified approach to language, viewed from a range of perspectives essential for students' understanding of the subject. Using clear explanations throughout, the book is divided into three main sections: sounds, words, and sentences..",
      price: 500,
      paths: [
        { im: images.otherWordsForHome },
        { im: images.otherWordsForHome },
        { im: images.otherWordsForHome },
        // Add more pages as needed
      ]
  }, 
  {
    book_id: 3,
    title: "OBJECT ORIENTED PROGRAMMING",
    path: images.oop,
    author: "Robert Lafore ",
    description: "Object-Oriented Software Design in C++ is packed with 'before' program examples that show what not to do, followed by 'after' versions built with the benefits of good design. Each chapter is full of mentorship-style conversations that anticipate questions and help point out subtleties you might have missed. You’ll learn how to gather and analyze requirements so you’re building exactly what your client is looking for, discover how to utilize iterative development to backtrack mistakes, and revise your code to be as good as it can be. ",
   price: 1500,
 paths: [
  { im:images.otherWordsForHome},
  { im:images.otherWordsForHome},
  { im:images.otherWordsForHome},
  // Add more pages as needed
]
},
{
    book_id: 4,
    title: "Data Structures & Algorithms",
    path: images.LA,
    author: "Alfred V. AHO",
    description: "An ideal book for first course on data structures and algorithms, its text ensures a style and content relevant to present-day programming. The only pre-requisite it assumes is familiarity with a high-level programming language like Pascal. The book spans cohesively across wide-ranging topics and serves as a comprehensive text for the undergraduate as well as the graduate student",
 
    price: 700,
 paths: [
  { im:images.otherWordsForHome},
  { im:images.otherWordsForHome},
  { im:images.otherWordsForHome},
  // Add more pages as needed
]
},
    ]
  },
  {
    category_id: 3,
    type: "Biology",
    icon: images.p2,
    books: [
      // Add books here
    ]
  },
  {
    category_id: 4,
    type: "Mathematics",
    icon: images.p3,
    books: [
      // Add books here
    ]
  },
  {
    category_id: 5,
    type: "Chemistry",
    icon: images.chem,
    books: [
      // Add books here
    ]
  },
   

]);


  
  useEffect(() => {
    const updatedAddedToCart = {};
    cartData.forEach((item) => {
        updatedAddedToCart[item.title] = true;
    });
    setAddedToCart(updatedAddedToCart);
}, [cartData]);

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
  console.log("Query:", query);
  const filteredData = query.trim() === "" ?
      [] : // Empty array when search query is empty
      categories.flatMap(category => category.books.filter(item =>
          (item.title && item.title.toLowerCase().includes(query.toLowerCase())) ||
          (item.author && item.author.toLowerCase().includes(query.toLowerCase()))
      ));

  console.log("Filtered Data:", filteredData);
  setSearchResults(filteredData);
  setIsSearching(query.trim() !== "");

  // Reset selectedCategory and lastClickedIndex if search is cleared
  if (query.trim() === "") {
    setSelectedCategory(null);
    setLastClickedIndex(null);
  }
};

const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchResults([]);
    setIsSearching(false);
};

const renderCategoryData = () => {
  let dataToRender = [];

  // If a search query is active, only show search results
  if (isSearching) {
    dataToRender = [...searchResults];
  } else {
    // If a category is selected, add its books to the data to render
    const selectedCategoryData = categories.find(category => category.category_id === selectedCategory);
    if (selectedCategoryData) {
      dataToRender = [...selectedCategoryData.books];
    }
  }

  return (
    <FlatList
      data={dataToRender}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={[
        { paddingHorizontal: SIZES.padding, paddingBottom: "70%" }, 
        isSearching && { marginTop: 90 } // Highlighted: Conditionally apply marginTop
      ]}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.bookContainer}
          onPress={() => navigation.navigate("BookDetail", { book: item })}
        >
          <View style={styles.imageContainer}>
            <Image
              source={item.path}
              resizeMode="cover"
              style={styles.bookImage}
            />
          </View>
          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.author}>By : {item.author}</Text>
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
      )}
    />
  );
};

return (
  <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    <View>
      <SearchBar onSearch={handleSearch} />
      {!isSearching && (
        <ScrollView>
          <SidePanel categories={categories} onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
        </ScrollView>
      )}
    </View>
    <View>
      {selectedCategory !== null && !isSearching && (
        <View style={styles.selectedCategoryHeader}>
          {/* Category Header Content Here */}
        </View>
      )}
      {renderCategoryData()}
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  bookContainer: {
      flexDirection: 'row',
      backgroundColor: COLORS.white,
      borderRadius: SIZES.radius,
    //   marginBottom: SIZES.padding,
      width: '100%',
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
  },
  imageContainer: {
      width: '30%',
      height: 160,
      borderTopLeftRadius: SIZES.radius,
      borderBottomLeftRadius: SIZES.radius,
      overflow: 'hidden',
  },
  bookImage: {
      width: '100%',
      height: '100%',
  },
  bookDetails: {
      flex: 1,
      padding: SIZES.padding,
  },
  bookTitle: {
      fontSize: SIZES.body2,
      fontFamily: 'PlayfairDisplay-Bold',
      color: COLORS.black,
      marginBottom: 5,
  },
  author: {
      fontSize: SIZES.body3,
      fontFamily: 'PlayfairDisplay-Bold',
      color: COLORS.gray,
      marginBottom: 5,
  },
  price: {
      fontSize: SIZES.body3,
      fontFamily: 'PlayfairDisplay-Bold',
      color: COLORS.black,
      marginBottom: 5,
  },
  addButton: {
      alignSelf: 'flex-end',
  },
  discountContainer: {
      position: 'absolute',
      top: 1,
      right: 10,
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
  selectedCategoryHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
  },
  backButtonContainer: {
      marginRight: SIZES.padding,
  },
  backArrow: {
      width: 30,
      height: 30,
  },
  selectedCategoryName: {
      fontSize: 80,
      fontFamily: 'PlayfairDisplay-Bold',
      color: COLORS.black,
  },
});

export default BookData;
