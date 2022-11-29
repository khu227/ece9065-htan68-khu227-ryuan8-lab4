import axios from "axios";

const API_URL = "http://localhost:8080/api/open/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
      email,
      password,
      name: username,
  })
  .then(response =>{
    return response.data;
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};