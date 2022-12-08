import './index.css';
import Typography from '@mui/material/Typography';

function Home() {
    return (
        <div className='home'>
            <Typography className='title' variant="h1" gutterBottom>
                N E T
            </Typography>
            <Typography variant="h3" gutterBottom>
                Maybe the best music community
            </Typography>
        </div>
    );
}

export default Home;