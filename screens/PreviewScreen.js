import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { API_HOST } from "../myenv";

const PreviewScreen = ({ route }) => {
  const { content_id } = route.params;
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (content_id) {
      console.log(`Fetching previews for content_id: ${content_id}`);
      fetchPreviews(content_id);
    } else {
      console.error('content_id is undefined');
    }
  }, [content_id]);

  const fetchPreviews = async (id) => {
    try {
      const response = await axios.get(`${API_HOST}/api/previews/${id}`);
      setPreviews(response.data);
      console.log("API response data:", response.data);
    } catch (error) {
      console.error("Error fetching previews:", error);
    }
  };

  const getImageSource = (icon) => {
    return { uri: `${API_HOST}/storage/${icon}` }; // Adjusted to match your API structure
  };

  const renderPreviews = () => {
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
              source={getImageSource(preview.path)}
              resizeMode="contain"
              style={styles.previewImage}
            />
          </View>
        ))}
      </ScrollView>
    );
  };

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
    height: 300,
    marginBottom: SIZES.padding,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PreviewScreen;