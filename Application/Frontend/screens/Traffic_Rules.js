// import React from 'react';
// import { ScrollView, StyleSheet, View, Image } from 'react-native';
// import { Text, Block, theme } from 'galio-framework';
// import { Card } from 'react-native-elements';
// import { MaterialIcons } from '@expo/vector-icons';

// const TrafficRules = () => {
//   const rulesData = [
//     {
//       category: 'Speed Limits',
//       icon: 'speed',
//       rules: [
//         'City areas: Max 50 km/h',
//         'Highways: Max 100 km/h',
//         'Residential areas: Max 30 km/h',
//       ],
//     },
//     {
//       category: 'Seat Belt',
//       icon: 'seat',
//       rules: [
//         'All passengers must wear seat belts.',
//         'Children under 12 should be in appropriate seats.',
//       ],
//     },
//     {
//       category: 'Driving under Influence',
//       icon: 'warning',
//       rules: [
//         'Blood alcohol limit: 0.08%',
//         'Zero tolerance for underage drivers.',
//         'Hefty fines and penalties apply for violations.',
//       ],
//     },
//     {
//       category: 'Mobile Phone Use',
//       icon: 'phone',
//       rules: [
//         'No mobile phone usage without hands-free device.',
//         'Texting while driving is strictly prohibited.',
//       ],
//     },
//   ];

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text h4 style={styles.header}>Traffic Rules & Regulations</Text>
//       {rulesData.map((section, index) => (
//         <Card containerStyle={styles.card} key={index}>
//           <Block row middle>
//             <MaterialIcons name={section.icon} size={24} color="#004aad" style={styles.icon} />
//             <Text h5 style={styles.categoryTitle}>{section.category}</Text>
//           </Block>
//           {section.rules.map((rule, ruleIndex) => (
//             <Block key={ruleIndex} style={styles.ruleItem}>
//               <Text style={styles.ruleText}>• {rule}</Text>
//             </Block>
//           ))}
//         </Card>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 15,
//     backgroundColor: '#f2f4f5',
//   },
//   header: {
//     marginVertical: 15,
//     fontWeight: '700',
//     color: '#004aad',
//     textAlign: 'center',
//   },
//   card: {
//     borderRadius: 10,
//     padding: 15,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//     marginBottom: 15,
//   },
//   categoryTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#004aad',
//     marginLeft: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   ruleItem: {
//     marginVertical: 5,
//     paddingLeft: 5,
//   },
//   ruleText: {
//     fontSize: 14,
//     color: '#333',
//   },
// });

// export default TrafficRules;



// import React from 'react';
// import { ScrollView, StyleSheet, TouchableOpacity,SafeAreaView,View } from 'react-native';
// import { Text, Block, theme } from 'galio-framework';
// import { Card, Icon } from 'react-native-elements';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

// const TrafficRulesIndia = () => {
//   const navigation = useNavigation();
  
//   const lawsData = [
//     {
//       rule: 'Over Speeding',
//       penalty: '₹1,000 - ₹2,000',
//       icon: 'speed',
//     },
//     {
//       rule: 'Drunk Driving',
//       penalty: '₹10,000 and/or imprisonment up to 6 months',
//       icon: 'warning',
//     },
//     {
//       rule: 'Driving Without Seat Belt',
//       penalty: '₹1,000',
//       icon: 'seat',
//     },
//     {
//       rule: 'Using Mobile While Driving',
//       penalty: '₹5,000',
//       icon: 'phone',
//     },
//     {
//       rule: 'Driving Without License',
//       penalty: '₹5,000',
//       icon: 'person',
//     },
//     {
//       rule: 'Red Light Jumping',
//       penalty: '₹1,000 - ₹5,000',
//       icon: 'traffic',
//     },
//     {
//       rule: 'Overloading Vehicles',
//       penalty: '₹20,000 and ₹2,000 per extra tonne',
//       icon: 'local-shipping',
//     },
//   ];

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//           <View
//         style={{
//           position: 'absolute',
//           width: 415,
//           height: 500,
//         //   borderRadius: 600, 
//         borderBottomLeftRadius:700,
        
//           backgroundColor: '#fcecbd', // Orange color
//           top: -80,
//         //   right: -150, // Positioning it from the right side
//           transform: [{ scaleX: 1.2 }] // Stretch horizontally to make it elliptical
//         }}
//       />
//        <View
//         style={{
//           position: 'absolute',
//           width: 415,
//           height: 500,
//         //   borderRadius: 600, 
//         borderTopRightRadius:700,
        
//           backgroundColor: '#c2fcbd', // Orange color
//           bottom: -100,
//         //   right: -150, // Positioning it from the right side
//           transform: [{ scaleX: 1.2 }] // Stretch horizontally to make it elliptical
//         }}
//       />
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Navigation Bar with Back Button */}
//       <Block style={styles.navBar}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <MaterialIcons name="arrow-back" size={24} color="#004aad" />
//         </TouchableOpacity>
//         <Text h5 style={styles.navBarText}>Indian Traffic Laws & Penalties</Text>
//       </Block>

//       {/* Traffic Rules List */}
//       {lawsData.map((law, index) => (
//         <Card containerStyle={styles.card} key={index}>
//           <Block row middle>
//             <MaterialIcons name={law.icon} size={28} color="#004aad" style={styles.icon} />
//             <Block style={styles.textContainer}>
//               <Text style={styles.ruleTitle}>{law.rule}</Text>
//               <Text style={styles.penaltyText}>Penalty: {law.penalty}</Text>
//             </Block>
//           </Block>
//         </Card>
//       ))}
//     </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 15,
   
//   },
//   navBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//   },
//   navBarText: {
//     marginLeft: 15,
//     fontWeight: '700',
//     color: '#004aad',
//   },
//   card: {
//     borderRadius: 10,
//     padding: 15,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//     marginBottom: 15,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   ruleTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#004aad',
//   },
//   penaltyText: {
//     fontSize: 14,
//     color: '#333',
//     marginTop: 5,
//   },
// });

// export default TrafficRulesIndia;




import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, SafeAreaView, View, TextInput,KeyboardAvoidingView } from 'react-native';
import { Text, Block } from 'galio-framework';
import { Card } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TrafficRulesIndia = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  
  const lawsData = [
    { rule: 'Over Speeding', penalty: '₹1,000 - ₹2,000', icon: 'speed' },
    { rule: 'Drunk Driving', penalty: '₹10,000 and/or imprisonment up to 6 months', icon: 'warning' },
    { rule: 'Driving Without Seat Belt', penalty: '₹1,000', icon: 'seat' },
    { rule: 'Using Mobile While Driving', penalty: '₹5,000', icon: 'phone' },
    { rule: 'Driving Without License', penalty: '₹5,000', icon: 'person' },
    { rule: 'Red Light Jumping', penalty: '₹1,000 - ₹5,000', icon: 'traffic' },
    { rule: 'Overloading Vehicles', penalty: '₹20,000 and ₹2,000 per extra tonne', icon: 'local-shipping' },
  ];

  const filteredLaws = lawsData.filter(law =>
    law.rule.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 relative">

<KeyboardAvoidingView
        behavior={Platform.OS === 'Android' ? 'padding' : '0'}
        style={{ flex: 1,  }}
     /   >
      {/* Decorative Background Overlays */}
      <View className="absolute bg-fixed w-[415px] h-[500px] rounded-bl-full bg-[#fcecbd] -top-20 scale-x-125 " />
      <View className="absolute bg-fixed w-[415px] h-[500px] rounded-tr-full bg-[#c2fcbd] -bottom-28 scale-x-125" />

      {/* Navigation and Search Bar */}
      <View className="flex-row items-center mb-4 p-4 space-x-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#004aad" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-[#004aad]">Indian Traffic Laws & Penalties</Text>
      </View>
      <TextInput
        className="bg-white mx-4 mb-3 p-3 rounded-md border border-gray-300 text-base"
        placeholder="Search traffic rules..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Traffic Rules List */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {filteredLaws.map((law, index) => (
          <Card containerStyle={styles.card} key={index}>
            <Block row middle>
              <MaterialIcons name={law.icon} size={28} color="#004aad" style={{padding:5,marginRight:10}} />
              <Block className="flex-1">
                <Text className="text-lg font-semibold text-[#004aad]">{law.rule}</Text>
                <Text className="text-gray-600 mt-1">Penalty: {law.penalty}</Text>
              </Block>
            </Block>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  card: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
};

export default TrafficRulesIndia;
