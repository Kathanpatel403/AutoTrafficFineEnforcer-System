import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import useAuth from '../hooks/useAuth';
import Generate_challan from '../screens/Generate_challan';
import PoliceForm from '../screens/PoliceForm';
import TrafficRulesIndia from '../screens/Traffic_Rules';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  const { user } = useAuth();
  if(user)
  {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
          <Stack.Screen name="Generate_challan" options={{headerShown: false}} component={Generate_challan} />
          <Stack.Screen name="PoliceForm" options={{headerShown: false}} component={PoliceForm} />
          <Stack.Screen name="TrafficRules" options={{headerShown: false}} component={TrafficRulesIndia} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }else
  {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" options={{headerShown: false}} component={ForgotPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}