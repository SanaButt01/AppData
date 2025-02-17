import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import axios from "axios";
import { API_HOST } from "../myenv";
import { COLORS, FONTS, SIZES } from "../constants";

const BookDetail = ({ route, navigation }) => {
  const { book } = route.params; // Receive the entire book object
  const [bookDetails, setBookDetails] = useState(null);
  const [content, setContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/books/${book.book_id}/content`);
        console.log("API response:", response.data);

        if (response.data) {
          setBookDetails(response.data);

          const fetchedContent = {
            book_id: book.book_id,
            description: response.data.description,
          };
          setContent(fetchedContent);
          setErrorMessage(""); // Clear error if data is found
        } else {
          setErrorMessage("No data found in response"); // Set error message if no data
        }
      } catch (error) {
        setErrorMessage("No Content Available"); // Set error message on API error
      }
    };

    fetchBookDetails(); // Initial fetch

    // const interval = setInterval(() => {
    //   fetchBookDetails(); // Polling every 30 seconds
    // }, 1000); // 30 seconds

    // return () => clearInterval(interval); // Cleanup on unmount
  }, [book.book_id]);

  const getImageSource = (icon) => {
    return { uri: `${API_HOST}/storage/${icon}` }; // Adjusted to match your API structure
  };

  const handleShowPreview = () => {
    if (bookDetails && bookDetails.content_id) {
      navigation.navigate('PreviewDisplay', { content_id: bookDetails.content_id });
    } else {
      setErrorMessage('No Content Available');
    }
  };

  function renderBookDescription() {
    if (!bookDetails || !content) return null;

    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{content.description}</Text>
        <TouchableOpacity
          onPress={handleShowPreview}
          style={styles.previewButton}
        >
          <Text style={styles.previewButtonText}>Show Preview</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <LinearGradient
      colors={['#000000', '#FFFFFF']} // Black and white gradient colors
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Image
          source={getImageSource(book.path)} // Use the passed image
          style={styles.bookImage}
        />
        <Text style={styles.bookTitle}>{book.title}</Text>
      </View>

      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text> // Display error message on screen
      ) : (
        renderBookDescription()
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding * 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  bookImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom:10,
    // Adjust if needed
  },
  bookTitle: {
    fontSize: 20,
    color: COLORS.black, // Updated color to match theme
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  descriptionTitle: {
    fontSize: 20,
    color: COLORS.black, // Updated color to match theme
    marginBottom: 10,
    fontFamily: 'PlayfairDisplay-Bold',
    marginTop: -5,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'PlayfairDisplay-Bold',
    color: COLORS.black, // Updated color to match theme
    lineHeight: 24,
  },
  previewButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 20,
    backgroundColor: COLORS.black, // Updated to black color
    borderRadius: 15,
    alignItems: "center",
  },
  previewButtonText: {
    color: COLORS.white, // Ensure text is white for contrast
    fontFamily: 'PlayfairDisplay-Bold',
  },
  errorMessage: {
    color: COLORS.red, // Style the error message as needed
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BookDetail;
