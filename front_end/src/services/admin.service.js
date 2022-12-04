import axios from "axios";
import authHeader from "./auth-header";
import {BASE_URL} from './setting.js';

// const API_URL = 'http://127.0.0.1:3009/api/admin/';
const API_URL = BASE_URL + 'api/admin/';

const getAllUsers = () => {
    return axios.get(API_URL + 'userNameLists', { headers: authHeader() })
        .then(response => {
            return response.data;
        });
};

const setUserAsAdmin = name => {
    return axios.post(API_URL + 'adminGrant', { name }, { headers: authHeader() })
        .then(response => {
            console.log(response);
            return response.data;
        });
};

const setUserActive = name => {
    return axios.post(API_URL + 'adminReactivation', {name}, { headers: authHeader() })
    .then(response => {
        console.log(response);
        return response.data;
    });
};

const setUserDeactivate = name => {
    return axios.post(API_URL + 'adminDeactivation', {name}, { headers: authHeader() })
    .then(response => {
        console.log(response);
        return response.data;
    });
};

export default {
    getAllUsers,
    setUserAsAdmin,
    setUserActive,
    setUserDeactivate
}; 