import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { booksData } from "./BookScreen"; // Import booksData from BookScreen or wherever it is defined
 // CONTENT SCREEN
const BookDetail = ({ route, navigation }) => {
  const { book_id } = route.params;
  const [book, setBook] = useState(null);
  const [content, setContent] = useState(null);
  const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);
  const contentData = [
    { book_id: 1, description: "Written by a team based at one of the world's leading centres for linguistic teaching and research, the second edition of this highly successful textbook offers a unified approach to language, viewed from a range of perspectives essential for students' understanding of the subject.", price: 10 },
    { book_id: 2, description: "Written by a team based at one of the world's leading centres for linguistic teaching and research, the second edition of this highly successful textbook offers a unified approach to language, viewed from a range of perspectives essential for students' understanding of the subject.", price: 15 },
    { book_id: 3, description: "Written by a team based at one of the world's leading centres for linguistic teaching and research, the second edition of this highly successful textbook offers a unified approach to language, viewed from a range of perspectives essential for students' understanding of the subject.", price: 5 },
    { book_id: 4, description: "Written by a team based at one of the world's leading centres for linguistic teaching and research, the second edition of this highly successful textbook offers a unified approach to language, viewed from a range of perspectives essential for students' understanding of the subject.", price: 5 },
    // Add more content entries as needed
  ];
  
  useEffect(() => {
    // Convert book_id to number (if necessary, ensure it's in the correct type)
    const parsedBookId = parseInt(book_id);

    // Simulate fetching book details based on the selected book_id from route params
    const fetchedBook = booksData.find(item => item.book_id === parsedBookId);

    if (fetchedBook) {
      setBook(fetchedBook); // Set the fetched book to state
      // For demo purposes, set hardcoded content data for the fetched book
      const fetchedContent = contentData.find(item => item.book_id === parsedBookId);
      if (fetchedContent) {
        setContent(fetchedContent);
      }
    } else {
      // Handle case where book is not found
      console.log(`Book with id ${parsedBookId} not found.`);
    }
  }, [book_id]);

  // Function to navigate to PreviewScreen
  const handleShowPreview = () => {
    navigation.navigate('PreviewScreen', { book_id: book_id });
  };

  function renderBookDescription() {
    if (!book || !content) return null;

    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(width, height) => setScrollViewWholeHeight(height)}
        onLayout={({ nativeEvent: { layout: { height } } }) => setScrollViewVisibleHeight(height)}
      >
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{content.description}</Text>
        <Text style={styles.descriptionTitle}>Price: ${content.price}</Text>
        {/* Additional content details or actions */}
        <TouchableOpacity
          onPress={handleShowPreview}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginTop: 20,
            backgroundColor: COLORS.primary,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.body2 }}>Show Preview</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View style={{ flex: 1 }}>{renderBookDescription()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  descriptionTitle: {
    ...FONTS.h2,
    color: COLORS.white,
    marginBottom: SIZES.padding,
  },
  descriptionText: {
    ...FONTS.body3,
    color: COLORS.lightGray,
    lineHeight: 22,
    letterSpacing: 0.1,
    marginBottom: SIZES.padding,
  },
  scrollViewContent: {
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
  },
});

export default BookDetail;
