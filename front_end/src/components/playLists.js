import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Paper from '@mui/material/Paper';
import { SET_LIST_NAME } from '../actions/types.js';
import Button from '@mui/material/Button';
import AuthService from '../services/auth.service.js';
import CreateORALterList from '../pages/createOrAlterList.js';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PlayLists(props) {

    const lists = props.lists || [];
    const isManage = props.isManage || false;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickList = name => {
        dispatch({
            type: SET_LIST_NAME,
            payload: name
        });
        navigate('/listdetails/' + name);
    };

    const handleDelete = name => {
        AuthService.delteList(name);
        window.location.reload();
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        {!isManage && <TableCell align="left">Creator</TableCell>}
                        <TableCell align="left">Total Play-time</TableCell>
                        <TableCell align="left">Numbers of tracks</TableCell>
                        {isManage && <TableCell align="left">Visibility</TableCell>}
                        {isManage && <TableCell align="left">Operation</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        lists && lists.map(list => (
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
                                {!isManage &&
                                    <TableCell align="left">
                                        {list.user_name}
                                    </TableCell>
                                }
                                <TableCell align="left">
                                    {list.total_time}
                                </TableCell>
                                <TableCell align="left">
                                    {list.count}
                                </TableCell>
                                {
                                    isManage &&
                                    <TableCell align="left">
                                        {list.public ? 'Public' : 'Private'}
                                    </TableCell>
                                }
                                {
                                    isManage &&

                                    <TableCell align="left">
                                        <Grid container>
                                            <Grid item>
                                                <CreateORALterList isCreate={false} list={list} />
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size='small'
                                                    onClick={handleClickOpen}
                                                >
                                                    Delete
                                                </Button>
                                                <Dialog
                                                    open={open}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Warning"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            You would delete your list!
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                        <Button onClick={() => handleDelete(list.list_name)} autoFocus>
                                                            Confirm
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};