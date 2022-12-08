import Button from '@mui/material/Button';


export default function YoutubeButton(props) {
    
    const trackTitle = props.trackTitle;

    const handlePlay = () => {
        window.open('https://www.youtube.com/results?search_query='+trackTitle);
    };


    return (
        <Button variant="contained" color="success" onClick={handlePlay}>
            Play on Youtube
        </Button>
    );
};