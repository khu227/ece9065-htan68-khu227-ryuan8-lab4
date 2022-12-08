import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import OpenService from '../services/open.service.js';
import Link from '@mui/material/Link';
import { SET_LIST_NAME } from '../actions/types.js';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import YoutubeButton from '../components/youtubeButton.js';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import Grid from '@mui/material/Grid';
import Reviews from '../components/review';
import Box from '@mui/material/Box';
import AddReview from '../components/addReview';

export default function ListDetails() {

    const [details, setDetails] = useState([]);
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const openState = useSelector(state => state.openState);
    const auth = useSelector(state => state.auth);
    const isLoggedIn = auth.isLoggedIn;
    const { listName } = openState;
    // const {listname} = useParams();
    useEffect(() => { OpenService.getPublicListsMore(listName).then(res => { setDetails(res) }) }, []);

    const handleClick = () => {
        navigate(-1);
    };

    return (
        details &&
        <Container component="main" maxWidth="md" sx={{ mt: 3, pb: 20 }}>
            <Typography component="h4" variant="h4">
                {listName}
            </Typography>
            <Grid container sx={{ mt: 2 }}>
                <Grid item sx={2}>
                    <Button variant="outlined"
                        onClick={handleClick}>
                        <KeyboardReturnOutlinedIcon />return
                    </Button>
                </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
                Description: {details && details[0] && details[0].description}
            </Box>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Track Title</TableCell>
                            <TableCell align="left">Artist Name</TableCell>
                            <TableCell align="left">Play</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            details.map(detail => (
                                <TableRow
                                    key={detail.track_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">
                                        {detail.track_title}
                                    </TableCell>
                                    <TableCell align="left">
                                        {detail.artist_name}
                                    </TableCell>
                                    <TableCell align="left">
                                        <YoutubeButton trackTitle={detail.track_title} />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Reviews />
            {isLoggedIn &&
                <AddReview id={details && details[0] && details[0].list_id} />
            }
        </Container>
    )
};