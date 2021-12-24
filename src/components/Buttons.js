import { useState } from 'react';
import SongBreakdown from './SongBreakdown';
import Analysis from './Analysis';
import {Button, Stack, Container} from 'react-bootstrap';


const Buttons = () => {

    const [showSongBreakdown, setShowSongBreakdown] = useState(false)
    const [showAnalysis, setShowAnalysis] = useState(false)

    return <>
        <Container>
            <Stack gap={2} className="col-md-5 mx-auto">
                <Button variant="outline-secondary" onClick={()=>
                    setShowSongBreakdown(true) & setShowAnalysis(false)}>Song Breakdown</Button>
                <Button variant="outline-secondary" onClick={()=>
                    setShowAnalysis(true) & setShowSongBreakdown(false)}>Analysis</Button>
            </Stack>
        </Container>
        <Container>
            {showSongBreakdown && <SongBreakdown/>}
                {showAnalysis && <Analysis/>}
        </Container>
    </>
}

export default Buttons;