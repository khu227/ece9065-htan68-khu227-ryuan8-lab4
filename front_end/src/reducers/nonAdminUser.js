import {
    SET_NON_ADMIN_USERS
} from '../actions/types';

// const initialState = {
    // nonAdminUsers: []
// };

export default function (state = {}, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_NON_ADMIN_USERS:
            return payload
        default:
            return [];
    }
}