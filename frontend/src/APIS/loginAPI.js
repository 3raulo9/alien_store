import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const LOGIN_API = `${API_URL}/login/`;
const LOGOUT_API = `${API_URL}/logout/`;

export function fetchLogin(credentials) {
    return axios.post(LOGIN_API, credentials, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

// Function to perform logout
export function fetchLogout(refreshToken) {
    // Assume you store the access token in localStorage or another secure place
    const accessToken = localStorage.getItem('accessToken');
    return axios.post(LOGOUT_API, { refresh_token: refreshToken }, {
    });
}
