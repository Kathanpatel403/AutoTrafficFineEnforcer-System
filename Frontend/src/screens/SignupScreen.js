import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  ToastAndroid
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../config/firebase";
import { collection, doc, setDoc } from 'firebase/firestore';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    if (email && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const uid = userCredential.user.uid;

        const userRoleRef = doc(collection(firestore, 'userRoles'), uid);
        setDoc(userRoleRef, {
          role: "user",
          email: email,
          name: name,
        }).then(() => {
          console.log("User role set successfully.");
          navigation.navigate("UserInformation")
        }).catch((error) => {
          console.error("Error setting user role:", error);
        })
        ToastAndroid.show(`User created successfully!`, ToastAndroid.SHORT);
        navigation.navigate("Home");
      } catch (err) {
        ToastAndroid.show(`got error: ${err.message}`, ToastAndroid.SHORT);
        console.log("got error: ", err.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/home3.jpg")} // Change the path to your image
      style={{ flex: 1 }}
    >
      <View className="flex-1 ">
        <SafeAreaView className="flex">
          <View className="flex-row justify-center">
            <Image
              source={require("../../assets/images/image.png")}
              style={{ width: 165, height: 110 }}
            />
          </View>
        </SafeAreaView>
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Full Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={name}
              onChangeText={(value) => setName(value)}
              placeholder="Enter Name"
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={email}
              onChangeText={(value) => setEmail(value)}
              placeholder="Enter Email"
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              value={password}
              onChangeText={(value) => setPassword(value)}
              placeholder="Enter Password"
            />
            <TouchableOpacity
              onPress={handleSignUp}
              className="py-3 bg-gray-400 rounded-xl"
            >
              <Text className="font-xl font-bold text-center text-black">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          
          <View className="flex-row justify-center">
            <Text className="text-black font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
              <Text className="font-semibold text-gray-500"> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}