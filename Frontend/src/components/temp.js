import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const CharacterDetectionScreen = () => {
  const [imagePath, setImagePath] = useState('');

  const handleDetectCharacters = async () => {
    try {
      const response = await axios.post('http://your-django-server-url/api/detect-characters/', {
        image_path: imagePath, // Send the image path to Django backend
      });

      // Handle successful response
      console.log('Detection Result:', response.data.result);
      Alert.alert('Detection Result', response.data.result);

    } catch (error) {
      // Handle error
      console.error('Error detecting characters:', error);
      Alert.alert('Error', 'Failed to detect characters. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Enter Image Path:</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        onChangeText={text => setImagePath(text)}
        value={imagePath}
        placeholder="Enter image path..."
        autoCapitalize="none"
      />
      <Button
        title="Detect Characters"
        onPress={handleDetectCharacters}
      />
    </View>
  );
};

export default CharacterDetectionScreen;
