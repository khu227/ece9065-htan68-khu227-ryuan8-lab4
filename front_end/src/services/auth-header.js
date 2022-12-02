import axios from 'axios';

export default function authHeader() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo && userInfo.token) {
    // for Node.js Express back-end
    return { 'Authorization': userInfo.token };
  } else {
    return {};
  }
}