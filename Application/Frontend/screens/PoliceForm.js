import React, { useState, useEffect } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, ImageBackground, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';
import { Card } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
// Adjust path as per your file structure
import axios from 'axios';
// import NavBar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { BASE_URL } from '../services/apiService';

const PoliceForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { photoUrl } = route.params;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [Violation_Date, setViolation_Date] = useState('');
  const [Challan_Date, setChallan_Date] = useState('');
  const [Place_Of_Violation, setPlace_Of_Violation] = useState('');
  const [Driver_First_Name, setDriver_First_Name] = useState('');
  const [Driver_Last_Name, setDriver_Last_Name] = useState('');
  const [Driving_license_No, setDriving_license_No] = useState('');
  const [Driver_Contact_No, setDriver_Contact_No] = useState('');
  const [Driver_Father_First_Name, setDriver_Father_First_Name] = useState('');
  const [Driver_Father_Last_Name, setDriver_Father_Last_Name] = useState('');

  const [formFields, setFormFields] = useState([
    { key: 'Owner_First_Name', label: "Owner's First Name", placeholder: "Owner's First Name", type: 'text', value: '' },
    { key: 'Owner_Last_Name', label: "Owner's Last Name", placeholder: "Owner's Last Name", type: 'text', value: '' },
    { key: 'Vehicle_Class', label: 'Vehicle Class', placeholder: 'Vehicle Class', type: 'text', value: '' },
    { key: 'Chassis_No', label: 'Chassis No', placeholder: 'Chassis Number', type: 'text', value: '' },
    { key: 'Engine_No', label: 'Engine No', placeholder: 'Engine Number', type: 'number', value: '' },
    { key: 'Make_Model', label: 'Vehicle Model', placeholder: 'Vehicle Model', type: 'text', value: '' },
  ]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setViolation_Date(currentDate);
    setChallan_Date(currentDate);
  }, []);


  const submitFormData = async () => {
    console.log("submit button pressed")
    const data = {
      Vehicle_No: vehicleNumber,
      Owner_First_Name: formFields.find(field => field.key === 'Owner_First_Name').value.split(' ')[0],
      Owner_Last_Name: formFields.find(field => field.key === 'Owner_Last_Name').value.split(' ')[0] || '',
      Vehicle_Class: formFields.find(field => field.key === 'Vehicle_Class').value,
      Chassis_No: formFields.find(field => field.key === 'Chassis_No').value,
      Engine_No: formFields.find(field => field.key === 'Engine_No').value,
      Make_Model: formFields.find(field => field.key === 'Make_Model').value,
      Violation_Date: Violation_Date,
      Challan_Date: Challan_Date,
      Place_Of_Violation: Place_Of_Violation,
      Driver_First_Name: Driver_First_Name,
      Driver_Last_Name: Driver_Last_Name,
      Driving_license_No: Driving_license_No,
      Driver_Contact_No: Driver_Contact_No,
      Driver_Father_First_Name: Driver_Father_First_Name,
      Driver_Father_Last_Name: Driver_Father_Last_Name,
    };
    console.log(data)

    try {
      const response = await axios.post(`${BASE_URL}mongodb/api/save-vehicle-data/`, data, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Data saved successfully');
      } else {
        Alert.alert('Error', 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // useEffect(() => {
  //   console.log('Fetched photoUrl:', photoUrl);
  // }, [photoUrl]);

  const handleInputChange = (key, value) => {
    const newFields = formFields.map(field => {
      if (field.key === key) {
        return { ...field, value };
      }
      return field;
    });
    setFormFields(newFields);
  };

  const handleCharacterDetection = async () => {
    try {

      console.log("before character detection.")
      const response = await axios.post(`${BASE_URL}mongodb/api/detect-characters/`,
        { image_url: photoUrl }, // Send as JSON data
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log("Request sent successfully!");
      const { detected_characters } = response.data;
      if (detected_characters) {
        setVehicleNumber(detected_characters);
        Alert.alert('Character Detection', `Detected Vehicle Number: ${detected_characters}`);
      } else {
        Alert.alert('Character Detection', 'No vehicle number detected.');
      }
    } catch (error) {
      console.error('Error detecting characters:', error);
      Alert.alert('Error', 'Failed to detect characters. Please try again.');
    }
  };


  const retakePhoto = () => {
    navigation.navigate('CameraScreen');
  };

  const fetchVehicleData = async () => {
    try {
      const response = await axios.post(`${BASE_URL}mongodb/api/vehicle_records/`,
        { vehicle_no: vehicleNumber },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log("request sent to backend");

      // Since your response contains a nested 'data' object, we need to access it directly
      if (response.data && response.data.data) {
        console.log(response.data)
        const vehicleData = response.data.data;

        // Update formFields with the response data
        setFormFields((prevFields) =>
          prevFields.map((field) => ({
            ...field,
            value: vehicleData[field.key] || '', // Assign value from vehicleData based on key
          }))
        );

        Alert.alert('Vehicle Data Retrieved', `Details for Vehicle: ${vehicleNumber}`);
      } else {
        Alert.alert('Vehicle Data Not Found', 'No data available for the provided vehicle number.');
      }
    } catch (error) {
      console.error('Error retrieving vehicle data:', error);
      Alert.alert('Error', 'Failed to fetch vehicle data. Please try again.');
    }
  };




  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View
        style={{
          position: 'absolute',
          width: 415,
          height: 500,
          //   borderRadius: 600, 
          borderBottomLeftRadius: 700,

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
          borderTopRightRadius: 700,

          backgroundColor: '#c2fcbd', // Orange color
          bottom: -100,
          //   right: -150, // Positioning it from the right side
          transform: [{ scaleX: 1.2 }] // Stretch horizontally to make it elliptical
        }}
      />

      <Image source={require('../assets/images/image.png')} style={styles.logo}>

      </Image>
      <ScrollView contentContainerStyle={styles.scrollView}>

        <Card containerStyle={styles.cardContainer}>
          <Image source={{ uri: photoUrl }} style={styles.headerImage}>

          </Image>

          <TouchableOpacity onPress={handleCharacterDetection} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Detect Characters</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={fetchVehicleData} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Fetch Data</Text>
          </TouchableOpacity>
          <Block style={styles.inputBlock}>
            <Text style={styles.label}>Vehicle Number</Text>
            <Input
              placeholder="Enter Vehicle Number"
              onChangeText={value => setVehicleNumber(value.toUpperCase())}
              value={vehicleNumber}
              style={styles.input}
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
          </Block>
          {formFields.map(field => (
            <Block key={field.key} style={styles.inputBlock}>
              <Text style={styles.label}>{field.label}</Text>
              <Input
                placeholder={field.placeholder}
                secureTextEntry={field.type === 'password'}
                onChangeText={value => handleInputChange(field.key, value)}
                value={field.value}
                style={styles.input}
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
              />
            </Block>
          ))}

          <Block style={styles.inputBlock}>
            <Text style={styles.label}>Violation Date</Text>
            <Input
              placeholder="Enter Violation Date"
              onChangeText={value => setViolation_Date(value.toUpperCase())}
              value={Violation_Date}
              style={styles.input}
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
          </Block>
          <Block style={styles.inputBlock}>
            <Text style={styles.label}>Challan Date</Text>
            <Input
              placeholder="Enter Challan Date"
              onChangeText={value => setChallan_Date(value.toUpperCase())}
              value={Challan_Date}
              style={styles.input}
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
          </Block>
          <Block style={styles.inputBlock}>
            <Text style={styles.label}>Place of Violation</Text>
            <Input
              placeholder="Enter Place of Violation"
              onChangeText={value => setPlace_Of_Violation(value.toUpperCase())}
              value={Place_Of_Violation}
              style={styles.input}
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
          </Block>
          <Block style={styles.inputBlock}>
            <Text style={styles.label}>Driver First name</Text>
            <Input
              placeholder="Enter Driver First Name"
              onChangeText={value => setDriver_First_Name(value.toUpperCase())}
              value={Driver_First_Name}
              style={styles.input}
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
          </Block>
          <Block style={styles.inputBlock}>
            <Text style={styles.label}>Driver Last Name</Text>
            <Input
              placeholder="Enter Driver Last Name"
              onChangeText={value => setDriver_Last_Name(value.toUpperCase())}
              value={Driver_Last_Name}
              style={styles.input}
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
          </Block>
          <Block style={styles.inputBlock}>
            <Text style={styles.label}>Driving License No.</Text>
            <Input
              placeholder="Enter Driving License No."
              onChangeText={value => setDriving_license_No(value.toUpperCase())}
              value={Driving_license_No}
              style={styles.input}
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
          </Block>
          <Block style={styles.inputBlock}>
            <Text style={styles.label}>Driver Contact No.</Text>
            <Input
              placeholder="Enter Driver Contact No."
              onChangeText={value => setDriver_Contact_No(value.toUpperCase())}
              value={Driver_Contact_No}
              style={styles.input}
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
          </Block>
          <Block style={styles.inputBlock}>
            <Text style={styles.label}>Driver Father First Name</Text>
            <Input
              placeholder="Enter Father's First Name"
              onChangeText={value => setDriver_Father_First_Name(value.toUpperCase())}
              value={Driver_Father_First_Name}
              style={styles.input}
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
          </Block>
          <Block style={styles.inputBlock}>
            <Text style={styles.label}>Driver Father Last Name</Text>
            <Input
              placeholder="Enter Father's Last Name"
              onChangeText={value => setDriver_Father_Last_Name(value.toUpperCase())}
              value={Driver_Father_Last_Name}
              style={styles.input}
              placeholderTextColor={isDarkMode ? '#888' : '#999'}
            />
          </Block>



          <Button style={styles.submitButton} onPress={submitFormData}>
            Submit
          </Button>
        </Card>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 160,
    marginTop: 40,
  },
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  cardContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f5faff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  headerImage: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  actionButton: {
    alignSelf: 'center',
    backgroundColor: '#004aad',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputBlock: {
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#004aad',
  },
  input: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#004aad',
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 4,
  },
  fieldCard: {
    marginVertical: 8,
    padding: 12,
    backgroundColor: '#e6f2ff',  // Light blue background for each field card
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    elevation: 2,
  },
  fieldLabel: {
    marginBottom: 6,
    fontWeight: '600',
    color: '#004aad',  // Darker blue for labels
    fontSize: 14,
  },
  fieldInput: {
    borderColor: '#004aad',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 14,
    height: 40,
  },
});


export default PoliceForm;