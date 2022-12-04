import {
    SET_NON_ADMIN_USERS
} from './types';

import AdminService from '../services/admin.service';

export const getAllUsers = (dispatch) => {
    AdminService.getAllUsers()
        .then(
            response => {
                if (response.status == 200) {
                    // const arr = [];
                    // for (let i of response.data) {
                    //     arr.push(i.name);
                    // }
                    dispatch({
                        type: SET_NON_ADMIN_USERS,
                        payload: response.data
                    });
                    Promise.resolve();
                }
                else {
                    Promise.reject();
                }
            }
        );
};