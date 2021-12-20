import { useState } from 'react';
import SongBreakdown from './SongBreakdown'
import Analysis from './Analysis'

const Buttons = () => {

    const [showSongBreakdown, setShowSongBreakdown] = useState(false)
    const [showAnalysis, setShowAnalysis] = useState(false)

    return <>
        <button onClick={()=>
            setShowSongBreakdown(true) & setShowAnalysis(false)}>song breakdown</button>
        <button onClick={()=>
            setShowAnalysis(true) & setShowSongBreakdown(false)}>analysis</button>
        {showSongBreakdown && <SongBreakdown/>}
        {showAnalysis && <Analysis/>}
    </>
}

export default Buttons;