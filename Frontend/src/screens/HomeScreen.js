
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import NavBar from '../components/Navbar';
import HomePage from '../components/Homepage';

const HomeScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={styles.container}>
      <NavBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <HomePage isDarkMode={isDarkMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;


