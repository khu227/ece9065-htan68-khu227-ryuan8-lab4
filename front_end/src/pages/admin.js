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
import { getAllUsers } from '../actions/admin.js';
import { useDispatch, useSelector } from "react-redux";
import AdminButton from '../components/adminButton.js';
import ActivateButton from '../components/activateButton.js';

export default function Admin() {

    const dispatch = useDispatch();

    useEffect(() => { getAllUsers(dispatch) }, []);

    const users = useSelector(state => state.nonAdminUsers);


    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 3 }}>
            <Typography component="h4" variant="h4">
                Manage User
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell align="left">Set Admin</TableCell>
                            <TableCell align="left">Set Activation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => (
                                <TableRow
                                    key={user}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{user}</TableCell>
                                    <TableCell align="left">
                                        <AdminButton user={user}></AdminButton>
                                    </TableCell>
                                    <TableCell align="left">
                                        <ActivateButton activate={true}></ActivateButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};