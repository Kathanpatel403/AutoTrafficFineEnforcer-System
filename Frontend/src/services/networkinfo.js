import NetworkInfo from 'react-native-network-info';

// Function to get the local IP address
const getLocalIpAddress = () => {
    return NetworkInfo.NetworkInfo.getIPV4Address()
      .then(ipAddress => {
        return ipAddress;
      })
      .catch(error => {
        console.error('Error getting IP address:', error);
        return null;
      });
  };

export { getLocalIpAddress };