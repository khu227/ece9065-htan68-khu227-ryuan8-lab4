import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


export default function Admin() {
    return (
        <Container component="main" maxWidth="lg" sx={{ mt: 3 }}>
            <Typography component="h4" variant="h4">
                Manage User
            </Typography>
        </Container>
    );
};