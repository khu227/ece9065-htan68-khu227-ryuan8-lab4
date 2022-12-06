import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import openService from '../services/open.service';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Reviews() {

    const [reviews, setReviews] = useState([]);
    const openState = useSelector(state => state.openState);
    const { listName } = openState;

    useEffect(() => { openService.getListReviews(listName).then(res => { setReviews(res) }) }, []);

    return reviews.map(review => (
        <Container sx={{ mt: 2 }}>
            <Divider textAlign="left">{review.user_name}</Divider>
            <Box align='left' sx={{mt:1}}>
                <Typography component="h8" variant="h8">
                    rate: {review.rate}
                </Typography>
            </Box>
            <Box align='left' sx={{mt:1}}>
                <Typography component="h8" variant="h8">
                    review: {review.review}
                </Typography>
            </Box>

        </Container>
    ));
};