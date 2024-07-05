export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return data;
    } else {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      throw new Error('Unexpected response type');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export const BASE_URL = 'http://192.168.1.12:8081/';
