import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
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
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import validator from 'validator';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../actions/auth';
import { alpha, styled } from '@mui/material/styles';
import OpenService from '../services/open.service';

const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                InputProps: { sx: { height: 40 } }
            }
        }
    }
});

export default function TrackSearch() {

    const [artistName, setArtistName] = useState('');
    const [trackTitle, setTrackTitle] = useState('');
    const [genreTitle, setGenreTitle] = useState('');

    const changeArtist = event => {setArtistName(event.currentTarget.value)};
    const changeTrack = event => {setTrackTitle(event.currentTarget.value)};
    const changeGenre = event => {setGenreTitle(event.currentTarget.value)};

    const handleSubmit = () => {
        OpenService.searchTracks(artistName, trackTitle, genreTitle);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg" sx={{mt: 3}}>
                <Typography component="h4" variant="h4">
                    Track Search
                </Typography>
                <Grid container spacing={1} sx={{mt: 3}}>
                    <Grid item xs={1.5}>
                        <Typography component="h6" variant="h6">
                            Artist Name
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            onChange={changeArtist}
                        />
                    </Grid>
                    <Grid item xs={1.5}>
                        <Typography component="h6" variant="h6">
                            Track Title
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            onChange={changeTrack}
                        />
                    </Grid>
                    <Grid item xs={1.5}>
                        <Typography component="h6" variant="h6">
                            Genre Title
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            onChange={changeGenre}
                        />
                    </Grid>
                    <Grid item xs={1.5}>
                        <Button variant="contained"
                            onClick={handleSubmit}
                        >Search</Button>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
};