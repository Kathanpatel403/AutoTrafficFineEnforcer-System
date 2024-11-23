import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase'; // Import Firebase auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons from react-native-vector-icons
import { LinearGradient } from 'expo-linear-gradient';
export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/; // Regex for validation
    if (regex.test(pass)) {
      setPasswordValid(true);
      setPasswordError('');
    } else {
      setPasswordValid(false);
      setPasswordError('Password must contain at least 6 characters, including uppercase, lowercase, and a number.');
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validating email format
    if (regex.test(email)) {
      setEmailValid(true);
      setEmailError('');
    } else {
      setEmailValid(false);
      setEmailError('Please enter a valid email address.');
    }
  };
  
  const handleForgotPassword = async () => {
    console.log("Forgot password")
  }

  const handleLogin = async () => {
    // Check if email and password are valid before attempting to log in
    if (!emailValid) {
      Alert.alert('Invalid Email', emailError || 'Please enter a valid email.');
      return;
    }
    if (!passwordValid) {
      Alert.alert('Invalid Password', passwordError || 'Please enter a valid password.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to home screen on successful login
      navigation.navigate('Home');
      console.log("welcome user.")
    } catch (error) {
      // Handle Firebase errors
      let errorMessage;
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid.';
          break;
        default:
          errorMessage = 'Oops! Invalid credentials.';
      }
      Alert.alert('Login Error', errorMessage);
    }
  };

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image source={require('../assets/images/loginimg.png')} style={{ width: 220, height: 200 }} />
        </View>
      </SafeAreaView>

      <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }} className="flex-1 bg-[#d5f0ff] px-8 pt-8">
        <View className="form space-y-4">
          {/* Email Input */}
          <View className="relative">
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3 pl-10" // Added padding left for icon
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                validateEmail(text); // Validate email on change
              }}
            />
            <Icon
              name="email"
              size={20}
              color={emailValid ? 'green' : '#0D92F4'} // Change color based on validation
              style={{ position: 'absolute', left: 15, top: 38 }} // Positioning the icon
            />
          </View>

          {/* Email Error Message */}
          {emailError ? <Text className="text-red-500 text-center">{emailError}</Text> : null}

          {/* Password Input */}
          <View className="relative">
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3 pl-10" // Added padding left for icon
              secureTextEntry
              placeholder="Password"
              value={password}
              onChangeText={(pass) => {
                setPassword(pass);
                validatePassword(pass); // Validate password on change
              }}
            />
            <Icon
              name="lock"
              size={20}
              color={passwordValid ? 'green' : '#0D92F4'} // Change color based on validation
              style={{ position: 'absolute', left: 15, top: 38 }} // Positioning the icon
            />
          </View>

          {/* Password Error Message */}
          {passwordError ? <Text className="text-red-500 text-center">{passwordError}</Text> : null}

          {/* Forgot Password Link */}
          <TouchableOpacity className="flex items-end" onPress={() => {navigation.navigate("ForgotPassword")}}>
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            onPress={() => handleLogin()}
            className="py-3 mx-7 rounded-xl"
          >
            {/* Using gradient for the Log In button */}
            <LinearGradient
              colors={['#0D92F4','#1230AE']} // Gradient from light orange to darker shade
              start={[1, 0]}
              end={[1, 1]}
              style={{ padding: 15, borderRadius: 10 }}
            >
              <Text className="text-xl font-bold text-center text-white">Log In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View>
          <Text>Already have an account ? </Text>
          <TouchableOpacity className="flex items-end" onPress={() => {navigation.navigate("SignUp")}}>
            <Text className="text-gray-700 mb-5">Sign Up</Text>
          </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
  );
}