import axios from 'axios'
    // Function to set the authentication token in localStorage
    export const setAuthToken = (token) => {
    localStorage.setItem('authToken', token);
    };

    // Function to get the authentication token from localStorage
    export const getAuthToken = () => {
    return localStorage.getItem('authToken');
    };

    // Function to check if the user is logged in
    export const isAuthenticated = () => {
    const token = getAuthToken();
    // return token !== null; 
    return true
    };


    export const getUserDetails = async () => {
    const token = getAuthToken();

    if (!token) {
        return false;
    }

    try {
        const response = await axios.get('YOUR_API_ENDPOINT_HERE', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        });

        if (response.status === 200) {
        const userDetails = response.data;
        return userDetails;
        } else {
        return false;
        }
    } catch (error) {
        console.error('Error fetching user details:', error);
        return false;
    }
    };

  
  