import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

export default function ActivateButton(props) {
    const { activate } = props;
    console.log(activate);
    const [isActivate, setIsActivate] = useState(null);
    useEffect(() => { setIsActivate(activate) }, []);

    return (
        isActivate ?
            <Button variant="contained" color="error">
                Deactivate
            </Button>
            :
            <Button variant="contained" color="success">
                Activate
            </Button>
    );
};