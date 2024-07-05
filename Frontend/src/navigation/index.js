// import React, { useEffect, useState } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import HomeScreen from "../screens/HomeScreen";
// import LoginScreen from "../screens/LoginScreen";
// import SignUpScreen from "../screens/SignupScreen";
// import PoliceForm from "../screens/PoliceForm";
// import CameraScreen from "../screens/CameraScreen";
// import GalleryScreen from '../screens/GalleryScreen '
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// const Stack = createNativeStackNavigator();

// const Drawer = createDrawerNavigator();

// const CustomDrawerContent = (props) => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// };

// export default function AppNavigation() {
//   const [initialRoute, setInitialRoute] = useState("Login");

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setInitialRoute("CameraScreen");
//       } else {
//         setInitialRoute("Login");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <NavigationContainer>
//           <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
//       <Stack.Navigator initialRouteName={initialRoute}>
//         <Stack.Screen
//           name="Home"
//           options={{ headerShown: false }}
//           component={HomeScreen}
//         />
//         <Stack.Screen
//           name="CameraScreen"
//           options={{ headerShown: false }}
//           component={CameraScreen}
//         />
//         <Stack.Screen
//           name="GalleryScreen"
//           options={{ headerShown: false }}
//           component={GalleryScreen}
//         />
       
//         <Stack.Screen
//           name="PoliceForm"
//           options={{ headerShown: false }}
//           component={PoliceForm}
//         />
       
//         <Stack.Screen
//           name="LogIn"
//           options={{ headerShown: false }}
//           component={LoginScreen}
//         />
//         <Stack.Screen
//           name="SignUp"
//           options={{ headerShown: false }}
//           component={SignUpScreen}
//         />
    
//       </Stack.Navigator>
//       </Drawer.Navigator> 
//     </NavigationContainer>
//   );
// }


import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignupScreen";
import PoliceForm from "../screens/PoliceForm";
import CameraScreen from "../screens/CameraScreen";
import GalleryScreen from '../screens/GalleryScreen ';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const AppNavigation = () => {
  const [initialRoute, setInitialRoute] = useState("HomeScreen");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setInitialRoute("HomeScreen");
      } else {
        setInitialRoute("Login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" options={{ headerShown: false }}>
          {() => (
            <Stack.Navigator initialRouteName={initialRoute}>
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="CameraScreen" component={CameraScreen} options={{ headerShown: false }} />
              <Stack.Screen name="GalleryScreen" component={GalleryScreen} options={{ headerShown: false }} />
              <Stack.Screen name="PoliceForm" component={PoliceForm} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
