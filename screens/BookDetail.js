import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import { FONTS, COLORS, SIZES, icons } from "../constants";

const BookDetail = ({ route, navigation }) => {
  const [book, setBook] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [scrollViewWholeHeight, setScrollViewWholeHeight] = useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = useState(0);

  const indicator = new Animated.Value(0);

  useEffect(() => {
    let { book } = route.params;
    console.log('Book received:', book); // Debug log
    setBook(book);
  }, []);

  function renderBookInfoSection() {
    if (!book) return null;

    return (
      <View style={{ flex: 1 }}>
        {book.path && (
          <ImageBackground
            source={book.path}
            resizeMode="cover"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          />
        )}

        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        ></View>

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.radius,
            height: 80,
            alignItems: "flex-end",
          }}
        ></View>

        <View style={{ flex: 5, paddingTop: SIZES.padding2, alignItems: "center" }}>
          {book.path && (
            <Image
              source={book.path}
              resizeMode="contain"
              style={{
                flex: 1,
                width: 150,
                height: "auto",
              }}
            />
          )}
        </View>
      </View>
    );
  }

  function renderBookDescription() {
    if (!book) return null;
  
    const indicatorSize =
      scrollViewWholeHeight > scrollViewVisibleHeight
        ? (scrollViewVisibleHeight * scrollViewVisibleHeight) / scrollViewWholeHeight
        : scrollViewVisibleHeight;
  
    const difference =
      scrollViewVisibleHeight > indicatorSize
        ? scrollViewVisibleHeight - indicatorSize
        : 1;
  
    return (
      <View style={styles.descriptionContainer}>
        <View style={styles.scrollIndicatorContainer}>
          <Animated.View
            style={[
              styles.scrollIndicator,
              {
                height: indicatorSize,
                transform: [
                  {
                    translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).interpolate({
                      inputRange: [0, difference],
                      outputRange: [0, difference],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
  
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={(width, height) => setScrollViewWholeHeight(height)}
          onLayout={({ nativeEvent: { layout: { height } } }) => setScrollViewVisibleHeight(height)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: indicator } } }],
            { useNativeDriver: false }
          )}
        >
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{book.description}</Text>
        </ScrollView>
      </View>
    );
  }
  

  function renderPreviewPages() {
    if (!showPreview || !book || !book.paths) return null;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          style={{ marginLeft: SIZES.base}}
          onPress={() => setShowPreview(false)}
        >
          <Image
            source={icons.page_filled_icon}
            resizeMode="contain"
            style={{
              width: 20,
              height: 30,
            }}
          />
        </TouchableOpacity>
        {book.paths.map((page, index) => (
          <View key={index} style={styles.previewPageContainer}>
            {page.im && (
              <Image
                source={page.im}
                resizeMode="contain"
                style={styles.previewPageImage}
              />
            )}
          </View>
        ))}
      </ScrollView>
    );
  }

  function renderBottomButton() {
    if (showPreview) return null;

    return (
      <View style={{ marginTop:10,alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => setShowPreview(true)}
          style={{
            paddingHorizontal: 80,
            paddingVertical: 10,
            height: 50,
            backgroundColor: COLORS.white,
            borderRadius: 20,
          
          }}
        >
          <Text style={{ fontSize:20, color: COLORS.black,fontFamily: 'PlayfairDisplay-Bold'}}>Show Preview</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      {renderPreviewPages()}
      <View style={{ flex: 1 }}>{renderBookInfoSection()}</View>
      <View style={{ flex: 1 }}>{renderBookDescription()}</View>
      <View style={{ height: 40, marginBottom: 30 }}>{renderBottomButton()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  previewPageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  previewPageImage: {
    width: "100%",
    height: 500,
    marginTop: 15,
  },
  pageNumberText: {
    color: COLORS.white,
  },
  descriptionTitle: {
    ...FONTS.h1,
    color: COLORS.white,
    marginBottom: SIZES.padding,
  },
  descriptionText: {
    ...FONTS.body2,
    color: COLORS.lightGray,
    textAlign: 'justify',
    lineHeight: 22,
    marginVertical: 10,
    letterSpacing: 0.1,
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: "row",
    padding: SIZES.padding,
    marginTop: SIZES.padding,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: SIZES.radius,
  },
  scrollIndicatorContainer: {
    width: 2,
    height: "100%",
    backgroundColor: COLORS.gray1,
    borderRadius: SIZES.radius,
  },
  scrollIndicator: {
    width: 4,
    backgroundColor: COLORS.lightGray4,
  },
  scrollViewContent: {
    paddingLeft: SIZES.padding2,
  },
});

export default BookDetail;
