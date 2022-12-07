import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Paper from '@mui/material/Paper';
import { SET_LIST_NAME } from '../actions/types.js';

export default function PlayLists(props) {

    const lists = props.lists;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickList = name => {
        console.log(name);
        dispatch({
            type: SET_LIST_NAME,
            payload: name
        });
        navigate('/listdetails');
    };

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
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
                            lists.map(list => (
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
            </TableContainer>
    );
};