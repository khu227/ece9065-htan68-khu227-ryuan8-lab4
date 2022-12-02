import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import nonAdminUsers from './nonAdminUser';

export default combineReducers({
    auth,
    message,
    nonAdminUsers
});