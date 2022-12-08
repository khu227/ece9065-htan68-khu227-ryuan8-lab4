import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import { useDispatch, useSelector } from "react-redux";
import Link from '@mui/material/Link';
import PlayLists from '../components/playLists.js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CreateORALterList from './createOrAlterList.js';
import Popover from '@mui/material/Popover';
import AuthService from '../services/auth.service.js';

export default function ManageLists() {

    const [manageLists, setManageLists] = useState([]);
    // const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => { AuthService.getAllUserLists().then(res => { setManageLists(res) }) }, []);


    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const open = Boolean(anchorEl);

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 3 }}>
            <Typography component="h4" variant="h4">
                Manage Lists
            </Typography>
            {/* <Box align='right'>
                <Button variant="contained" onClick={handleClick}>
                    Create List
                </Button>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <CreateORALterList isCreate={true} />
                </Popover>
            </Box> */}
            <CreateORALterList isCreate={true} />
            <PlayLists lists={manageLists} isManage={true} />
        </Container>
    )
};