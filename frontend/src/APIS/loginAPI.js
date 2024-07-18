// loginAPI.js

import axios from 'axios';

const LOGIN_API = "http://localhost:3000/login/";
const LOGOUT_API = "http://localhost:3000/logout/";

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

