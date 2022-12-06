import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import OpenService from '../services/open.service';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import YoutubeButton from '../components/youtubeButton';

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
    const [results, setResults] = useState([]);
    const [isShow, setIsShow] = useState(false);

    const changeArtist = event => { setArtistName(event.currentTarget.value) };
    const changeTrack = event => { setTrackTitle(event.currentTarget.value) };
    const changeGenre = event => { setGenreTitle(event.currentTarget.value) };

    const handleSubmit = () => {
        OpenService.searchTracks(artistName, trackTitle, genreTitle)
            .then(res => { console.log(res); setResults(res); });
    };

    const handleShowMore = () => { setIsShow(true) };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg" sx={{ mt: 3 }}>
                <Typography component="h4" variant="h4">
                    Track Search
                </Typography>
                <Grid container spacing={1} sx={{ mt: 3 }}>
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
                <Grid container spacing={1} sx={{ mt: 2 }}>
                    <Grid item xs={1.5}>
                        <Button
                            variant="contained"
                            onClick={handleShowMore}>
                            Show More
                        </Button>
                    </Grid>
                </Grid>
                {results &&
                    < TableContainer component={Paper} sx={{ mt: 3 }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Track Title</TableCell>
                                    <TableCell align="left">Artist Name</TableCell>
                                    {isShow && <TableCell align="left">Album Title</TableCell>}
                                    {isShow && <TableCell align="left">Track Date Created</TableCell>}
                                    {isShow && <TableCell align="left">Track Favorites</TableCell>}
                                    {isShow && <TableCell align="left">Track Genres</TableCell>}
                                    {isShow && <TableCell align="left">Track Language Code</TableCell>}
                                    {isShow && <TableCell align="left">Play</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    results.map(result => (
                                        <TableRow
                                            component="th" scope="row"
                                            key={result.track_title}
                                        >
                                            <TableCell align="left">
                                                {result.track_title}
                                            </TableCell>
                                            <TableCell align="left">
                                                {result.artist_name}
                                            </TableCell>
                                            {isShow &&
                                                <TableCell align="left">
                                                    {result.album_title}
                                                </TableCell>}
                                            {isShow &&
                                                <TableCell align="left">
                                                    {result.track_date_created}
                                                </TableCell>}
                                            {isShow &&
                                                <TableCell align="left">
                                                    {result.track_favorites}
                                                </TableCell>}
                                            {isShow &&
                                                <TableCell align="left">
                                                    {result.track_genres}
                                                </TableCell>}
                                            {isShow &&
                                                <TableCell align="left">
                                                    {result.track_language_code}
                                                </TableCell>}
                                            {isShow &&
                                                <TableCell align="left">
                                                    <YoutubeButton trackTitle={result.track_title} />
                                                </TableCell>}
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Container>
        </ThemeProvider >
    );
};