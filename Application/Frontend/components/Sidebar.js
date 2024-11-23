// // import React from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

// // const Sidebar = ({ sidebarAnim, toggleSidebar }) => {
// //   return (
// //     <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnim }] }]}>
// //       <Text style={styles.menuTitle}>Menu</Text>
// //       <TouchableOpacity style={styles.menuItem} onPress={() => {/* Navigate to another screen */}}>
// //         <Text style={styles.menuText}>Generate Challan</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity style={styles.menuItem} onPress={() => {/* Navigate to another screen */}}>
// //         <Text style={styles.menuText}>View Challans</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity style={styles.menuItem} onPress={() => {/* Navigate to another screen */}}>
// //         <Text style={styles.menuText}>Settings</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity style={styles.menuItem} onPress={() => {/* Log out */}}>
// //         <Text style={styles.menuText}>Log Out</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
// //         <Text style={styles.closeButtonText}>Close</Text>
// //       </TouchableOpacity>
// //     </Animated.View>
// //   );
// // };  

// // const styles = StyleSheet.create({
// //   sidebar: {
// //     position: 'absolute',
// //     left: 0,
// //     top: 30,
// //     backgroundColor: 'white',
// //     width: 300,
// //     height: '100%',
// //     borderTopRightRadius: 30,
// //     borderBottomRightRadius: 30,
// //     padding: 20,
// //     elevation: 5,
// //     zIndex: 10,
// //   },
// //   menuTitle: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //     textAlign: 'center',
// //   },
// //   menuItem: {
// //     paddingVertical: 10,
// //   },
// //   menuText: {
// //     fontSize: 18,
// //     color: '#333',
// //   },
// //   closeButton: {
// //     marginTop: 20,
// //   },
// //   closeButtonText: {
// //     color: '#FF5722',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// // });

// // export default Sidebar;





// import React from 'react';
// import { View, Text, TouchableOpacity, Animated } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const Sidebar = ({ sidebarAnim, toggleSidebar }) => {
//   return (
//     <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnim }] }]}>
//       <Text className="text-2xl font-bold mb-5 text-center">Menu</Text>

//       <TouchableOpacity style={styles.menuItem} onPress={() => {/* Navigate to Generate Challan */}}>
//         <Ionicons name="document-text" size={24} color="#333" />
//         <Text className="text-lg font-semibold ml-3">Generate Challan</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem} onPress={() => {/* Navigate to View Challans */}}>
//         <Ionicons name="list" size={24} color="#333" />
//         <Text className="text-lg font-semibold ml-3">View Challans</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem} onPress={() => {/* Navigate to Settings */}}>
//         <Ionicons name="settings" size={24} color="#333" />
//         <Text className="text-lg font-semibold ml-3">Settings</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.menuItem} onPress={() => {/* Log out */}}>
//         <Ionicons name="log-out" size={24} color="#333" />
//         <Text className="text-lg font-semibold ml-3">Log Out</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
//         <Text className="text-orange-500 text-lg font-bold text-center">Close</Text>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// const styles = {
//   sidebar: {
//     position: 'absolute',
//     left: 0,
//     top: 30,
//     backgroundColor: 'white',
//     width: 300,
//     height: '100%',
//     borderTopRightRadius: 30,
//     borderBottomRightRadius: 30,
//     padding: 20,
//     elevation: 5,
//     zIndex: 10,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//   },
//   closeButton: {
//     marginTop: 20,
//     paddingVertical: 10,
//   },
// };

// export default Sidebar;




import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from '../config/firebase';

const Sidebar = ({ sidebarAnim, toggleSidebar }) => {
  // State to manage pressed button styles
  const [activeButton, setActiveButton] = React.useState(null);
  const navigation = useNavigation();

  // Function to handle button press
  const handlePressIn = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handlePressOut = () => {
    setActiveButton(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth)
        .then(() =>
          console.log("Successfully logged out!"));
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };


  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnim }] }]}>
      <Text className="text-2xl font-bold mb-5 text-center">Menu</Text>

      {/* Menu Item: Generate Challan */}
      <TouchableOpacity
        style={[styles.menuItem, activeButton === 'Generate' && styles.activeButton]}
        onPressIn={() => handlePressIn('Generate')}
        onPressOut={handlePressOut}
        onPress={() => {/* Navigate to Generate Challan */}}
      >
        <Ionicons name="document-text" size={24} color="#333" />
        <Text className="text-lg font-semibold ml-3">Generate Challan</Text>
      </TouchableOpacity>

      {/* Menu Item: View Challans */}
      <TouchableOpacity
        style={[styles.menuItem, activeButton === 'View' && styles.activeButton]}
        onPressIn={() => handlePressIn('View')}
        onPressOut={handlePressOut}
        onPress={() => {/* Navigate to View Challans */}}
      >
        <Ionicons name="list" size={24} color="#333" />
        <Text className="text-lg font-semibold ml-3">View Challans</Text>
      </TouchableOpacity>

      {/* Menu Item: Settings */}
      <TouchableOpacity
        style={[styles.menuItem, activeButton === 'Settings' && styles.activeButton]}
        onPressIn={() => handlePressIn('Settings')}
        onPressOut={handlePressOut}
        onPress={() => {/* Navigate to Settings */}}
      >
        <Ionicons name="settings" size={24} color="#333" />
        <Text className="text-lg font-semibold ml-3">Settings</Text>
      </TouchableOpacity>

      {/* Menu Item: Log Out */}
      <TouchableOpacity
        style={[styles.menuItem, activeButton === 'Logout' && styles.activeButton]}
        onPressIn={handleLogout}
        onPressOut={handlePressOut}
        onPress={() => {/* Log out */}}
      >
        <Ionicons name="log-out" size={24} color="#333" />
        <Text className="text-lg font-semibold ml-3">Log Out</Text>
      </TouchableOpacity>

      {/* Close Button */}
      <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
        <Text className="text-orange-500 text-lg font-bold text-center">Close</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = {
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 30,
    backgroundColor: '#d5f0ff',
    width: 300,
    height: '99%',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    padding: 20,
    bottom:20,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22, // Increased vertical padding
    paddingHorizontal: 15, // Increased horizontal padding
    borderRadius: 8, // Rounded corners
  },
  activeButton: {
    backgroundColor: '#FF5722', // Background color on press
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 12, // Added padding for close button
  },
};

export default Sidebar;
