// import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
// import React, { useEffect, useRef } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';

// export default function WelcomeScreen() {
//   const navigation = useNavigation();
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // Fade in animation
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   return (
//     <SafeAreaView className="flex-1" style={{ backgroundColor: 'white' }}>
//       <Animated.View className="flex-1 flex justify-around my-4" style={{ opacity: fadeAnim }}>
//         <Text className="font-bold text-4xl text-center" style={{ color: '#333' }}>
//           eChallan Generation App
//         </Text>

//         <View className="flex-row justify-center">
//           <Image source={require('../assets/images/wl.png')} style={{ width: 350, height: 350 }} />
//         </View>

//         <View className="space-y-4">
//           <TouchableOpacity
//             onPress={() => navigation.navigate('SignUp')}
//             className="py-3 mx-7 rounded-xl"
//             style={{ backgroundColor: 'lightblue' }}
//           >
//             <Text className="text-xl font-bold text-center text-white">Sign Up</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={() => navigation.navigate('Login')}
//             className="py-3 mx-7 rounded-xl"
//           >
//             {/* Using gradient for the Log In button */}
//             <LinearGradient
//               colors={['#FF7E5F', '#FD3A69']} // Gradient from light orange to darker shade
//               start={[0, 0]}
//               end={[1, 1]}
//               style={{ padding: 15, borderRadius: 10 }}
//             >
//               <Text className="text-xl font-bold text-center text-white">Log In</Text>
//             </LinearGradient>
//           </TouchableOpacity>

//           <View className="flex-row justify-center">
//             <Text className="font-semibold" style={{ color: '#333' }}>
//               Already have an account?
//             </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text className="font-semibold text-blue-500"> Log In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Animated.View>
//     </SafeAreaView>
//   );
// }





import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: 'white' }}>
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


      
      <Animated.View className="flex-1 flex justify-around my-4" style={{ opacity: fadeAnim }}>
        <Text className="font text-4xl text-center m-3 rounded-xl p-3" style={{ color: 'black', backgroundColor:'#8ab8e3',shadowColor:'black'}}>
          Automated Traffic Fine Enforcement System
        </Text>

        <View className="flex-row justify-center w-60 h-60 ml-24 -mt-20 mb-32">
          <Image source={require('../assets/images/tl.jpg')} />
        </View>

        <View className="space-y-4">
       

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="py-3 mx-7 rounded-xl"
          >
            {/* Using gradient for the Log In button */}
            <LinearGradient
              colors={['#006BFF','#0D92F4']} // Gradient from light orange to darker shade
              start={[1, 0]}
              end={[1, 1]}
              style={{ padding: 15, borderRadius: 10 }}
            >
              <Text className="text-xl font-bold text-center text-white">Log In</Text>
            </LinearGradient>
          </TouchableOpacity>

       
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
