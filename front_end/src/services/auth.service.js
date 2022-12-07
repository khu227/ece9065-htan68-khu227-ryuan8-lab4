import axios from "axios";
import authHeader from "./auth-header";
import { BASE_URL } from './setting';

// const API_URL = "http://127.0.0.1:3009/api/open/";
const API_URL = BASE_URL + 'api/open/';

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
    Email: email,
    password,
    name: username,
  })
    .then(response => {
      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      Email: email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("userInfo");
};

const alterPass = password => {
  return axios({
    method: 'post',
    url: 'http://127.0.0.1:3009/api/secure/update',
    headers: authHeader(),
    data: { newpassword: password }
  })
    .then(response => {
      return response.data;
    });
};

export default {
  register,
  login,
  logout,
  alterPass
};