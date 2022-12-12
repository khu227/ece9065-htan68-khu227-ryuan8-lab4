// reference: https://github.com/mui/material-ui/tree/v5.10.14/docs/data/material/getting-started/templates/sign-in

import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../actions/auth';
import AuthService from '../services/auth.service';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Net '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailErr, setEmailErr] = useState('');
  const [passErr, setPassErr] = useState('');

  const { successMessage, failMessage } = useSelector(state => state.message);

  const handleEmailChange = e => {
    const email = e.currentTarget.value;
    if (validator.isEmail(email)) {
      setEmailErr('');
    }
    else {
      setEmailErr('invalid email');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const email = data.get('email');
    const password = data.get('password');
    if (!email) {
      setEmailErr('empty!');
    }
    if (!password) {
      setPassErr('empty!');
    }
    dispatch(login(email, password))
      .then(() => {
        navigate('/');
        // window.location.reload();
      })
      .catch(err => {
        AuthService.resendEmail();
        console.log(err);
      });
    // login(email, password)();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {
          successMessage &&
          <Alert severity="success">{successMessage}</Alert>
        }
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailErr}
              helperText={emailErr}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passErr}
              helperText={passErr}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onSubmit={handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item xs>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Link href="/policycontent" variant="body2">
          {"Privacy | DMCA | AUP"}
        </Link>
      </Container>
    </ThemeProvider>
  );
};