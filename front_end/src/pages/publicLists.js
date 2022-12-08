import React, { useState, useEffect } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import TableContainer from '@mui/material/TableContainer';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import { useDispatch, useSelector } from "react-redux";
import OpenService from '../services/open.service.js';
import Link from '@mui/material/Link';
// import { SET_LIST_NAME } from '../actions/types.js';
// import { useNavigate } from 'react-router-dom';
import PlayLists from '../components/playLists.js';

export default function PublicLists() {

    const [publicLists, setPublicLists] = useState([]);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    useEffect(() => { OpenService.getPublicLists().then(res => { setPublicLists(res) }) }, []);

    // const handleClickList = name => {
    //     console.log(name);
    //     dispatch({
    //         type: SET_LIST_NAME,
    //         payload: name
    //     });
    //     navigate('/listdetails');
    // };

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
            <Typography component="h4" variant="h4">
                Public Lists
            </Typography>
            <PlayLists lists={publicLists}/>
            {/* <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Creator</TableCell>
                            <TableCell align="left">Total Play-time</TableCell>
                            <TableCell align="left">Numbers of tracks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            publicLists.map(list => (
                                <TableRow
                                    key={list.list_name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">
                                        <Link
                                            component="button"
                                            variant="body2"
                                            onClick={() =>
                                                handleClickList(list.list_name)
                                            }
                                        >
                                            {list.list_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">
                                        {list.user_name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {list.total_time}
                                    </TableCell>
                                    <TableCell align="left">
                                        {list.count}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer> */}
        </Container>
    )
};