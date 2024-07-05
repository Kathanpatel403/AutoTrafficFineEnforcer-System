// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
// import { useNavigation, DrawerActions } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';

// const NavBar = ({ isDarkMode, toggleTheme }) => {
//   const navigation = useNavigation();

//   // Example animated logo rotation
//   const spinValue = new Animated.Value(0);
//   Animated.loop(
//     Animated.timing(spinValue, {
//       toValue: 1,
//       duration: 3000,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     })
//   ).start();

//   const spin = spinValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '360deg'],
//   });

//   const openDrawer = () => {
//     navigation.dispatch(DrawerActions.openDrawer());
//   };

//   // Styles based on dark mode state
//   const styles = isDarkMode ? darkStyles : lightStyles;

//   return (
//     <View style={styles.header}>
//       <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
//         <MaterialIcons name="menu" size={24} color={isDarkMode ? '#4CAF50' : '#003366'} />
//       </TouchableOpacity>
//       <Animated.Image
//         source={require('../../assets/images/image.png')}
//         style={[styles.logo, { transform: [{ rotate: spin }] }]}
//       />
//       <Text style={styles.title}>Traffic Police</Text>
//       <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
//         <MaterialIcons
//           name={isDarkMode ? 'brightness-7' : 'brightness-2'}
//           size={24}
//           color={isDarkMode ? '#4CAF50' : '#003366'}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const commonStyles = StyleSheet.create({
//   header: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#F3F4F6',
//   },
//   menuButton: {
//     padding: 10,
//     borderRadius: 10,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#003366',
//   },
//   toggleButton: {
//     padding: 10,
//     borderRadius: 10,
//   },
// });

// const darkStyles = StyleSheet.create({
//   ...commonStyles,
//   header: {
//     ...commonStyles.header,
//     backgroundColor: '#1F1F1F',
//   },
//   title: {
//     ...commonStyles.title,
//     color: '#FFF',
//   },
// });

// const lightStyles = StyleSheet.create({
//   ...commonStyles,
//   header: {
//     ...commonStyles.header,
//     backgroundColor: '#F3F4F6',
//   },
// });

// export default NavBar;


import React from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const NavBar = ({ isDarkMode, toggleTheme }) => {
  const navigation = useNavigation();

  // Example animated logo rotation
  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  // Styles based on dark mode state
  const headerStyle = isDarkMode
    ? {
        backgroundColor: '#1F1F1F',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#4CAF50',
        borderBottomColor: '#1bb5f5',
      }
    : {
        backgroundColor: '#b6e6fa', // Sky blue background
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#1bb5f5',
        borderTopColor: '#1bb5f5',
        
        
      };

  const titleStyle = isDarkMode
    ? { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginLeft: 10 }
    : { fontSize: 24, fontWeight: 'bold', color: '#003366', marginLeft: 10 };

  const iconColor = isDarkMode ? '#4CAF50' : '#003366';

  return (
    <View style={{ ...headerStyle, elevation: 8 }} className='mt-9'>
      <TouchableOpacity onPress={openDrawer} style={{ marginRight: 10 }}>
        <MaterialIcons name="menu" size={28} color={iconColor} />
      </TouchableOpacity>
      <Animated.Image
        source={require('../../assets/images/image.png')}
        style={{
          width: 50,
          height: 50,
          
          borderRadius: 5,
          borderWidth: 2,
          borderColor: isDarkMode ? '#4CAF50' : '#003366',
          marginRight: 10,
        }}
      />
      <Text style={titleStyle}>Traffic Police</Text>
      <TouchableOpacity onPress={toggleTheme} style={{ marginLeft: 'auto', marginRight: 10 }}>
        <MaterialIcons name={isDarkMode ? 'brightness-7' : 'brightness-2'} size={28} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
