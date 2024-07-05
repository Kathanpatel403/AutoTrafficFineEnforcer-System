// // import {
// // 	View,
// // 	Text,
// // 	TouchableOpacity,
// // 	Image,
// // 	TextInput,
// // 	ImageBackground,
// // 	Alert,
// // 	ToastAndroid
// // } from "react-native";
// // import React from "react";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { useNavigation } from "@react-navigation/native";
// // import { auth, firestore } from "../../config/firebase";
// // import { useState, useEffect } from "react";
// // import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
// // import { getFirestore, doc, getDoc } from "firebase/firestore";


// // export default function LoginScreen() {
// // 	const navigation = useNavigation();
// // 	const [email, setEmail] = useState("");
// // 	const [password, setPassword] = useState("");
// // 	const [userRole, setUserRole] = useState(null);
// // 	const [userData, setUserData] = useState(null);
	
// // 	const handleLogin = async () => {
// // 		if (email && password) {
// // 			try {
// // 				await signInWithEmailAndPassword(auth, email, password);

// // 				fetchUserRole();
// // 			} catch (err) {
// // 				ToastAndroid.show(`got error: ${err.message}`, ToastAndroid.SHORT);
// // 				console.log("got error: ", err.message);
// // 			}
// // 		}
// // 	};

// // 	const fetchUserRole = async () => {
// // 		const user = getAuth().currentUser;

// // 		if (user) {
// // 			const uid = user.uid;
// // 			const userRoleRef = doc(firestore, "userRoles", uid);

// // 			try {
// // 				const docSnapshot = await getDoc(userRoleRef);

// // 				if (docSnapshot.exists()) {
// // 					const role = docSnapshot.data().role;
// // 					setUserRole(role);
// // 					const data = docSnapshot.data().name;
// // 					setUserData(data);

// // 					if (role === "Admin") {
// // 						ToastAndroid.show(`Logging in as: ${data}`, ToastAndroid.SHORT);
// // 						console.log("logging in");
// // 						navigation.navigate("AdminMain");
// // 						setEmail('');
// // 						setPassword('');
// // 					} else if (role === "user") {
// // 						ToastAndroid.show(`Logging in as: ${data}`, ToastAndroid.SHORT);
// // 						console.log("logging in");
// // 						navigation.navigate("Home");
// // 						setEmail('');
// // 						setPassword('');
// // 					}
// // 				} else {
// // 					ToastAndroid.show("User doesn't exist. Please SignUp!", ToastAndroid.SHORT);
// // 					console.log("User doesn't exist. Please SignUp!");
// // 					setUserRole(null);
// // 				}
// // 			} catch (error) {
// // 				ToastAndroid.show(`Error fetching user role: ${error}`, ToastAndroid.SHORT);
// // 				console.error("Error fetching user role:", error);
// // 			}
// // 		}
// // 	};

// // 	return (
// // 		<ImageBackground
// // 			source={require("../../assets/images/home3.jpg")} // Change the path to your image
// // 			style={{ flex: 1 }}
// // 		>
// // 			<View className="flex-1 ">
// // 				<SafeAreaView className="flex">
// // 					<View className="flex-row justify-center">
// // 						<Image
// // 							source={require("../../assets/images/image.png")}
// // 							style={{ width: 165, height: 110 }}
// // 						/>
// // 					</View>
// // 				</SafeAreaView>
// // 				<View
// // 					style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
// // 					className="flex-1 bg-white px-8 pt-8"
// // 				>
// // 					<View className="form space-y-2">
// // 						<Text className="text-gray-700 ml-4">Email Address</Text>
// // 						<TextInput
// // 							className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
// // 							placeholder="Email"
// // 							value={email}
// // 							onChangeText={(value) => setEmail(value)}
// // 						/>
// // 						<Text className="text-gray-700 ml-4">Password</Text>
// // 						<TextInput
// // 							className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
// // 							secureTextEntry
// // 							placeholder="Password"
// // 							value={password}
// // 							onChangeText={(value) => setPassword(value)}
// // 						/>
// // 						<TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} className="flex items-end">
// // 							<Text className="text-gray-700 mb-5">Forgot Password?</Text>
// // 						</TouchableOpacity>
// // 						<TouchableOpacity
// // 							className="py-3 bg-gray-400 rounded-xl"
// // 							onPress={handleLogin}
// // 						>
// // 							<Text className="text-xl font-bold text-center text-black">
// // 								Login
// // 							</Text>
// // 						</TouchableOpacity>
// // 					</View>
// // 					<Text className="text-xl text-gray-700 font-bold text-center py-5">
// // 						Or
// // 					</Text>
					
// // 					<View className="flex-row justify-center">
// // 						<Text className="text-black font-semibold">
// // 							Don't have an account?
// // 						</Text>
// // 						<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
// // 							<Text className="font-semibold text-gray-500"> Sign Up</Text>
// // 						</TouchableOpacity>
// // 					</View>
// // 				</View>
// // 			</View>
// // 		</ImageBackground>
// // 	);
// // }


import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	ImageBackground,
	ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../../config/firebase";
import Icon from "react-native-vector-icons/Ionicons";
import { t } from "react-native-tailwindcss";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function LoginScreen() {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userRole, setUserRole] = useState(null);
	const [userData, setUserData] = useState(null);
	const [darkMode, setDarkMode] = useState(false);

	const buttonScale = useSharedValue(1);

	const handleLogin = async () => {
		if (email && password) {
			try {
				await signInWithEmailAndPassword(auth, email, password);
				fetchUserRole();
			} catch (err) {
				ToastAndroid.show(`got error: ${err.message}`, ToastAndroid.SHORT);
				console.log("got error: ", err.message);
			}
		}
	};

	const fetchUserRole = async () => {
		const user = getAuth().currentUser;

		if (user) {
			const uid = user.uid;
			const userRoleRef = doc(firestore, "userRoles", uid);

			try {
				const docSnapshot = await getDoc(userRoleRef);

				if (docSnapshot.exists()) {
					const role = docSnapshot.data().role;
					setUserRole(role);
					const data = docSnapshot.data().name;
					setUserData(data);

					if (role === "Admin") {
						ToastAndroid.show(`Logging in as: ${data}`, ToastAndroid.SHORT);
						console.log("logging in");
						navigation.navigate("AdminMain");
						setEmail('');
						setPassword('');
					} else if (role === "user") {
						ToastAndroid.show(`Logging in as: ${data}`, ToastAndroid.SHORT);
						console.log("logging in");
						navigation.navigate("Home");
						setEmail('');
						setPassword('');
					}
				} else {
					ToastAndroid.show("User doesn't exist. Please SignUp!", ToastAndroid.SHORT);
					console.log("User doesn't exist. Please SignUp!");
					setUserRole(null);
				}
			} catch (error) {
				ToastAndroid.show(`Error fetching user role: ${error}`, ToastAndroid.SHORT);
				console.error("Error fetching user role:", error);
			}
		}
	};

	const toggleTheme = () => {
		setDarkMode(!darkMode);
	};

	const themeStyles = darkMode ? darkTheme : lightTheme;

	const animatedButtonStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: withTiming(buttonScale.value, { duration: 200 }) }],
		};
	});

	const handleButtonPressIn = () => {
		buttonScale.value = 0.95;
	};

	const handleButtonPressOut = () => {
		buttonScale.value = 1;
	};

	return (
		<ImageBackground
			source={require("../../assets/images/home3.jpg")} // Change the path to your image
			style={{ flex: 1 }}
		>
			<View style={themeStyles.container}>
				<SafeAreaView>
					<View style={themeStyles.header}>
						<Image
							source={require("../../assets/images/image.png")}
							style={{ width: 165, height: 110 }}
						/>
						<TouchableOpacity onPress={toggleTheme} style={themeStyles.themeToggleButton}>
							<Icon
								name={darkMode ? "sunny" : "moon"}
								size={24}
								color="white"
							/>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
				<View style={[themeStyles.formContainer, { borderTopLeftRadius: 50, borderTopRightRadius: 50 }]}>
					<View style={themeStyles.form}>
						<Text style={themeStyles.label}>Email Address</Text>
						<View style={themeStyles.inputContainer}>
							<Icon name="mail" size={24} color={darkMode ? "#bfbfbf" : "#999"} style={themeStyles.icon} />
							<TextInput
								style={themeStyles.input}
								placeholder="Email"
								placeholderTextColor={darkMode ? "#bfbfbf" : "#999"}
								value={email}
								onChangeText={(value) => setEmail(value)}
							/>
						</View>
						<Text style={themeStyles.label}>Password</Text>
						<View style={themeStyles.inputContainer}>
							<Icon name="lock-closed" size={24} color={darkMode ? "#bfbfbf" : "#999"} style={themeStyles.icon} />
							<TextInput
								style={themeStyles.input}
								secureTextEntry
								placeholder="Password"
								placeholderTextColor={darkMode ? "#bfbfbf" : "#999"}
								value={password}
								onChangeText={(value) => setPassword(value)}
							/>
						</View>
						<TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={themeStyles.forgotPassword}>
							<Text style={themeStyles.forgotPasswordText}>Forgot Password?</Text>
						</TouchableOpacity>
						<Animated.View style={[themeStyles.animatedButton, animatedButtonStyle]}>
							<TouchableOpacity
								style={themeStyles.loginButton}
								onPress={handleLogin}
								onPressIn={handleButtonPressIn}
								onPressOut={handleButtonPressOut}
							>
								<Text style={themeStyles.loginButtonText}>Login</Text>
							</TouchableOpacity>
						</Animated.View>
					</View>
					<Text style={themeStyles.orText}>Or</Text>
					<View style={themeStyles.signUpContainer}>
						<Text style={themeStyles.signUpText}>Don't have an account?</Text>
						<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
							<Text style={themeStyles.signUpLink}> Sign Up</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ImageBackground>
	);
}

const lightTheme = {
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	themeToggleButton: {
		backgroundColor: "#003366",
		padding: 8,
		borderRadius: 8,
	},
	formContainer: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 32,
		paddingTop: 32,
	},
	form: {
		space: 2,
	},
	label: {
		color: "#003366",
		marginLeft: 16,
		marginBottom: 8,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
		borderRadius: 16,
		marginBottom: 16,
		paddingLeft: 16,
	},
	icon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		padding: 16,
		color: "#003366",
	},
	forgotPassword: {
		alignItems: "flex-end",
		marginBottom: 16,
	},
	forgotPasswordText: {
		color: "#003366",
	},
	animatedButton: {
		alignItems: "center",
	},
	loginButton: {
		paddingVertical: 16,
		backgroundColor: "#003366",
		borderRadius: 16,
		width: "100%",
		alignItems: "center",
	},
	loginButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	orText: {
		color: "#003366",
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		paddingVertical: 16,
	},
	signUpContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	signUpText: {
		color: "#003366",
		fontWeight: "bold",
	},
	signUpLink: {
		color: "#003366",
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
};

const darkTheme = {
	container: {
		flex: 1,
		backgroundColor: "#121212",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	themeToggleButton: {
		backgroundColor: "#4CAF50",
		padding: 8,
		borderRadius: 8,
	},
	formContainer: {
		flex: 1,
		backgroundColor: "#121212",
		paddingHorizontal: 32,
		paddingTop: 32,
	},
	form: {
		space: 2,
	},
	label: {
		color: "#4CAF50",
		marginLeft: 16,
		marginBottom: 8,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#333",
		borderRadius: 16,
		marginBottom: 16,
		paddingLeft: 16,
	},
	icon: {
		marginRight: 10,
	},
	input: {
		flex: 1,
		padding: 16,
		color: "#4CAF50",
	},
	forgotPassword: {
		alignItems: "flex-end",
		marginBottom: 16,
	},
	forgotPasswordText: {
		color: "#4CAF50",
	},
	animatedButton: {
		alignItems: "center",
	},
	loginButton: {
		paddingVertical: 16,
		backgroundColor: "#4CAF50",
		borderRadius: 16,
		width: "100%",
		alignItems: "center",
	},
	loginButtonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	orText: {
		color: "#4CAF50",
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		paddingVertical: 16,
	},
	signUpContainer: {
		flexDirection: "row",
		justifyContent: "center",
	},
	signUpText: {
		color: "#4CAF50",
		fontWeight: "bold",
	},
	signUpLink: {
		color: "#4CAF50",
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
};

// import React, { useState } from "react";
// import {
// 	View,
// 	Text,
// 	TouchableOpacity,
// 	Image,
// 	TextInput,
// 	ImageBackground,
// 	ToastAndroid,
// 	Animated,
// 	Easing,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import { auth, firestore } from "../../config/firebase";
// import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useTailwind } from 'tailwind-rn';
// import { useEffect } from "react";

// export default function LoginScreen() {
// 	const navigation = useNavigation();
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [userRole, setUserRole] = useState(null);
// 	const [userData, setUserData] = useState(null);
// 	const [darkMode, setDarkMode] = useState(false);
// 	const [buttonScale] = useState(new Animated.Value(1));
// 	const tailwind = useTailwind();

// 	const handleLogin = async () => {
// 		if (email && password) {
// 			try {
// 				await signInWithEmailAndPassword(auth, email, password);
// 				fetchUserRole();
// 			} catch (err) {
// 				ToastAndroid.show(`got error: ${err.message}`, ToastAndroid.SHORT);
// 				console.log("got error: ", err.message);
// 			}
// 		}
// 	};

// 	const fetchUserRole = async () => {
// 		const user = getAuth().currentUser;

// 		if (user) {
// 			const uid = user.uid;
// 			const userRoleRef = doc(firestore, "userRoles", uid);

// 			try {
// 				const docSnapshot = await getDoc(userRoleRef);

// 				if (docSnapshot.exists()) {
// 					const role = docSnapshot.data().role;
// 					setUserRole(role);
// 					const data = docSnapshot.data().name;
// 					setUserData(data);

// 					if (role === "Admin") {
// 						ToastAndroid.show(`Logging in as: ${data}`, ToastAndroid.SHORT);
// 						console.log("logging in");
// 						navigation.navigate("AdminMain");
// 						setEmail('');
// 						setPassword('');
// 					} else if (role === "user") {
// 						ToastAndroid.show(`Logging in as: ${data}`, ToastAndroid.SHORT);
// 						console.log("logging in");
// 						navigation.navigate("Home");
// 						setEmail('');
// 						setPassword('');
// 					}
// 				} else {
// 					ToastAndroid.show("User doesn't exist. Please SignUp!", ToastAndroid.SHORT);
// 					console.log("User doesn't exist. Please SignUp!");
// 					setUserRole(null);
// 				}
// 			} catch (error) {
// 				ToastAndroid.show(`Error fetching user role: ${error}`, ToastAndroid.SHORT);
// 				console.error("Error fetching user role:", error);
// 			}
// 		}
// 	};

// 	const toggleTheme = () => {
// 		setDarkMode(!darkMode);
// 	};

// 	const themeStyles = darkMode ? darkTheme : lightTheme;

// 	const animateButton = () => {
// 		Animated.sequence([
// 			Animated.timing(buttonScale, {
// 				toValue: 0.9,
// 				duration: 100,
// 				easing: Easing.inOut(Easing.ease),
// 				useNativeDriver: true,
// 			}),
// 			Animated.timing(buttonScale, {
// 				toValue: 1,
// 				duration: 100,
// 				easing: Easing.inOut(Easing.ease),
// 				useNativeDriver: true,
// 			}),
// 		]).start();
// 	};

// 	return (
// 		<ImageBackground
// 			source={require("../../assets/images/home3.jpg")} // Change the path to your image
// 			style={{ flex: 1 }}
// 		>
// 			<View style={[themeStyles.container, tailwind('flex-1')]}>
// 				<SafeAreaView>
// 					<View style={[themeStyles.header, tailwind('flex-row justify-between items-center p-4')]}>
// 						<Image
// 							source={require("../../assets/images/image.png")}
// 							style={tailwind('w-40 h-28')}
// 						/>
// 						<TouchableOpacity onPress={toggleTheme} style={themeStyles.themeToggleButton}>
// 							<Icon name={darkMode ? "sunny-outline" : "moon-outline"} size={24} color="white" />
// 						</TouchableOpacity>
// 					</View>
// 				</SafeAreaView>
// 				<View style={[themeStyles.formContainer, tailwind('flex-1 rounded-t-3xl p-8')]}>
// 					<View style={themeStyles.form}>
// 						<View style={[themeStyles.inputContainer, tailwind('flex-row items-center bg-gray-100 rounded-full mb-4 px-4')]}>
// 							<Icon name="mail-outline" size={24} color={darkMode ? "#4CAF50" : "#003366"} />
// 							<TextInput
// 								style={[themeStyles.input, tailwind('flex-1 p-4 text-lg')]}
// 								placeholder="Email"
// 								placeholderTextColor={darkMode ? "#bfbfbf" : "#999"}
// 								value={email}
// 								onChangeText={(value) => setEmail(value)}
// 							/>
// 						</View>
// 						<View style={[themeStyles.inputContainer, tailwind('flex-row items-center bg-gray-100 rounded-full mb-4 px-4')]}>
// 							<Icon name="lock-closed-outline" size={24} color={darkMode ? "#4CAF50" : "#003366"} />
// 							<TextInput
// 								style={[themeStyles.input, tailwind('flex-1 p-4 text-lg')]}
// 								secureTextEntry
// 								placeholder="Password"
// 								placeholderTextColor={darkMode ? "#bfbfbf" : "#999"}
// 								value={password}
// 								onChangeText={(value) => setPassword(value)}
// 							/>
// 						</View>
// 						<TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={themeStyles.forgotPassword}>
// 							<Text style={themeStyles.forgotPasswordText}>Forgot Password?</Text>
// 						</TouchableOpacity>
// 						<Animated.View style={{ transform: [{ scale: buttonScale }] }}>
// 							<TouchableOpacity
// 								style={themeStyles.loginButton}
// 								onPress={() => {
// 									handleLogin();
// 									animateButton();
// 								}}
// 							>
// 								<Text style={themeStyles.loginButtonText}>Login</Text>
// 							</TouchableOpacity>
// 						</Animated.View>
// 					</View>
// 					<Text style={themeStyles.orText}>Or</Text>
// 					<View style={themeStyles.signUpContainer}>
// 						<Text style={themeStyles.signUpText}>Don't have an account?</Text>
// 						<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
// 							<Text style={themeStyles.signUpLink}> Sign Up</Text>
// 						</TouchableOpacity>
// 					</View>
// 				</View>
// 			</View>
// 		</ImageBackground>
// 	);
// }

// const lightTheme = {
// 	container: {
// 		flex: 1,
// 		backgroundColor: "white",
// 	},
// 	header: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		alignItems: "center",
// 		paddingHorizontal: 16,
// 		paddingTop: 16,
// 	},
// 	themeToggleButton: {
// 		backgroundColor: "#003366",
// 		padding: 8,
// 		borderRadius: 8,
// 	},
// 	formContainer: {
// 		flex: 1,
// 		backgroundColor: "white",
// 		paddingHorizontal: 32,
// 		paddingTop: 32,
// 	},
// 	form: {
// 		space: 2,
// 	},
// 	inputContainer: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		backgroundColor: "#f0f0f0",
// 		borderRadius: 16,
// 		marginBottom: 16,
// 		paddingLeft: 16,
// 	},
// 	input: {
// 		flex: 1,
// 		padding: 16,
// 		color: "#003366",
// 	},
// 	forgotPassword: {
// 		alignItems: "flex-end",
// 		marginBottom: 16,
// 	},
// 	forgotPasswordText: {
// 		color: "#003366",
// 	},
// 	loginButton: {
// 		paddingVertical: 16,
// 		backgroundColor: "#003366",
// 		borderRadius: 16,
// 		alignItems: "center",
// 	},
// 	loginButtonText: {
// 		color: "white",
// 		fontSize: 18,
// 		fontWeight: "bold",
// 	},
// 	orText: {
// 		color: "#003366",
// 		fontSize: 18,
// 		fontWeight: "bold",
// 		textAlign: "center",
// 		paddingVertical: 16,
// 	},
// 	signUpContainer: {
// 		flexDirection: "row",
// 		justifyContent: "center",
// 	},
// 	signUpText: {
// 		color: "#003366",
// 		fontWeight: "bold",
// 	},
// 	signUpLink: {
// 		color: "#003366",
// 		fontWeight: "bold",
// 		textDecorationLine: "underline",
// 	},
// };

// const darkTheme = {
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#121212",
// 	},
// 	header: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		alignItems: "center",
// 		paddingHorizontal: 16,
// 		paddingTop: 16,
// 	},
// 	themeToggleButton: {
// 		backgroundColor: "#4CAF50",
// 		padding: 8,
// 		borderRadius: 8,
// 	},
// 	formContainer: {
// 		flex: 1,
// 		backgroundColor: "#121212",
// 		paddingHorizontal: 32,
// 		paddingTop: 32,
// 	},
// 	form: {
// 		space: 2,
// 	},
// 	inputContainer: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		backgroundColor: "#1e1e1e",
// 		borderRadius: 16,
// 		marginBottom: 16,
// 		paddingLeft: 16,
// 	},
// 	input: {
// 		flex: 1,
// 		padding: 16,
// 		color: "#4CAF50",
// 	},
// 	forgotPassword: {
// 		alignItems: "flex-end",
// 		marginBottom: 16,
// 	},
// 	forgotPasswordText: {
// 		color: "#4CAF50",
// 	},
// 	loginButton: {
// 		paddingVertical: 16,
// 		backgroundColor: "#4CAF50",
// 		borderRadius: 16,
// 		alignItems: "center",
// 	},
// 	loginButtonText: {
// 		color: "white",
// 		fontSize: 18,
// 		fontWeight: "bold",
// 	},
// 	orText: {
// 		color: "#4CAF50",
// 		fontSize: 18,
// 		fontWeight: "bold",
// 		textAlign: "center",
// 		paddingVertical: 16,
// 	},
// 	signUpContainer: {
// 		flexDirection: "row",
// 		justifyContent: "center",
// 	},
// 	signUpText: {
// 		color: "#4CAF50",
// 		fontWeight: "bold",
// 	},
// 	signUpLink: {
// 		color: "#4CAF50",
// 		fontWeight: "bold",
// 		textDecorationLine: "underline",
// 	},
// };
