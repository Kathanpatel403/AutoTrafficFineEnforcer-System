import React from 'react';
import { View, Text, TouchableOpacity, Image, Animated, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sidebar from '../components/Sidebar'; // Ensure the path is correct
import Speedometer from '../components/Speedometer'; // Ensure the path is correct
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const sidebarAnim = React.useRef(new Animated.Value(-300)).current;
  const analyticsData = {
    totalEChallans: 120,
    totalFinesCollected: 25000, // in currency
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? -300 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
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
      <View className="flex flex-row justify-between items-center p-4 bg-[#27a9ff]">
        <TouchableOpacity onPress={toggleSidebar}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Traffic Challan App</Text>
        <TouchableOpacity onPress={() => {/* navigate back */}}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <Sidebar sidebarAnim={sidebarAnim} toggleSidebar={toggleSidebar} />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="flex items-center justify-center p-4">
          <Text className="text-2xl font-bold text-center">Welcome to Traffic Challan Generation</Text>
          <Image 
            source={require('../assets/images/image.png')} 
            className="w-1/4 h-24 rounded-lg my-4" 
          />
          <Text className="text-gray-600 italic text-center">
            "Traffic safety is not just a slogan; it's a way of life."
          </Text>
        </View>

        <View className="justify-around items-center">
          <TouchableOpacity className="bg-[#27a9ff] m-3 p-5 w-64 items-center rounded-md shadow-md hover:bg-orange-600" onPress={() => navigation.navigate('Generate_challan')}>
            <Ionicons name="document-text" size={20} color="white"  />
            <Text className="text-white font-semibold">Generate Challan</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-[#27a9ff] m-5 w-64 items-center p-5 rounded-md shadow-md hover:bg-orange-600" onPress={() => navigation.navigate("TrafficRules")}>
            <Ionicons name="pricetag" size={20} color="white" />
            <Text className="text-white font-semibold">Traffic Rules Book</Text>
          </TouchableOpacity>
        </View>

        <View className="flex items-center my-4">
          <Text className="text-lg text-gray-50 font-bold m-5 w-64 text-center mb-2 p-4 rounded-lg bg-[#27a9ff]">Analytics</Text>
          <View className="justify-around w-full">
            <Speedometer 
              value={analyticsData.totalEChallans} 
              maxValue={500} 
              label="Total E-Challans"
            />
            <Speedometer 
              value={analyticsData.totalFinesCollected} 
              maxValue={100000} 
              label="Total Fines Collected"
            />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
