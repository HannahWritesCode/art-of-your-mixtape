import { useEffect, useState } from "react";
import { Container, InputGroup, FormControl } from 'react-bootstrap';
import { pitchConvertion, modeConvertion, signitureConvertion, msToMinutes } from "../helper/UnitConverter";
import '../CSS/Breakdown.css';

// Fix search by artist
const Playlist = (albumSongs) => {
    
    const [songsList, setSongsList] = useState({});
    const [playList, setPlayList] = useState([]);
    const [searchList, setSearchList] = useState('');

    const trackSelected = (track) => {
        setSongsList(songsList => ({
            ...songsList,
            ...track
        }));
    };

    useEffect(() => {

        const setValues = async() => {
            setPlayList(albumSongs.albumSongs);
            trackSelected(albumSongs.albumSongs[0]);
        }
        
        setValues();
        
    },[albumSongs]);

    return(
        <Container id="info-seperator">
            <Container className="selectedSong">
                <>
                    <Container id="grid-format" className='text-left mt-4 mb-4'>
                        <Container className='mt-4 mb-4'>
                            <img
                            alt="playlist_cover"
                            src={songsList.imageUrl}
                            width="300"
                            height="300"
                            className='img-fluid shadow-2-strong'/>
                        </Container>
                        <Container className='mt-4 mb-4'>
                            <h2>{songsList.songName}</h2>
                            <p>{songsList.artistName}</p>
                            <p>{songsList.albumName}</p>
                            <p>{songsList.release}</p>
                        </Container>
                    </Container>
                    <Container className='text-left mt-4 mb-4' id="grid-format">
                        <p>Loudness: {songsList.loudness} db</p>
                        <p>Acousticness: {songsList.acousticness}</p>
                        <p>Valence: {songsList.valence}</p>
                        <p>Tempo: {songsList.tempo}</p>
                        <p>Time Signature: {signitureConvertion(songsList.timeSignature)}</p>
                        <p>Duration: {msToMinutes(songsList.duration)}</p>
                        <p>Mode: {modeConvertion(songsList.mode)}</p>
                        <p>Key: {pitchConvertion(songsList.key)}</p>
                        <p>Danceability: {songsList.danceability}</p>
                        <p>Energy: {songsList.energy}</p>
                    </Container>
                </>
            </Container>
            <Container className="songsList">
                <InputGroup className="mt-3 mb-3">
                    <FormControl
                        placeholder="Search Song or Artist"
                        aria-label="userInput"
                        aria-describedby="basic-addon2"
                        title="Playlist search bar"
                        onChange={(e) => setSearchList(e.target.value)}
                        type="text"
                        id='userInput'
                        name="userInput"
                    />
                </InputGroup>
                <Container style={{ height: "500px", overflowY: "scroll"}}>
                    {playList.filter((track) => {
                        return searchList.toLowerCase() === ''
                        ? track
                        : track.songName.toLowerCase().includes(searchList.toLowerCase()) || track.artistNames.toLowerCase().includes(searchList.toLowerCase())
                    }).map((track,i) => {
                        return(
                            <Container onClick={() => trackSelected(track)} className="mt-4 mb-4" key={i+1} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "2px", border: "1px solid black"}}>
                                <Container className="imageContainer mt-4 mb-4">
                                    <img
                                    alt="playlist_cover"
                                    src={track.imageUrl}
                                    width="80"
                                    height="80"
                                    className='img-fluid shadow-2-strong'/>
                                </Container>
                                <Container className="statsContainer mt-4 mb-4">
                                    <p>{track.songName}</p>
                                    <p>{track.artistName}</p>
                                    <p>TrackNumber: {i+1}</p>
                                </Container>
                            </Container>
                        )
                    })}
                </Container>
            </Container>
        </Container>
    )
};

export default Playlist;