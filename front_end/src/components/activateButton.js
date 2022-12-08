import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AdminService from '../services/admin.service';

export default function ActivateButton(props) {
    const { activate, user } = props;
    // console.log(activate);
    const [isActivate, setIsActivate] = useState(null);
    useEffect(() => { setIsActivate(Boolean(activate)) }, []);

    const setUserActive = () => {
        AdminService.setUserActive(user);
        setIsActivate(true);
    };

    const setUserDeactivate = () => {
        AdminService.setUserDeactivate(user);
        setIsActivate(false);
    };

    return (
        isActivate ?
            <Button variant="contained" color="error"
                onClick={setUserDeactivate}
            >
                Deactivate
            </Button>
            :
            <Button variant="contained" color="success"
                onClick={setUserActive}
            >
                Activate
            </Button>
    );
};