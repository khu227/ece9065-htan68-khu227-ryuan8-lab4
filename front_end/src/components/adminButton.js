import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AdminService from '../services/admin.service';

export default function AdminButton (props) {

    const [admin, setAdmin] = useState(false);
    const {user} = props;


    const handleSet = () => {
        AdminService.setUserAsAdmin(user);
        setAdmin(true);
    };

    return (
        admin ?
            <Button variant="contained" color="success">
                Admin
            </Button >
            :
            < Button variant="contained" color="error"
                onClick={handleSet}>
                Set
            </Button >
    );
};