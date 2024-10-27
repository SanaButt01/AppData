import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { icons } from '../constants'; // Update this path to where your icons are stored

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={icons.logo2}
        style={styles.logo}
      />
      
      <Text style={styles.description}>
        Welcome to <Text style={styles.brandName}>BooksCity</Text>, your number one source for all things books. We're dedicated to giving you the very best of books, with a focus on quality, customer service, and uniqueness.
      </Text>
      <Text style={styles.description}>
        Founded in 2024, <Text style={styles.brandName}>BooksCity</Text> has come a long way from its beginnings. 
      </Text>
      <Text style={styles.description}>
        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
      </Text>
      <Text style={styles.footer}>Sincerely, <Text style={styles.brandName}>BooksCity Team</Text></Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  logo: {
    width: 100,
    height: 140,
    alignSelf: 'center',
    marginBottom: 30,
  
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'justify',
  },
  brandName: {
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  footer: {
    fontSize: 18,
    color: '#2C3E50',
    marginTop: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default AboutUsScreen;
