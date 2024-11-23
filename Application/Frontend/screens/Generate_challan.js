// import React, { useState, useEffect, useRef } from 'react';
// import { View, StyleSheet, TouchableOpacity, Image, Text, ImageBackground } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { MaterialIcons, Ionicons } from '@expo/vector-icons';

// export default function Generate_challan({ isDarkMode = false }) {
//   const [image, setImage] = useState(null);
//   const [facing, setFacing] = useState(Camera.Constants.Type.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();
//   const cameraRef = useRef(null);
//   const navigation = useNavigation();

//   const styles = isDarkMode ? darkStyles : lightStyles;

//   useEffect(() => {
//     (async () => {
//       await MediaLibrary.requestPermissionsAsync();
//       await requestPermission();
//     })();
//   }, []);

//   useEffect(() => {
//     loginUser();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       try {
//         const { uri } = await cameraRef.current.takePictureAsync();
//         setImage(uri);
//       } catch (error) {
//         console.log('Error taking picture:', error);
//       }
//     }
//   };

//   const loginUser = async () => {
//     try {
//       console.log('Logging in...');
//       const response = await fetch('http://192.168.1.12:8000/auth/api/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: 'kathan',
//           password: '123',
//         }),
//       });

//       const data = await response.json();
//       if (data.token) {
//         console.log('Token received:', data.token);
//         await AsyncStorage.setItem('authToken', data.token);
//         console.log('Stored token:', await AsyncStorage.getItem('authToken'));
//       } else {
//         console.error('Login failed');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   const savePicture = async () => {
//     if (image) {
//       console.log('savePicture function called');
//       try {
//         navigation.navigate('PoliceForm', { photoUri: image });
//       } catch (error) {
//         console.log('Error processing picture:', error);
//       }
//     }
//   };

//   if (permission?.granted === false) {
//     return <Text>Camera permission denied. Please grant access in settings.</Text>;
//   }

//   const LogoImage = isDarkMode 
//     ? require('../assets/images/image.png') 
//     : require('../assets/images/image.png');

//   return (
//     <ImageBackground source={LogoImage} style={styles.background}>
//       <View style={styles.container}>
//         {!image ? (
//           <Camera style={styles.camera} type={facing} ref={cameraRef}>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.button} onPress={takePicture}>
//                 <MaterialIcons name="camera-alt" size={24} color="#FFF" />
//               </TouchableOpacity>
//             </View>
//           </Camera>
//         ) : (
//           <Image source={{ uri: image }} style={styles.camera} />
//         )}

//         <View style={styles.controls}>
//           {image ? (
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.button} onPress={() => setImage(null)}>
//                 <Ionicons name="refresh-circle-outline" size={24} color="black" />
//                 <Text style={styles.text}>Re-take</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.button} onPress={savePicture}>
//                 <MaterialIcons name="check" size={24} color="#FFF" />
//                 <Text style={styles.text}>Continue</Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity style={styles.button} onPress={takePicture}>
//                 <MaterialIcons name="camera-alt" size={24} color="#FFF" />
//                 <Text style={styles.text}>Take a picture</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// const commonStyles = StyleSheet.create({
//   background: {
//     flex: 1,
//     resizeMode: 'cover',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: 100,
//     padding: 5,
//   },
//   controls: {
//     flex: 0.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 100,
//     marginLeft: 20,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#004aad',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     margin: 5,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//   },
//   text: {
//     fontSize: 18,
//     color: '#FFF',
//     marginLeft: 10,
//     fontWeight: 'bold',
//   },
//   camera: {
//     flex: 1,
//     borderRadius: 30,
//     width: '90%',
//     margin: 20,
//     overflow: 'hidden',
//   },
// });

// const darkStyles = StyleSheet.create({
//   ...commonStyles,
//   text: {
//     ...commonStyles.text,
//     color: '#FFF',
//   },
//   button: {
//     ...commonStyles.button,
//     backgroundColor: '#1F2937',
//   },
// });

// const lightStyles = StyleSheet.create({
//   ...commonStyles,
//   text: {
//     ...commonStyles.text,
//     color: '#003366',
//   },
//   button: {
//     ...commonStyles.button,
//     backgroundColor: '#0373fc',
//   },
// });





import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { auth, firestore, storage } from "../config/firebase"
import { getFirestore, doc, getDoc, updateDoc, setDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export default function GenerateChallan({ isDarkMode = false }) {
  const [image, setImage] = useState(null);
  const [firebaseImageUrl, setFirebaseImageUrl] = useState('');
  const [facing, setFacing] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const navigation = useNavigation();


  const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 100,
      padding: 5,
    },
    controls: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 100,
      marginLeft: 20,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0373fc',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      margin: 5,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    text: {
      fontSize: 18,
      color: '#FFF',
      marginLeft: 10,
      fontWeight: 'bold',
    },
    camera: {
      flex: 1,
      borderRadius: 30,
      width: '90%',
      margin: 20,
      overflow: 'hidden',
      backgroundColor: 'rgba(138, 184, 227, 0.5)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
  });

  useEffect(() => {
    (async () => {
      await MediaLibrary.requestPermissionsAsync();
      await requestPermission();
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        // Take the picture at 640x640 resolution
        const { uri } = await cameraRef.current.takePictureAsync({
          quality: 1,
          width: 640,
          height: 640,
        });
        setImage(uri);
      } catch (error) {
        console.log('Error taking picture:', error);
      }
    }
  };

  const uploadImage = async (uri) => {
    const user = auth.currentUser;

    if (user) {
      try {
        console.log("before image upload")
        const response = await fetch(uri);
        const blob = await response.blob();
        const randomImageName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.jpg`;
        const storageRef = ref(storage, `VehicleImages/${user.uid}/${randomImageName}`);
        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);
        setFirebaseImageUrl(downloadURL);
        console.log("firebase image url: ", downloadURL);
        console.log("Image uploaded successfully!");

        navigation.navigate("PoliceForm", { photoUrl: downloadURL });
        // return downloadURL;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      try {
        // Upload image and get the URL
        const imageUrl = await uploadImage(image);
        // Navigate and pass the image URL to the next screen
        // console.log("firebase image url in savepicture function: ", firebaseImageUrl)
        // navigation.navigate('PoliceForm', { photoUrl: firebaseImageUrl });
      } catch (error) {
        console.log('Error processing picture:', error);
      }
    }
  };


  if (permission?.granted === false) {
    return <Text>Camera permission denied. Please grant access in settings.</Text>;
  }

  return (
    <ImageBackground style={styles.background}>
               <View
        style={{
          position: 'absolute',
          width: 415,
          height: 500,
        //   borderRadius: 600, 
        borderBottomLeftRadius:700,
        
          backgroundColor: '#fcecbd', // Orange color
          top: -80,
        //   right: -150, // Positioning it from the right side
          transform: [{ scaleX: 1.2 }] // Stretch horizontally to make it elliptical
        }}
      />
       <View
        style={{
          position: 'absolute',
          width: 415,
          height: 500,
        //   borderRadius: 600, 
        borderTopRightRadius:700,
        
          backgroundColor: '#c2fcbd', // Orange color
          bottom: -100,
        //   right: -150, // Positioning it from the right side
          transform: [{ scaleX: 1.2 }] // Stretch horizontally to make it elliptical
        }}
      />
      <View style={styles.container}>
        {!image ? (
          <Camera style={styles.camera} type={facing} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <MaterialIcons name="camera-alt" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <Image source={{ uri: image }} style={styles.camera} />
        )}

        <View style={styles.controls}>
          {image ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => setImage(null)}>
                <Ionicons name="refresh-circle-outline" size={24} color="black" />
                <Text style={styles.text}>Re-take</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={savePicture}>
                <MaterialIcons name="check" size={24} color="#FFF" />
                <Text style={styles.text}>Continue</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <MaterialIcons name="camera-alt" size={24} color="#FFF" />
                <Text style={styles.text}>Take a picture</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}