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
// import { useDispatch, useSelector } from "react-redux";
import OpenService from '../services/open.service.js';
import Link from '@mui/material/Link';
import PlayLists from '../components/playLists.js';

export default function PublicLists() {

    const [publicLists, setPublicLists] = useState([]);

    useEffect(() => { OpenService.getPublicLists().then(res => { setPublicLists(res) }) }, []);

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
            <Typography component="h4" variant="h4">
                Manage Lists
            </Typography>
            <PlayLists lists={publicLists}/>
        </Container>
    )
};