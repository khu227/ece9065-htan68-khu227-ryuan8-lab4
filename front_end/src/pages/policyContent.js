import OpenService from "../services/open.service";
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function PolicyContent() {

    const [sapp, setSapp] = useState('');
    const [aup, setAup] = useState('');
    const [dntp, setDntp] = useState('');

    useEffect(() => {
        OpenService.getPolicy('security and privacy policy').then(res => setSapp(res));
        OpenService.getPolicy('acceptable use policy').then(res => setAup(res));
        OpenService.getPolicy('DMCA notice & takedown policy').then(res => setDntp(res));
    }, [])

    return (
        <Container>
            <Typography variant="h3">
                Security and privacy policy
            </Typography>
            <Typography paragraph='true' align='left' variant="body">
                {sapp}
            </Typography>
            <Typography variant="h3">
                Acceptable use policy
            </Typography>
            <Typography paragraph='true' align='left' variant="body">
                {aup}
            </Typography>
            <Typography variant="h3">
                DMCA notice & takedown policy
            </Typography>
            <Typography paragraph='true' align='left' variant="body">
                {dntp}
            </Typography>
        </Container>

    );
};