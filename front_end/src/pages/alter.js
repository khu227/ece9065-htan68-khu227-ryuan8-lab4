import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {alterPass} from '../actions/auth';

export default function Alter() {

    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [passErr, setPassErr] = useState('');
    const [confirmPassErr, setConfirmPassErr] = useState('');

    const dispatch = useDispatch();

    const { successMessage, failMessage } = useSelector(state => state.message);

    const handlePassChange = e => {
        const password = e.currentTarget.value;
        setPass(password);
        if(password){
            setPassErr('');
        }
    };

    const handleConfirmPassChange = e => {
        const confirmPass = e.currentTarget.value;
        setConfirmPass(confirmPass);
        if (confirmPass != pass) {
            setConfirmPassErr('not correct');
        }
        else {
            setConfirmPassErr('');
        }
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!pass) {
            setPassErr('empty!');
        }
        if (!confirmPass) {
            setConfirmPassErr('empty!');
        }
        if (passErr || confirmPassErr) {
            return;
        }
        const data = new FormData(e.currentTarget);
        const password = data.get('password');
        dispatch(alterPass(password));
    };

    return (
        <Container component="main" maxWidth="xs">
            {
                failMessage &&
                <Alert severity="error">{failMessage}</Alert>
            }
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <ManageAccountsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Alter Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="New Password"
                        type="password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        error={passErr}
                        helperText={passErr}
                        onChange={handlePassChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confrimPassword"
                        label="Confirm Password"
                        type="password"
                        id="confrimPassword"
                        autoComplete="confirmPassword"
                        error={confirmPassErr}
                        helperText={confirmPassErr}
                        onChange={handleConfirmPassChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onSubmit={handleSubmit}
                    >
                        Alter
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};