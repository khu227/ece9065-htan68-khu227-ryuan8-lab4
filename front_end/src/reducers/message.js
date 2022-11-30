import {
    SET_SUCCESS_MESSAGE,
    CLEAR_MESSAGE,
    SET_FAIL_MESSAGE
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_SUCCESS_MESSAGE:
            return { successMessage: payload };

        case SET_FAIL_MESSAGE:
            return { failMessage: payload };

        case CLEAR_MESSAGE:
            return {
                successMessage: "",
                failMessage: ""
            };

        default:
            return state;
    }
}