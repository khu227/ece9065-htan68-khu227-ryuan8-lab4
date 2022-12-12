import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Policy() {

    const [policyName, setPolicyName] = useState('security and privacy policy');
    const [text, setText] = useState('');

    const handleSubmit = () => {

    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Box sx={{ minWidth: 120 }}>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography component="h6" variant="h6">
                            Operation
                        </Typography>
                    </Grid>
                    <Grid item xs={9} align='left'>
                        <Select
                            sx={{ minWidth: 120 }}
                        >
                            <MenuItem value={10}>Create</MenuItem>
                            <MenuItem value={20}>Update</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography component="h6" variant="h6">
                            Type
                        </Typography>
                    </Grid>
                    <Grid item xs={9} align='left'>
                        <Select
                            value={policyName}
                            sx={{ minWidth: 120 }}
                            onChange={e => { setPolicyName(e.target.value) }}
                        >
                            <MenuItem value={'security and privacy policy'}>security and privacy policy</MenuItem>
                            <MenuItem value={'acceptable use policy'}>acceptable use policy</MenuItem>
                            <MenuItem value={'DMCA notice & takedown policy'}>DMCA notice & takedown policy</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                        <TextField
                            required
                            label='policy'
                            multiline
                            rows={20}
                            fullWidth
                            value={text}
                            onChange={e => { setText(e.target.value) }}
                        />
                    </Grid>
                    <Grid item sx={{ mt: 3 }}>
                        <Button variant='contained' onClick={()=>handleSubmit()}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};