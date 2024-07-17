// import React from "react";
// import VehicleTable from "./Table/App";
// import Home from 'components/navbar'
// import bg from '../../assets/images/bg17.jpg';
// import { Link } from "react-router-dom";
// const data = [
//   {
//     "licence_plate_no": "GJ11BR0030",
//     "rc_no": "RC1234",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "6565-6789-0123",
//     "address": {
//       "street": "456 Vivekanandnagar",
//       "area" : "Navrangpura",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380009"
//     },
//     "mobile_no": "7890123455",
//     "chesis_no": "CHEAB10ABCDE12345",
    
// "owner_name":{
//   "first_name":"Jayesh", 
//   "last_name":  "Sharma",
// },
// "engine_no":"EN10ABCDE12345",
//   },
//   {
//     "licence_plate_no": "GJ01WD9120",
//     "rc_no": "RC4789",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "6512-3456-7890",
//     "address": {
//       "street": "78 Santoshinagar",
//       "area": "Maninagar",
//       "city" : "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380008"
//     },
//     "mobile_no": "9876543210",
//     "chesis_no": "CHEAB10ABCDE10046",
//     "owner_name": "Kunal Patel",
//     "engine_no":"EN10ABCDE14346",
//   },
  
//   {
//     "licence_plate_no": "GJ01HJ6249",
//     "rc_no": "RC9875",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "7834-5678-9012",
//     "address": {
//       "street": "45 Laxminagar",
//       "area": "Ellisbridge",
//       "city" : "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380006"
//     },
//     "mobile_no": "9876543217",
//     "chesis_no": "CHEBG10ABHYE76643",
//     "owner_name": "Kajal Patel",
//     "engine_no":"EN10ABGTR25794",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18B05477",
//     "rc_no": "RC4356",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "7712-3456-7890",
//     "address": {
//       "street": "123 Shantivan",
//       "area": "Bopal",
//       "city" : "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380058"
//     },
//     "mobile_no": "9123456780",
//     "chesis_no": "CHEAB10BGHFT45563",
//     "owner_name": "Rina Patel",
//     "engine_no":"EN10BCDRE76432",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18BU9279",
//     "rc_no": "RC6547",
//     "fuel_type": "CNG",
//     "vehicle_type": "Rickshaw",
//     "aadharcard_number": "8723-4567-8901",
//     "address": {
//       "street": "456 Vasundhara",
//       "area": "Vejalpur",
//       "city" : "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380051"
//     },
//     "mobile_no": "9123456791",
//     "chesis_no": "CHEBC10BHGED12345",
//     "owner_name": "Vimal Patel",
//     "engine_no":"EN10CBGEF23476",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18CP9594",
//     "rc_no": "RC5467",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "6845-6789-0123",
//     "address": {
//       "street": "123 Akashdeep Society",
//       "area": "Sector 21",
//       "city" : "Gandhinagar",
//       "state": "Gujarat",
//       "postal_code": "382021"
//     },
//     "mobile_no": "9123456783",
//     "chesis_no": "CHEEF10BHJKL76563",
//     "owner_name": "Harish Mehta",
//     "engine_no":"EN10BCDEF23567",
  
//   },
  
//   {
//     "licence_plate_no": "GJ21CA2076",
//     "rc_no": "RC3478",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "6212-3456-7890",
//     "address": {
//       "street": "456 Shantivan Society",
//       "area": "Sector 30",
//       "city" : "Gandhinagar",
//       "state": "Gujarat",
//       "postal_code": "382030"
//     },
//     "mobile_no": "9212345670",
//     "chesis_no": "CHEAB10ERDAC56789",
//     "owner_name": "Ravi Joshi",
//     "engine_no":"EN10GFHDJ34567",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01MK4707",
//     "rc_no": "RC2345",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "6145-6789-0123",
//     "address": {
//       "street": "789 Shanti Kunj",
//       "area": "Sector 24",
//       "city" : "Gandhinagar",
//       "state": "Gujarat",
//       "postal_code": "382024"
//     },
//     "mobile_no": "9312345673",
//     "chesis_no": "CHEAC12ABCCD45678",
//     "owner_name": "Kishore Desai",
//     "engine_no":"EN10CCBHS2345",
  
//   },
  
//   {
//     "licence_plate_no": "MP43DP8751",
//     "rc_no": "RC6754",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5823-4567-8901",
//     "address": {
//       "street": "456 Sardar Nagar",
//       "area": "Kalavad Road",
//       "city" : "Rajkot",
//       "state": "Gujarat",
//       "postal_code": "360005"
//     },
//     "mobile_no": "8312345671",
//     "chesis_no": "CHEAC56CBBSX23456",
//     "owner_name": "Vijay Trivedi",
//     "engine_no":"EN10CAABC12367",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18BV3733",
//     "rc_no": "RC3455",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "5512-3456-7890",
//     "address": {
//       "street": "789 Patel Colony",
//       "area" : "Park Colony",
//       "city": "Jamnagar",
//       "state": "Gujarat",
//       "postal_code": "361008"
//     },
//     "mobile_no": "8212345670",
//     "chesis_no": "CHEDC10CVBAC54321",
//     "owner_name": "Rohan Bhatt",
//     "engine_no":"EN10DBCEA23456",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01XC6984",
//     "rc_no": "RC8765",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5123-4567-8901",
//     "address": {
//       "street": "123 Green Park",
//       "area" : "Mahendranagar",
//       "city": "Morbi",
//       "state": "Gujarat",
//       "postal_code": "363642"
//     },
//     "mobile_no": "8012345671",
//     "chesis_no": "CHEBC10ABCDF67890",
//     "owner_name": "Rajat Shah",
//     "engine_no":"EN10BCHFE567890",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01PK8807",
//     "rc_no": "RC2367",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5934-5678-9012",
//     "address": {
//       "street": "456 Ram Nagar",
//       "area" : "Ravapar Road",
//       "city": "Morbi",
//       "state": "Gujarat",
//       "postal_code": "363641"
//     },
//     "mobile_no": "7512345672",
//     "chesis_no": "CHEBD10BCEAD65422",
//     "owner_name": "Rekha Soni",
//     "engine_no":"EN10ABCDE87654",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01XK0718",
//     "rc_no": "RC7654",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "8523-4567-8901",
//     "address": {
//       "street": "789 Sardar Nagar",
//       "area" : "Kalavad Road",
//       "city": "Rajkot",
//       "state": "Gujarat",
//       "postal_code": "360005"
//     },
//     "mobile_no": "6512345671",
//     "chesis_no": "CHEAN12BCDEA65432",
//     "owner_name": "Vikas Patel",
//     "engine_no":"EN10HGFAD54321",
  
//   },
  
//   {
//     "licence_plate_no": "GJ27BS6810",
//     "rc_no": "RC3498",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "8634-5678-9012",
//     "address": {
//       "street": "456 Nehru Park",
//       "area" : "Yagnik Road",
//       "city": "Rajkot",
//       "state": "Gujarat",
//       "postal_code": "360001"
//     },
//     "mobile_no": "6612345672",
//     "chesis_no": "CHEES34KHSER12345",
//     "owner_name": "Sneha Talaviya",
//     "engine_no":"EN10POREQ98546",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01JT9466",
//     "rc_no": "RC3678",
//     "fuel_type": "Diesel",
//     "vehicle_type": "LCV",
//     "aadharcard_number": "8123-4567-8901",
//     "address": {
//       "street": "789 Krishna Nagar",
//       "area" : "Digvijay Plot",
//       "city": "Jamnagar",
//       "state": "Gujarat",
//       "postal_code": "361005"
//     },
//     "mobile_no": "6712345671",
//     "chesis_no": "CHESD76BHCSD12348",
//     "owner_name": "Aryan Kathiriya",
//     "engine_no":"EN01BHESD23487",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01HT5260",
//     "rc_no": "RC4444",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "4112-3456-7890",
//     "address": {
//       "street": "456 New City",
//       "area" : "Adajan",
//       "city": "Surat",
//       "state": "Gujarat",
//       "postal_code": "395009"
//     },
//     "mobile_no": "6912345670",
//     "chesis_no": "ABCTR20BVCGH27895",
//     "owner_name": "Alisha Shah",
//     "engine_no":"EN20BCGHR43567 ",
  
//   },
//   {
//       "licence_plate_no": "GJ01HZ1237",
//       "rc_no": "RC1111",
//       "fuel_type": "Petrol",
//       "vehicle_type": "Car",
//       "aadharcard_number": "4123-4567-8901",
//       "address": {
//         "street": "456 New City",
//         "area" : "Adajan",
//         "city": "Surat",
//         "state": "Gujarat",
//         "postal_code": "395009"
//       },
//       "mobile_no": "6912345671",
//       "chesis_no": "CHESA45VISHV23476",
//       "owner_name": "Rahul Shah",
//       "engine_no":"EN29KANVI98653",
  
//     },
  
//   {
//       "licence_plate_no": "GJ18BU0992",
//       "rc_no": "RC2222",
//       "fuel_type": "CNG",
//       "vehicle_type": "Rickshaw",
//       "aadharcard_number": "4512-3456-7890",
//       "address": {
//         "street": "789 Central Park",
//         "area" : "Piplod",
//         "city": "Surat",
//         "state": "Gujarat",
//         "postal_code": "395007"
//       },
//       "mobile_no": "6969123456",
//       "chesis_no": "CHAES32VBARK23896",
//       "owner_name": "Arjun Kanani",
//       "engine_no":"EN23VISHK54678",
  
//     },
    
//   {
//     "licence_plate_no": "GJ01VK5376",
//     "rc_no": "RC3333",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "4523-4567-8901",
//     "address": {
//       "street": "789 Central Park",
//       "area" : "Piplod",
//       "city": "Surat",
//       "state": "Gujarat",
//       "postal_code": "395007"
//     },
//     "mobile_no": "6969123457",
//     "chesis_no": "CHSUS12BVCRE25467",
//     "owner_name": "Ravi Kanani",
//     "engine_no":" EN23POIUY98765",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01SP9294",
//     "rc_no": "RC5555",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "4423-4567-8901",
//     "address": {
//       "street": "456 Garden View",
//       "area" : "Adajan",
//       "city": "Surat",
//       "state": "Gujarat",
//       "postal_code": "395009"
//     },
//     "mobile_no": "9725037272",
//     "chesis_no": "CHSIS13CBVAS23456",
//     "owner_name": "Rajesh Gandhi",
//     "engine_no":"EN78ABVCE76543",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18BK4957",
//     "rc_no": "RC6666",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "4434-5678-9012",
//     "address": {
//       "street": "456 Garden View",
//       "area" : "Adajan",
//       "city": "Surat",
//       "state": "Gujarat",
//       "postal_code": "395009"
//     },
//     "mobile_no": "9725037273",
//     "chesis_no": "CHSIS34ABCDE45678",
//     "owner_name": "Kavita Gandhi",
//     "engine_no":"EN78MNCBV32654",
  
//   },
//   {
//       "licence_plate_no": "GJ01FZ7654",
//       "rc_no": "RC7777",
//       "fuel_type": "Petrol",
//       "vehicle_type": "Bike",
//       "aadharcard_number": "9412-3456-7890",
//       "address": {
//         "street": "123 Green View",
//         "area" : "Gandevi Road",
//         "city": "Navsari",
//         "state": "Gujarat",
//         "postal_code": ""
//       },
//       "mobile_no": "9999123456",
//       "chesis_no": "CHGES23BVCSA76454",
//       "owner_name": "Amit Bhoraniya",
//       "engine_no":"EN43VCBXZ86421",
  
//     },
    
//   {
//     "licence_plate_no": "GJ23BS4371",
//     "rc_no": "RC8888",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "9434-5678-9012",
//     "address": {
//       "street": "123 Green View",
//       "area" : "Gandevi Road",
//       "city": "Navsari",
//       "state": "Gujarat",
//       "postal_code": "396445"
//     },
//     "mobile_no": "9999123458",
//     "chesis_no": "CHSSS32BCCCB22222",
//     "owner_name": "Neha Bhoraniya",
//     "engine_no":"EN67BHBHB34343",
  
//   },
  
//   {
//     "licence_plate_no": "GJ27FD2540",
//     "rc_no": "RC9099",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "address": {
//       "street": "123 Green View",
//       "area": "Gandevi Road",
//       "city": "Navsari",
//       "state": "Gujarat",
//       "postal_code": "396445"
//   },
//     "mobile_no": "9999123457",
//     "chesis_no": "CHESE34ERTYU56789",
//     "owner_name": "Rahul Bhoraniya",
//     "engine_no":"EN09CVBGF23456",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18DF0857",
//     "rc_no": "RC9999",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard": "9712-3456-7890", 
//     "address": {
//        "street": "456 Lake View",
//         "area": "Sector 15",
//         "city": "Gandhinagar",
//          "state": "Gujarat",
//          "postal_code": "382015"
//     },
//     "mobile_no": "9998123456",
//     "chesis_no": "CHESE23HREWY54565",
//     "owner_name": "Isha Jagani",
//     "engine_no":"EN43CEWQW43567",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18DC4208",
//     "rc_no": "RC4500",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "9723-4567-8901",
//     "address": {
//       "street": "456 Lake View",
//       "area": "Sector 15",
//       "city": "Gandhinagar",
//       "state": "Gujarat",
//       "postal_code": "382015"
//     },
//     "mobile_no": "9998123457",
//     "chesis_no": "CHEEE34CCVVB22334",
//     "owner_name": "Anand Jagani",
//     "engine_no":"EN23RCRCE43435",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01UZ0836",
//     "rc_no": "RC3480",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5192-8754-3210",
//     "address": {
//       "street": "10 Green Park",
//       "area" : "Navrangpura",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380009"
//     },
//     "mobile_no": "9801234567",
//     "chesis_no": "CHGTV34TRESD34867",
//     "owner_name": "Dhruv Patel",
//     "engine_no":"EN67BVCBV54654",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01VW1594",
//     "rc_no": "RC5670",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5281-9473-6051",
//     "address": {
//       "street": "6 Lake View",
//       "area" : "Sector 15",
//       "city": "Gandhinagar",
//       "state": "Gujarat",
//       "postal_code": "382015"
//     },
//     "mobile_no": "9845078901",
//     "chesis_no": "CHABC23ABCDE56872",
//     "owner_name": "Krisha Shah",
//     "engine_no":"EN09BVCBV45678",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18DC9887",
//     "rc_no": "RC2233",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5370-8962-5143",
//     "address": {
//       "street": "78 Royal Park",
//       "area" : "Adajan",
//       "city": "Surat",
//       "state": "Gujarat",
//       "postal_code": "395009"
//     },
//     "mobile_no": "9723156789",
//     "chesis_no": "CHHES19VCSED67890",
//     "owner_name": "Parth Desai",
//     "engine_no":"EN98KANAA45768",
  
//   },
  
//   {
//     "licence_plate_no": "GJ27AM0075",
//     "rc_no": "RC6540",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5463-7354-8236",
//     "address": {
//       "street": "45 Sunshine Avenue",
//       "area" : "Navsari Road",
//       "city": "Navsari",
//       "state": "Gujarat",
//       "postal_code": "396445"
//     },
//     "mobile_no": "9810345670",
//     "chesis_no": "CHSES56BVGHK87254",
//     "owner_name": "Riya Kanetiya",
//     "engine_no":"EN54BKYES71983",
  
//   },
//   {
//       "licence_plate_no": "GJ01MK3633",
//       "rc_no": "RC4400",
//       "fuel_type": "Petrol",
//       "vehicle_type": "Bike",
//       "aadharcard_number": "5554-6245-9327",
//       "address": {
//         "street": "789 Sunrise Avenue",
//         "area" : "Morbi Road",
//         "city": "Morbi",
//         "state": "Gujarat",
//         "postal_code": "363641"
//       },
//       "mobile_no": "9876503210",
//       "chesis_no": "CHHES23PKHSA65234",
//       "owner_name": "Jigar Kaneriya",
//       "engine_no":"EN90VBKAT12376",
  
//     },
  
//   {
//       "licence_plate_no": "GJ01FM0157",
//       "rc_no": "RC6700",
//       "fuel_type": "Petrol",
//       "vehicle_type": "Bike",
//       "aadharcard_number": "5645-5136-0418",
//       "address": {
//         "street": "456 Sunset Road",
//         "area" : "Rajkot City",
//         "city": "Rajkot",
//         "state": "Gujarat",
//         "postal_code": "360001"
//       },
//       "mobile_no": "9901034567",
//       "chesis_no": "CHECE57BHARE51876",
//       "owner_name": "Ananya Patel",
//       "engine_no":"EN09BCRSE12987",
  
//     },
    
//   {
//     "licence_plate_no": "GJ18BJ1186",
//     "rc_no": "RC1100",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "",
//     "address": {
//       "street": "789 River View",
//       "area" : "Jamnagar Road",
//       "city": "Jamnagar",
//       "state": "Gujarat",
//       "postal_code": "361001"
//     },
//     "mobile_no": "9851789012",
//     "chesis_no": "CHRES45IUTRE24536",
//     "owner_name": "Mehul Patel",
//     "engine_no":"EN20RCVBA56789",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18EA1338",
//     "rc_no": "RC8700",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "5827-2918-2600",
//     "address": {
//       "street": "456 Sunrise Park",
//       "area" : "Surendranagar",
//       "city": "Surendranagar",
//       "state": "Gujarat",
//       "postal_code": "363001"
//     },
//     "mobile_no": "9789012345",
//     "chesis_no": "CHABB54POIUY09876",
//     "owner_name": "Avani Jagodana",
//     "engine_no":"EN09LKJHH10928",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18DO8489",
//     "rc_no": "RC7601",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5918-1809-3701",
//     "address": {
//       "street": "456 Sunset View",
//       "area" : "Bhanvad Road",
//       "city": "Bhanvad",
//       "state": "Gujarat",
//       "postal_code": "360510"
//     },
//     "mobile_no": "9745612309",
//     "chesis_no": "CHEES87VBSAE87132",
//     "owner_name": "Dhruvil Shah",
//     "engine_no":"EN87PKMNJ10934",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01KT4286",
//     "rc_no": "RC2200",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "5961-2803-5903",
//     "address": {
//       "street": "789 Skyline View",
//       "area" : "Adajan",
//       "city": "Surat",
//       "state": "Gujarat",
//       "postal_code": "395009"
//     },
//     "mobile_no": "9861234567",
//     "chesis_no": "CCHES24AMNSR82539",
//     "owner_name": "Neha Patel",
//     "engine_no":"EN54HGORE10854",
  
//   },
  
//   {
//     "licence_plate_no": "GJ27DE4175",
//     "rc_no": "RC0967",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "6564-5678-9012",
//     "address": {
//       "street": "456 Vivekanandnaga",
//       "area" : "Navrangpura",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380009"
//     },
//     "mobile_no": "7890123456",
//     "chesis_no": "CHESA76NGWSF98236",
//     "owner_name": "Vishal Sharma",
//     "engine_no":"EN98BHTFQ13986",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18DL8161",
//     "rc_no": "RC8723",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "",
//     "address": {
//       "street": "456 Vivekanandnagar",
//       "area" : "Navrangpura",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380009"
//     },
//     "mobile_no": "7890123454",
//     "chesis_no": "CHSEQ98VBUYT65987",
//     "owner_name": "Bhavna Sharma",
//     "engine_no":"EN74FRETI98765",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18EC3319",
//     "rc_no": "RC9245",
//     "fuel_type": "CNG",
//     "vehicle_type": "Car",
//     "aadharcard_number": "6534-5678-9012",
//     "address": {
//       "street": "78 Santoshinagar",
//       "area" : "Maninagar",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380008"
//     },
//     "mobile_no": "9876543212",
//     "chesis_no": "CAVCB76BHESD87236",
//     "owner_name": "Meena Patel",
//     "engine_no":"EN92BHESD87239",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01UB2535",
//     "rc_no": "RC2587",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "6545-6789-0123",
//     "address": {
//       "street": "78 Santoshinagar",
//       "area" : "Maninagar",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380008"
//     },
//     "mobile_no": "9876543213",
//     "chesis_no": "CABCD12OKJHT29375",
//     "owner_name": "Dharmesh Patel",
//     "engine_no":"EN02BHECS09456",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01EX5564",
//     "rc_no": "RC7823",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "7823-4567-8901",
//     "address": {
//       "street": "45 Laxminagar",
//       "area" : "Ellisbridge",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380006"
//     },
//     "mobile_no": "9876543216",
//     "chesis_no": "CBBEE08NBESD98254",
//     "owner_name": "Mahesh Patel",
//     "engine_no":"EN30BVESD56987",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01KR4597",
//     "rc_no": "RC6710",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "7734-5678-9012",
//     "address": {
//       "street": "123 Shantivan",
//       "area" : "Bopal",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380058"
//     },
//     "mobile_no": "9123456782",
//     "chesis_no": "COEDS65PLARE76123",
//     "owner_name": "Nisha Patel",
//     "engine_no":"EN06RFBHY49865",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01HZ1237",
//     "rc_no": "RC6287",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "7745-6789-0123",
//     "address": {
//       "street": "123 Shantivan",
//       "area" : "Bopal",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380058"
//     },
//     "mobile_no": "9123456783",
//     "chesis_no": "CARFD28YTREW27654",
//     "owner_name": "Ramesh Patel",
//     "engine_no":"EN12BHJKL12345",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01FG5744",
//     "rc_no": "RC2687",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "",
//     "address": {
//       "street": "456 Vasundhara",
//       "area" : "Vejalpur",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380051"
//     },
//     "mobile_no": "9123456790",
//     "chesis_no": "CHESS23BHESD23456",
//     "owner_name": "Priya Patel",
//     "engine_no":"EN76BHJES34587",
  
//   },
  
//   {
//     "licence_plate_no": "GJ16AJ2118",
//     "rc_no": "RC4758",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "8734-5678-9012",
//     "address": {
//       "street": "456 Vasundhara",
//       "area" : "Vejalpur",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "postal_code": "380051"
//     },
//     "mobile_no": "9123456792",
//     "chesis_no": "CHESI98BVKJH34987",
//     "owner_name": "Rita Patel",
//     "engine_no":"EN76BHFKS97452",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18AY6479",
//     "rc_no": "RC9876",
//     "fuel_type": "CNG",
//     "vehicle_type": "Rickshaw",
//     "aadharcard_number": "6845-6789-0123",
//     "address": {
//       "street": "123 Akashdeep Society",
//       "area" : "Sector 21",
//       "city": "Gandhinagar",
//       "state": "Gujarat",
//       "postal_code": "382021"
//     },
//     "mobile_no": "9123456783",
//     "chesis_no": "CESES67JHGFD10385",
//     "owner_name": "Harish Mehta",
//     "engine_no":"EN89BVHJK39876",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18OB0451",
//     "rc_no": "RC6109",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "6212-3456-7890",
//     "address": {
//       "street": "456 Shantivan Society",
//       "area" : "Sector 30",
//       "city": "Gandhinagar",
//       "state": "Gujarat",
//       "postal_code": "382030"
//     },
//     "mobile_no": "9212345670",
//     "chesis_no": "CHSSE87VCUYW19835",
//     "owner_name": "Ravi Joshi",
//     "engine_no":"EN25OIUYT09876",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01DY4187",
//     "rc_no": "RC2387",
//     "fuel_type": "CNG",
//     "vehicle_type": "Rickshaw",
//     "aadharcard_number": "6223-4567-8901",
//     "address": {
//       "street": "456 Shantivan Society",
//       "area" : "Sector 30",
//       "city": "Gandhinagar",
//       "state": "Gujarat",
//       "postal_code": "382030"
//     },
//     "mobile_no": "9212345671",
//     "chesis_no": "CHHSE27VHBER76542",
//     "owner_name": "Kiran Joshi",
//     "engine_no":"EN89EIUTD29865",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18FB9627",
//     "rc_no": "RC3587",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "6256-7890-1234",
//     "address": {
//       "street": "456 Shantivan Society",
//       "area" : "Sector 30",
//       "city": "Gandhinagar",
//       "state": "Gujarat",
//       "postal_code": "382030"
//     },
//     "mobile_no": "9212345674",
//     "chesis_no": "CYSRE87BVCNB87653",
//     "owner_name": "Kanta Joshi",
//     "engine_no":"EN09BVMNK09876",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18BM1115",
//     "rc_no": "RC0954",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Car",
//     "aadharcard_number": "6134-5678-9012",
//     "address": {
//       "street": "789 Shanti Kunj",
//       "area" : "Sector 24",
//       "city": "Gandhinagar",
//       "state": "Gujarat",
//       "postal_code": "382024"
//     },
//     "mobile_no": "9312345672",
//     "chesis_no": "CABCD12OKJHT20075",
//     "owner_name": "Nina Desai",
//     "engine_no":"EN09CVBGF20056",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18DN8451",
//     "rc_no": "RC3698",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5812-3456-7890",
//     "address": {
//       "street": "456 Sardar Nagar",
//       "area" : "Kalavad Road",
//       "city": "Rajkot",
//       "state": "Gujarat",
//       "postal_code": "360005"
//     },
//     "mobile_no": "8312345670",
//     "chesis_no": "CESES67JHGFD10335",
//     "owner_name": "Kunal Trivedi",
//     "engine_no":"EN76BHJES33387",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01HT6968",
//     "rc_no": "RC7368",
//     "fuel_type": "Diesel",
//     "vehicle_type": "LCV",
//     "aadharcard_number": "5512-3456-7890",
//     "address": {
//       "street": "789 Patel Colony",
//       "area" : "Park Colony",
//       "city": "Jamnagar",
//       "state": "Gujarat",
//       "postal_code": "361008"
//     },
//     "mobile_no": "8212345670",
//     "chesis_no": "CEAAB10ABCDE10046",
//     "owner_name": "Rohan Bhatt",
//     "engine_no":"EZ43VCBXZ86421",
  
//   },
  
//   {
//     "licence_plate_no": "GJ18DP5946",
//     "rc_no": "RC2327",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5112-3456-7890",
//     "address": {
//       "street": "123 Green Park",
//       "area" : "Mahendranagar",
//       "city": "Morbi",
//       "state": "Gujarat",
//       "postal_code": "363642"
//     },
//     "mobile_no": "8012345670",
//     "chesis_no": "CAVVB76BHESD87236",
//     "owner_name": "Manav Shah",
//     "engine_no":"EN30NJUYT54367",
  
//   },
  
//   {
//     "licence_plate_no": "GJ27BP1988",
//     "rc_no": "RC9345",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5134-5678-9012",
//     "address": {
//       "street": "123 Green Par",
//       "area" : "Mahendranagar",
//       "city": "Morbi",
//       "state": "Gujarat",
//       "postal_code": "363642"
//     },
//     "mobile_no": "8012345672",
//     "chesis_no": "CHCCU12BVUYE98237",
//     "owner_name": "Naina Shah",
//     "engine_no":"EN22ABRDE87654",
  
//   },
  
//   {
//     "licence_plate_no": "GJ01NW5584",
//     "rc_no": "RC8256",
//     "fuel_type": "Petrol",
//     "vehicle_type": "Bike",
//     "aadharcard_number": "5934-5678-9012",
//     "address": {
//       "street": "456 Ram Nagar",
//       "area" : "Ravapar Road",
//       "city": "Morbi",
//       "state": "Gujarat",
//       "postal_code": "363641"
//     },
//     "mobile_no": "7512345672",
//     "chesis_no": "ABCTR20BBBGH27895",
//     "owner_name": "Rekha Soni",
//     "engine_no":" EN23POVIY98765",
  
//   }
//   // Add more data as needed
// ];

// function App() {
//   return (
//     <>
//     <Home />
    

//     <div className="App mt-20" style={{ backgroundImage:`url(${bg})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
//     <div className="flex pt-20 space-x-4 items-center justify-center">
//        <Link to='/vs'>
//         <button className="glassy-button h-20 bg-blue-500 hover:bg-blue-600 text-white px-16 py-3 rounded-lg shadow-lg">
//           <span role="img" aria-label="vehicle">🚗</span> Echallan Generated
//         </button>
//         </Link>
//         <Link to='/es'>
//         <button className="glassy-button h-20 bg-green-500 hover:bg-green-600 text-white px-16 py-3 rounded-lg shadow-lg">
//           <span role="img" aria-label="electricity">⚡️</span> Echallan Integrated
//         </button>
//         </Link>
//         <Link to='/es'>
//         <button className="glassy-button h-20 bg-green-500 hover:bg-green-600 text-white px-16 py-3 rounded-lg shadow-lg">
//           <span role="img" aria-label="electricity">❌</span> Fail to Integrate
//         </button>
//         </Link>
//       </div>  
//       <VehicleTable data={data} />
    
//     </div>
//     </>
//   );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Home from 'components/navbar';
import VehicleTable from 'layouts/Electricity/Table/App'; // Assuming you have this component
import bg from 'assets/images/bg17.jpg'; // Update the path as per your project structure

function App() {
  const [data, setData] = useState([]);
  const [fetchUrl, setFetchUrl] = useState(''); // URL to fetch data from

  useEffect(() => {
    if (fetchUrl) {
      axios.get(fetchUrl)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [fetchUrl]);

  const handleFetchData = (url) => {
    setFetchUrl(url);
  };

  return (
    <>
      <Home />

      <div className="App mt-20" style={{ backgroundImage: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <div className="flex pt-20 space-x-4 items-center justify-center">
          <button 
            onClick={() => handleFetchData('/api/echallan-generated')} 
            className="glassy-button h-20 bg-blue-500 hover:bg-blue-600 text-white px-16 py-3 rounded-lg shadow-lg"
          >
            <span role="img" aria-label="vehicle">🚗</span> Echallan Generated
          </button>
          <button 
            onClick={() => handleFetchData('/api/echallan-integrated')} 
            className="glassy-button h-20 bg-green-500 hover:bg-green-600 text-white px-16 py-3 rounded-lg shadow-lg"
          >
            <span role="img" aria-label="electricity">⚡️</span> Echallan Integrated
          </button>
          <button 
            onClick={() => handleFetchData('/api/fail-to-integrate')} 
            className="glassy-button h-20 bg-red-500 hover:bg-red-600 text-white px-16 py-3 rounded-lg shadow-lg"
          >
            <span role="img" aria-label="electricity">❌</span> Fail to Integrate
          </button>
        </div>
        <VehicleTable data={data} />
      </div>
    </>
  );
}

export default App;
