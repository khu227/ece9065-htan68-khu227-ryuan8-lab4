import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';


export default function Verify() {

    const message = useSelector(state => state.message);

    const { successMessage } = message;

    return (
        successMessage &&
        <Typography component="h5" variant="h5" sx={{mt: 5}}>
            {successMessage}
        </Typography>
    );
};