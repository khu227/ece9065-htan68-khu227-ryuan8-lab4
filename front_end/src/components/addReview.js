import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthService from '../services/auth.service';

export default function AddReview(props) {

    const id = props.id;
    const [rate, setRate] = useState('');
    const [review, setReview] = useState('');
    const [rateErr, setRateErr] = useState(false);
    const [reviewErr, setReviewErr] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        let err = false;
        if (!rate) {
            setRateErr(true);
            err = true;
        }
        if (!review) {
            setReviewErr(true);
            err = true;
        }
        if (err) {
            return;
        }
        else {
            AuthService.addReview(id, rate, review);
            window.location.reload();
        }
    };

    return (
        <Container component="main" sx={{ mt: 5 }} maxWidth="md">
            <FormControl>
                <Box component="form">
                    <Grid container>
                        <Grid align='left' item xs={4}>
                            <TextField
                                fullWidth
                                required
                                label="Rate (0-10)"
                                variant="outlined"
                                onChange={(event) => { setRate(event.target.value) }}
                                helperText={rateErr ? 'empty!' : ''}
                                error={rateErr}
                            />
                        </Grid>
                        <Grid xs={12} sx={{ mt: 3 }}>
                            <TextField
                                fullWidth
                                required
                                label='review'
                                rows='3'
                                multiline='true'
                                onChange={event => { setReview(event.target.value) }}
                                helperText={reviewErr ? 'empty!' : ''}
                                error={reviewErr}
                            >
                            </TextField>
                        </Grid>
                        <Grid>
                            <Button
                                variant="contained"
                                sx={{ mt: 3 }}
                                onClick={(e)=>handleSubmit(e)}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </FormControl>
        </Container>
    );
};