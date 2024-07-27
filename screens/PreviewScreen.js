import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { API_HOST } from "../myenv";

const PreviewScreen = ({ route }) => {
  const { content_id } = route.params;
  const [previews, setPreviews] = useState([]);

  const getImageSource = (icon) => {
    return { uri: `${API_HOST}/storage/${icon}` }; // Adjusted to match your API structure
  };

  useEffect(() => {
    // Fetch previews based on content_id
    const fetchPreviews = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/previews/${content_id}`); // Replace with your actual API endpoint
        setPreviews(response.data); // Assuming data is an array of previews objects
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching previews:", error);
        // Handle error state or retry logic if needed
      }
    };

    fetchPreviews();
  }, [content_id]); // Ensure content_id is in the dependency array

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
        {previews.map((preview) => (
          <View key={preview.preview_id} style={styles.previewContainer}>
            <Image
              source={getImageSource(preview.path)} // Correctly accessing the path from preview object
              resizeMode="contain"
              style={styles.previewImage}
            />
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
