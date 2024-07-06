import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { images } from "../constants"; // Import your image assets
 // PREVIEW SCREEN 
// Hardcoded previews data
const previewsData = [
  {
    preview_id: 1,
    content_id: 1,
    paths: [
      { im: images.eng1 },
      { im: images.eng1 },
      { im: images.eng1 },
    ],
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
  },
  {
    preview_id: 1,
    content_id: 2,
    paths: [
      { im: images.eng2 },
      { im: images.eng2 },
      { im: images.eng2 },
    ],
    created_at: "2023-01-02",
    updated_at: "2023-01-02",
  },
  {
    preview_id: 1,
    content_id: 3,
    paths: [
      { im: images.LA },
      { im: images.LA },
      { im: images.LA },
    ],
    created_at: "2023-01-03",
    updated_at: "2023-01-03",
  },
  {
    preview_id: 1,
    content_id: 4,
    paths: [
      { im: images.AI },
      { im: images.AI },
      { im: images.AI },
    ],
    created_at: "2023-01-03",
    updated_at: "2023-01-03",
  },
  // Add more previews as needed
];

const PreviewScreen = ({ route }) => {
  const { book_id } = route.params;
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
   
    const fetchedPreviews = previewsData.filter(item => item.content_id === book_id);
    setPreviews(fetchedPreviews);
  }, [book_id]);

  function renderPreviews() {
    if (previews.length === 0) {
      return (
        <View style={styles.center}>
          <Text>No previews available.</Text>
        </View>
      );
    }

    return (
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {previews.map((preview, index) => (
          <View key={index} style={styles.previewContainer}>
            {preview.paths.map((path, pathIndex) => (
              <Image
                key={pathIndex}
                source={path.im} // Assuming path is imported from images
                resizeMode="contain"
                style={styles.previewImage}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <View style={{ flex: 1 }}>{renderPreviews()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  previewContainer: {
    marginBottom: SIZES.padding,
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: 300, // Adjust height as needed
    marginBottom: SIZES.padding,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PreviewScreen;
