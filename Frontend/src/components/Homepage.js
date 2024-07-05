// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';

// const HomePage = ({ isDarkMode }) => {
//   // Styles based on dark mode state
//   const styles = isDarkMode ? darkStyles : lightStyles;

//   return (
//     <ImageBackground source={require('../../assets/images/home.jpg')} style={styles.container}>
//       <View style={styles.hero} className='mt-56'>
//         <Text style={styles.heroTitle}>Enhance Traffic Management</Text>
//         <Text style={styles.heroSubtitle}>Optimize Traffic Flow with ALPR</Text>
//         <TouchableOpacity style={styles.heroButton}>
//           <MaterialIcons name="camera-alt" size={24} color="#FFF" />
//           <Text style={styles.heroButtonText}>Capture Photo</Text>
//         </TouchableOpacity>
//         <View style={styles.quotesContainer}>
//           <Text style={styles.quoteText}>"Safety and efficiency drive our mission."</Text>
//           <Text style={styles.quoteAuthor}>- Chief of Traffic Police</Text>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// const commonStyles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   hero: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   heroTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#003366',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   heroSubtitle: {
//     fontSize: 18,
//     color: '#666',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   heroButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#0373fc',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   heroButtonText: {
//     fontSize: 18,
//     color: '#FFF',
//     marginLeft: 10,
//   },
//   quotesContainer: {
//     backgroundColor: '#F3F4F6',
//     padding: 10,
//     borderRadius: 10,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   quoteText: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     textAlign: 'center',
//     color: '#003366',
//   },
//   quoteAuthor: {
//     marginTop: 5,
//     textAlign: 'center',
//     color: '#666',
//   },
// });

// const darkStyles = StyleSheet.create({
//   ...commonStyles,
//   container: {
//     ...commonStyles.container,
//     backgroundColor: '#121212',

//   },
//   heroTitle: {
//     ...commonStyles.heroTitle,
//     color: '#FFF',
//   },
//   heroSubtitle: {
//     ...commonStyles.heroSubtitle,
//     color: '#FFF',
//   },
//   heroButtonText: {
//     ...commonStyles.heroButtonText,
//     color: '#FFF',
//   },
//   quoteText: {
//     ...commonStyles.quoteText,
//     color: '#FFF',
//   },
//   quoteAuthor: {
//     ...commonStyles.quoteAuthor,
//     color: '#CCC',
//   },
// });

// const lightStyles = StyleSheet.create({
//   ...commonStyles,
//   container: {
//     ...commonStyles.container,
//     backgroundColor: '#FFFFFF',
//   },
// });

// export default HomePage;







import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const HomePage = ({ isDarkMode }) => {
  const navigation = useNavigation(); // Initialize navigation

  // Styles based on dark mode state
  const styles = isDarkMode ? darkStyles : lightStyles;

  // Function to handle button press
  const handleCapturePhoto = () => {
    navigation.navigate('CameraScreen'); // Navigate to 'CameraScreen' component
  };

  return (
    <ImageBackground source={require('../../assets/images/home.jpg')} style={styles.container}>
      <View style={styles.hero} className='mt-40'>
        <Text style={styles.heroTitle}>Enhance Traffic Management</Text>
        <Text style={styles.heroSubtitle}>Optimize Traffic Flow with ALPR</Text>
        <TouchableOpacity style={styles.heroButton} onPress={handleCapturePhoto}>
          <MaterialIcons name="camera-alt" size={24} color="#FFF" />
          <Text style={styles.heroButtonText}>Capture Photo</Text>
        </TouchableOpacity>
        <View style={styles.quotesContainer}>
          <Text style={styles.quoteText}>"Safety and efficiency drive our mission."</Text>
          <Text style={styles.quoteAuthor}>- Chief of Traffic Police</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0373fc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  heroButtonText: {
    fontSize: 18,
    color: '#FFF',
    marginLeft: 10,
  },
  quotesContainer: {
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#003366',
  },
  quoteAuthor: {
    marginTop: 5,
    textAlign: 'center',
    color: '#666',
  },
});

const darkStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#121212',
  },
  heroTitle: {
    ...commonStyles.heroTitle,
    color: '#FFF',
  },
  heroSubtitle: {
    ...commonStyles.heroSubtitle,
    color: '#FFF',
  },
  heroButtonText: {
    ...commonStyles.heroButtonText,
    color: '#FFF',
  },
  quoteText: {
    ...commonStyles.quoteText,
    color: '#FFF',
  },
  quoteAuthor: {
    ...commonStyles.quoteAuthor,
    color: '#CCC',
  },
});

const lightStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#FFFFFF',
  },
});

export default HomePage;
