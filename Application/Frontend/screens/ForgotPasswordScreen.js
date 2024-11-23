import { ArrowLeftIcon } from "react-native-heroicons/solid";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../config/firebase";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';

import { themeColors } from "../theme";
export default function ForgotPasswordScreen() {
  const [emailValid, setEmailValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/; // Regex for validation
    if (regex.test(pass)) {
      setPasswordValid(true);
      setPasswordError("");
    } else {
      setPasswordValid(false);
      setPasswordError(
        "Password must contain at least 6 characters, including uppercase, lowercase, and a number."
      );
    }
  };
  
  const forgotPasswordhandler = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      ToastAndroid.show(
        "Password reset link sent successfully!",
        ToastAndroid.SHORT
      );
      console.log("Password reset link sent successfully!");
      navigation.navigate("Login");
    } catch (error) {
      ToastAndroid.show(`Error occurred: ${error.message}`, ToastAndroid.SHORT);
      console.error(`Error occurred: ${error.message}`);
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

  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
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
          <Image
            source={require("../assets/images/loginimg.png")}
            style={{ width: 220, height: 200 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-[#d5f0ff] px-8 pt-8"
      >
        <View className="form space-y-2">
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
              color={emailValid ? "green" : "#0D92F4"} // Change color based on validation
              style={{ position: "absolute", left: 15, top: 38 }} // Positioning the icon
            />
          </View>
          {emailError ? (
            <Text className="text-red-500 text-center">{emailError}</Text>
          ) : null}

          <TouchableOpacity
            onPress={forgotPasswordhandler}
            className="py-3 mx-7 rounded-xl"
          >
            {/* Using gradient for the Log In button */}
            <LinearGradient
              colors={["#0D92F4", "#1230AE"]} // Gradient from light orange to darker shade
              start={[1, 0]}
              end={[1, 1]}
              style={{ padding: 15, borderRadius: 10 }}
            >
              <Text className="text-xl font-bold text-center text-white">
                Log In
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-7">
          <Text className="text-black font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="font-semibold text-gray-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
