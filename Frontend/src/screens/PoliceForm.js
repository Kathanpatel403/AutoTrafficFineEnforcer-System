// import React, { useState } from 'react';
// import { ScrollView, SafeAreaView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
// import { Block, Button, Input, Text, theme } from 'galio-framework';
// import { Card } from 'react-native-elements';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useRoute } from '@react-navigation/native';
// import { fetchData } from '../services/api'; // Adjust path as per your file structure

// const PoliceForm = () => {
//   const route = useRoute();
//   const { photoUri } = route.params;
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [vehicleNumber, setVehicleNumber] = useState('');
//   const [formFields, setFormFields] = useState([
//     { key: 'Vehicle_No', label: 'Vehicle No', placeholder: 'Enter Vehicle Number', type: 'text', value: '' },
//     { key: 'O_name', label: "Owner's Name", placeholder: 'Owner Name', type: 'text', value: '' },
//     { key: 'Vehicle_Class', label: 'Vehicle Class', placeholder: 'Vehicle Class', type: 'text', value: '' },
//     { key: 'Chassis_No', label: 'Chassis No', placeholder: 'Chassis Number', type: 'text', value: '' },
//     { key: 'Engine_No', label: 'Engine No', placeholder: 'Engine Number', type: 'number', value: '' },
//     { key: 'Vehicle_Model', label: 'Vehicle Model', placeholder: 'Vehicle Model', type: 'text', value: '' },
//     { key: 'Violation_Date', label: 'Violation Date', placeholder: 'Violation Date', type: 'text', value: '' },
//     { key: 'Challan_Date', label: 'Challan Date', placeholder: 'Challan Date', type: 'text', value: '' },
//     { key: 'Challan_No', label: 'Challan No', placeholder: 'Challan Number', type: 'text', value: '' },
//     { key: 'Place_Of_Violation', label: 'Place Of Violation', placeholder: 'Place Of Violation', type: 'text', value: '' },
//     { key: 'Driver_Name', label: 'Driver Name', placeholder: 'Driver Name', type: 'text', value: '' },
//     { key: 'Driving_license_No', label: 'Driving License No', placeholder: 'Driving License Number', type: 'text', value: '' },
//     { key: 'Driver_Contact_No', label: 'Driver Contact No', placeholder: 'Driver Contact Number', type: 'text', value: '' },
//     { key: 'Driver_FatherName', label: 'Driver Father Name', placeholder: 'Driver Father Name', type: 'text', value: '' },
//   ]);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const handleInputChange = (key, value) => {
//     const newFields = formFields.map(field => {
//       if (field.key === key) {
//         return { ...field, value };
//       }
//       return field;
//     });
//     setFormFields(newFields);
//   };

//   const handleSubmit = async () => {
//     try {
//       const data = await fetchData(`mongodb/api/vehicle_records/?vehicle_no=${vehicleNumber}`);
//       console.log('API response:', data);
//       if (data.error) {
//         console.error('Error:', data.error);
//       } else {
//         const newFields = formFields.map(field => {
//           if (data[field.key]) {
//             return { ...field, value: data[field.key] };
//           }
//           return field;
//         });
//         setFormFields(newFields);
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//     }
//   };

//   const retakePhoto = () => {
//     console.log('Retake photo');
//   };

//   return (
//     <SafeAreaView style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
//       <ImageBackground source={require('../../assets/images/home.jpg')} style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollView}>
//           <Card containerStyle={styles.cardContainer}>
//             <ImageBackground source={{ uri: photoUri }} style={styles.headerImage}>
//               <Text h5 style={styles.headerText}></Text>
//             </ImageBackground>
//             <TouchableOpacity onPress={retakePhoto} style={styles.actionButton}>
//               <Text style={styles.actionButtonText}>Retake Photo</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={handleSubmit} style={styles.actionButton}>
//               <Text style={styles.actionButtonText}>Process Form</Text>
//             </TouchableOpacity>
//             <Block style={styles.inputBlock}>
//               <Text style={styles.label}>Vehicle Number</Text>
//               <Input
//                 placeholder="Enter Vehicle Number"
//                 onChangeText={value => setVehicleNumber(value.toUpperCase())}
//                 value={vehicleNumber}
//                 style={styles.input}
//                 placeholderTextColor={isDarkMode ? '#888' : '#999'}
//               />
//             </Block>
//             {formFields.map(field => (
//               <Block key={field.key} style={styles.inputBlock}>
//                 <Text style={styles.label}>{field.label}</Text>
//                 <Input
//                   placeholder={field.placeholder}
//                   secureTextEntry={field.type === 'password'}
//                   onChangeText={value => handleInputChange(field.key, value)}
//                   value={field.value}
//                   style={styles.input}
//                   placeholderTextColor={isDarkMode ? '#888' : '#999'}
//                 />
//               </Block>
//             ))}
//             <Button onPress={handleSubmit} color={theme.COLORS.SUCCESS} style={styles.submitButton}>Submit</Button>
//           </Card>
//         </ScrollView>
//         <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
//           <MaterialIcons name={isDarkMode ? 'brightness-7' : 'brightness-2'} size={24} color='white' />
//         </TouchableOpacity>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   darkContainer: {
//     flex: 1,
//     backgroundColor: '#333',
//   },
//   lightContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   cardContainer: {
//     padding: 20,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     backgroundColor: '#fff',
//   },
//   headerImage: {
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   headerText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   actionButton: {
//     alignSelf: 'center',
//     marginVertical: 10,
//     backgroundColor: theme.COLORS.PRIMARY,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   actionButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   inputBlock: {
//     marginVertical: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   label: {
//     marginBottom: 5,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//   },
//   submitButton: {
//     marginTop: 20,
//     backgroundColor: theme.COLORS.SUCCESS,
//     paddingVertical: 15,
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   toggleButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     backgroundColor: theme.COLORS.INFO,
//     padding: 10,
//     borderRadius: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
// });

// export default PoliceForm;






import React, { useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { Block, Button, Input, Text, theme } from 'galio-framework';
import { Card } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { fetchData } from '../services/api'; // Adjust path as per your file structure
import axios from 'axios';

const PoliceForm = () => {
  const route = useRoute();
  const { photoUri } = route.params;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [formFields, setFormFields] = useState([
    { key: 'Vehicle_No', label: 'Vehicle No', placeholder: 'Enter Vehicle Number', type: 'text', value: '' },
    { key: 'O_name', label: "Owner's Name", placeholder: 'Owner Name', type: 'text', value: '' },
    { key: 'Vehicle_Class', label: 'Vehicle Class', placeholder: 'Vehicle Class', type: 'text', value: '' },
    { key: 'Chassis_No', label: 'Chassis No', placeholder: 'Chassis Number', type: 'text', value: '' },
    { key: 'Engine_No', label: 'Engine No', placeholder: 'Engine Number', type: 'number', value: '' },
    { key: 'Vehicle_Model', label: 'Vehicle Model', placeholder: 'Vehicle Model', type: 'text', value: '' },
    { key: 'Violation_Date', label: 'Violation Date', placeholder: 'Violation Date', type: 'text', value: '' },
    { key: 'Challan_Date', label: 'Challan Date', placeholder: 'Challan Date', type: 'text', value: '' },
    { key: 'Challan_No', label: 'Challan No', placeholder: 'Challan Number', type: 'text', value: '' },
    { key: 'Place_Of_Violation', label: 'Place Of Violation', placeholder: 'Place Of Violation', type: 'text', value: '' },
    { key: 'Driver_Name', label: 'Driver Name', placeholder: 'Driver Name', type: 'text', value: '' },
    { key: 'Driving_license_No', label: 'Driving License No', placeholder: 'Driving License Number', type: 'text', value: '' },
    { key: 'Driver_Contact_No', label: 'Driver Contact No', placeholder: 'Driver Contact Number', type: 'text', value: '' },
    { key: 'Driver_FatherName', label: 'Driver Father Name', placeholder: 'Driver Father Name', type: 'text', value: '' },
  ]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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
      const response = await axios.post('http://192.168.1.12:8081/mongodb/detect-characters/', {
        image_path: "V:/V123.jpg", // Send the photoUri to Django backend for character detection
      });

      const { vehicle_no } = response.data; // Assuming the response contains the detected vehicle number

      if (vehicle_no) {
        setVehicleNumber(vehicle_no);
        Alert.alert('Character Detection', `Detected Vehicle Number: ${vehicle_no}`);
      } else {
        Alert.alert('Character Detection', 'No vehicle number detected.');
      }

    } catch (error) {
      console.error('Error detecting characters:', error);
      Alert.alert('Error', 'Failed to detect characters. Please try again.');
    }
  };

  const retakePhoto = () => {
    console.log('Retake photo');
  };

  return (
    <SafeAreaView style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <ImageBackground source={require('../../assets/images/home.jpg')} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Card containerStyle={styles.cardContainer}>
            <ImageBackground source={{ uri: photoUri }} style={styles.headerImage}>
              <Text h5 style={styles.headerText}></Text>
            </ImageBackground>
            <TouchableOpacity onPress={retakePhoto} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Retake Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCharacterDetection} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Detect Characters</Text>
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
            <Button  color={theme.COLORS.SUCCESS} style={styles.submitButton}>Submit</Button>
          </Card>
        </ScrollView>
        <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
          <MaterialIcons name={isDarkMode ? 'brightness-7' : 'brightness-2'} size={24} color='white' />
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: '#333',
  },
  lightContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cardContainer: {
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
  },
  headerImage: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  actionButton: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: theme.COLORS.PRIMARY,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  inputBlock: {
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: theme.COLORS.SUCCESS,
    paddingVertical: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toggleButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: theme.COLORS.INFO,
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default PoliceForm;
