import {
    SET_LIST_NAME
} from '../actions/types.js';

const initialState = {

};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_LIST_NAME :
            return {
                ...state,
                listName: payload
            };
        default:
            return state;
    }
}