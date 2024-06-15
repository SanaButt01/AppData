import React, { useState } from 'react';
import { View, TextInput, StyleSheet,Image,TouchableOpacity } from 'react-native';
import { icons } from "../constants";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Perform search action here, passing the searchQuery to the parent component
    onSearch(searchQuery);
  };

  // Trigger search action when searchQuery changes
  React.useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <View style={[styles.container, { width: 340, flexDirection: 'row' }]}>
     <TextInput
  style={styles.input}
  placeholder="Search by Title|Author Name..."
  value={searchQuery}
  onChangeText={(text) => {
    setSearchQuery(text); // Update searchQuery state
  }}
  returnKeyType="search" // Set returnKeyType to "search"
  onSubmitEditing={() => handleSearch(searchQuery)} // Call handleSearch when the search button is pressed
/>
  <Image
    source={icons.search_icon}
    style={{
      width:20,
      height: 20,
      alignSelf: 'center',
      marginLeft: -35,
    }}
  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 7,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    alignSelf: "center",
    zIndex: 999,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 2,
  },
  input: {
    height: 35,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 5,
    width: '100%', // Fill the available width
    fontFamily: 'PlayfairDisplay-Bold',
  },
});

export default SearchBar;
