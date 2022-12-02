import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import {
    NavLink, useNavigate
} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/auth.js';

const pages = ['Track Searching', 'All Play-lists'];
const settings = ['Alter Password', 'Logout'];
const route = {
    'Track Searching': '/search',
    'All Play-lists': '/lists',
    'Administrator': '/admin'
}

// reference: https://mui.com/material-ui/react-app-bar/

function Header(props) {
    const userState = props.auth;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAdmin, isLoggedIn } = userState;
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const auth = useSelector(state => state.auth);

    // isAdmin && pages.push('Administrator');

    const pages = [
        'Track Searching', 'Public Play-lists',
        ...(
            isLoggedIn ?
            ['Manage Play-lists']
            : []
        ),
        ...(isAdmin ?
            ['Administrator']
            : [])
    ];


    console.log('isAdmain:' + isAdmin);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        // console.log(setting);
        setAnchorElUser(null);
    };

    const handleAlter = () => {
        navigate('/alter');
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        window.location.reload();
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AudiotrackIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Net
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                href={route[page]}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {isLoggedIn ?
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <Button
                                    variant="text"
                                    onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }}>
                                    <Typography textAlign="center">{
                                        auth &&
                                        auth.userInfo &&
                                        auth.userInfo.user &&
                                        auth.userInfo.user.name
                                    }</Typography>
                                </Button>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleAlter}>
                                    <Typography textAlign="center">Alter Password</Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        : <Box sx={{ flexGrow: 0 }}>
                            <Button variant='text' href='/signin' sx={{ color: 'white' }}>Sign in</Button>
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
