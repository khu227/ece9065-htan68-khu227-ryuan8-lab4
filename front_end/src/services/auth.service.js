import axios from "axios";

const API_URL = "http://127.0.0.1:3009/api/open/";

const register = (username, email, password) => {
  return axios.post(API_URL + "register", {
      email,
      password,
      name: username,
  })
  .then(response =>{
    return response.data;
  });
    // return axios({
    //     method: 'post',
    //     url: API_URL + 'register',
    //     data: {
    //         email,
    //         password,
    //         name: username
    //     }
    // })
    // .then(response => {
    //     return response.data;
    // });
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