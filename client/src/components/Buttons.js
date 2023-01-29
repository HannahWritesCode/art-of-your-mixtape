import { useState } from 'react';
import { Button, Stack, Container } from 'react-bootstrap';
import SongBreakdown from './SongBreakdown';
import Analysis from './Analysis';

const Buttons = (id) => {

    const [showSongBreakdown, setShowSongBreakdown] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const playlistId = id.playlistId;
    const playlistLength = id.playlistLength;

    return <>
        <Container>
            <Stack gap={2} className="col-md-5 mx-auto">
                <Button variant="outline-secondary" onClick={() =>
                    setShowSongBreakdown(true) & setShowAnalysis(false)}>Song Breakdown</Button>
                <Button variant="outline-secondary" onClick={() =>
                    setShowAnalysis(true) & setShowSongBreakdown(false)}>Analysis</Button>
            </Stack>
        </Container>
        <Container>
            {showSongBreakdown && <SongBreakdown playlistId={playlistId} playlistLength={playlistLength}/>}
            {showAnalysis && <Analysis playlistId={playlistId}/>}
        </Container>
    </>
}

export default Buttons;