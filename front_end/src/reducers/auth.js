import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    TOURIST
} from "../actions/types";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

const initialState = userInfo
    ? { isLoggedIn: true, userInfo }
    : { isLoggedIn: false, userInfo: null };

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        // case TOURIST:
        //     return {
        //         ...state,
        //         isLoggedIn: false,
        //     }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userInfo: payload.user,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: null,
            };
        default:
            return state;
    }
}