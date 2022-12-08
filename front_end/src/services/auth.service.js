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
    url: BASE_URL + 'api/secure/update',
    headers: authHeader(),
    data: { newpassword: password }
  })
    .then(response => {
      return response.data;
    });
};

const getAllUserLists = () => {
  return axios.get(BASE_URL + 'api/secure/userListInfo',
    { headers: authHeader() })
    .then(response => {
      if (response.data.status == 401)
        return [];
      else
        return response.data;
    });
};

const createList = (name, description, tracks, visibility) => {
  return axios.post(BASE_URL + 'api/secure/userNewList',
    {
      list_name: name,
      description: description,
      list_of_tracks: tracks,
      visibility: visibility
    },
    { headers: authHeader() })
    .then(response => {
      return response.data;
    });
};

const delteList = name => {
  return axios.post(BASE_URL + 'api/secure/delExitList',
    {
      list_name: name
    },
    { headers: authHeader() })
    .then(response => {
      return response;
    });
}

const alterList = (id, name, description, tracks, visibility) => {
  return axios.post(BASE_URL + 'api/secure/newPlayListAspects',
    {
      list_name: name,
      description: description,
      list_of_tracks: tracks,
      visibility: visibility,
      list_id: id
    },
    { headers: authHeader() })
    .then(response => {
      return response.data;
    });
};

const addReview = (id, rate, review) => {
  return axios.post(BASE_URL + 'api/secure/review',
  {
    list_id: id,
    review: review,
    rate: rate
  },
  {headers: authHeader()})
  .then(response => {
    return response.data;
  });
};

export default {
  register,
  login,
  logout,
  alterPass,
  getAllUserLists,
  createList,
  delteList,
  alterList,
  addReview
};