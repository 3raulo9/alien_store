import axios from 'axios';

// Endpoint for login
const LOGIN_API = "http://127.0.0.1:8000/api/login/";
// Endpoint for logout - adjust this if your endpoint is different
const LOGOUT_API = "http://127.0.0.1:8000/api/logout/";

// Function to perform login
export function fetchLogin(credentials) {
    return axios.post(LOGIN_API, credentials);
}

// Function to perform logout
export function fetchLogout(refreshToken) {
    return axios.post(LOGOUT_API, { refresh_token: refreshToken });
}
