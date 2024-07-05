import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PoliceForm from './PoliceForm'; // Adjust the import path as needed

const GalleryScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PoliceForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default GalleryScreen;
