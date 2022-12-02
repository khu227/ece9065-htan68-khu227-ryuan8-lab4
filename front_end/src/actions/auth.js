import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_SUCCESS_MESSAGE,
  SET_FAIL_MESSAGE
  // TOURIST,
} from "./types";

import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      console.log(response);
      dispatch({
        type: REGISTER_SUCCESS,
      });

      dispatch({
        type: SET_SUCCESS_MESSAGE,
        payload: response.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_FAIL_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      console.log(data);
      if (data.status != 200) {
        dispatch({
          type: SET_FAIL_MESSAGE,
          payload: data.message,
        });
        return Promise.reject();
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      dispatch({
        type: SET_SUCCESS_MESSAGE,
        payload: data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_FAIL_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const alterPass = () => (dispatch) => {
  AuthService.alterPass().then(
    response => {
      console.log(response);
    }
  );
};

// export const tourist = () => (dispatch) => {
//   dispatch({type: TOURIST});
// };