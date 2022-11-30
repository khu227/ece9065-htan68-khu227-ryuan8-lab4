import axios from 'axios';

export default function authHeader() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
    if (userInfo && userInfo.token) {
      // for Node.js Express back-end
      return { 'x-access-token': userInfo.token };
    } else {
      return {};
    }
  }