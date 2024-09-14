import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { icons } from '../constants';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    onSearch(searchQuery);
    // console.log(searchQuery);
  }, [searchQuery]);

  return (
    <View style={[styles.container, { width: 340, flexDirection: 'row' }]}>
      <TextInput
        style={styles.input}
        placeholder="Search by Title|Author Name..."
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        returnKeyType="search"
        onSubmitEditing={() => onSearch(searchQuery)}
      />
      <Image
        source={icons.search_icon}
        style={{ width: 20, height: 20, alignSelf: 'center', marginLeft: -35 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 999,
    marginTop: 20, // high margin was blocking the book list. Reduced it from 100 to 20
    borderColor: 'black',
    borderWidth: 1,
  },
  input: {
    height: 35,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 5,
    width: '100%',
    fontFamily: 'PlayfairDisplay-Bold',
    paddingTop:5,
    color: 'black',
  },
});

export default SearchBar;
