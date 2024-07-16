import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import axios from "axios";
import { API_HOST } from "../myenv";

const BookDetail = ({ route, navigation }) => {
  const { book_id } = route.params; // Receive book_id from route params
  const [book, setBook] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const parsedBookId = parseInt(book_id);
    console.log(parsedBookId);

    axios.get(`${API_HOST}/api/books/${parsedBookId}/content`)
      .then(response => {
        console.log("API response:", response.data);

        if (response.data) {
          setBook(response.data);

          const fetchedContent = {
            book_id: parsedBookId,
            description: response.data.description,
          };
          setContent(fetchedContent);
        } else {
          console.error("No data found in response");
        }
      })
      .catch(error => {
        console.error("Error fetching book details:", error);
      });
  }, [book_id]);

  const handleShowPreview = () => {
    navigation.navigate('PreviewScreen', { content_id: book.content_id });
  };

  function renderBookDescription() {
    if (!book || !content) return null;

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
    <View style={styles.container}>
      {renderBookDescription()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    padding: SIZES.padding * 2,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  descriptionTitle: {
    ...FONTS.h2,
    marginBottom: SIZES.padding,
  },
  descriptionText: {
    ...FONTS.body3,
    marginBottom: SIZES.padding * 2,
  },
  previewButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: "center",
  },
  previewButtonText: {
    color: COLORS.white,
    ...FONTS.body2,
  },
});

export default BookDetail;
