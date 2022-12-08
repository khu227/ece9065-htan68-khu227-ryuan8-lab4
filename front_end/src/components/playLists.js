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
import Popover from '@mui/material/Popover';

export default function PlayLists(props) {

    const lists = props.lists;
    const isManage = props.isManage || false;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickList = name => {
        dispatch({
            type: SET_LIST_NAME,
            payload: name
        });
        navigate('/listdetails');
    };

    const handleDelete = name => {
        AuthService.delteList(name);
        window.location.reload();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="left">Creator</TableCell>
                        <TableCell align="left">Total Play-time</TableCell>
                        <TableCell align="left">Numbers of tracks</TableCell>
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
                                <TableCell align="left">
                                    {list.user_name}
                                </TableCell>
                                <TableCell align="left">
                                    {list.total_time}
                                </TableCell>
                                <TableCell align="left">
                                    {list.count}
                                </TableCell>
                                {
                                    isManage &&
                                    <TableCell align="left">
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size='small'
                                            sx={{ mr: 2 }}
                                            onClick={handleClick}
                                        >
                                            <Popover
                                                open={open}
                                                anchorEl={anchorEl}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                            >
                                                <CreateORALterList isCreate={false} list={list}/>
                                            </Popover>
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size='small'
                                            onClick={handleDelete(list.list_name)}
                                        >
                                            Delete
                                        </Button>

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