import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import openService from '../services/open.service';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AdminService from '../services/admin.service';

export default function Reviews() {

    const [reviews, setReviews] = useState([]);
    const openState = useSelector(state => state.openState);
    const auth = useSelector(state => state.auth);
    // const isLoggedIn = auth.isLoggedIn;
    const isAdmin = auth.userInfo && auth.userInfo.user && auth.userInfo.user.is_admin;
    const { listName } = openState;

    useEffect(() => { openService.getListReviews(listName).then(res => { setReviews(res) }) }, []);

    const handleHide = (name, id) => {
        AdminService.setReviewDisable(name, id);
        window.location.reload();
    };

    const handleRecover = (name, id) => {
        AdminService.setReviewRecover(name, id);
        window.location.reload();
    };

    return reviews.map(review => ((!review.hidden || isAdmin) ?
        <Container sx={{ mt: 2 }}>
            <Divider textAlign="left">{review.user_name}</Divider>
            <Box align='left' sx={{ mt: 1 }}>
                <Typography component="h8" variant="h8">
                    rate: {review.rate}
                </Typography>
            </Box>
            <Box align='left' sx={{ mt: 1 }}>
                <Typography component="h8" variant="h8">
                    review: {review.review}
                </Typography>
            </Box>
            {isAdmin ? review.hidden ?
                <Box align='left' sx={{ mt: 1 }} >
                    <Button variant="contained" color="success"
                        size='small'
                        onClick={() => handleRecover(listName, review.id)}>
                        Recover
                    </Button>
                </Box>
                :
                <Box align='left' sx={{ mt: 1 }}>
                    <Button variant="contained" color="error"
                        size='small'
                        onClick={() => handleHide(listName, review.id)}>
                        Hide
                    </Button>
                </Box>
                : ''
            }
        </Container>
        : ''
    ));
};