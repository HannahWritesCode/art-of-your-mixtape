import React, { useEffect, useState } from "react";
import '../CSS/Breakdown.css'
import { Container, InputGroup, FormControl } from 'react-bootstrap';
import { pitchConvertion, modeConvertion, signitureConvertion, msToMinutes } from "./UnitConverter";

// Fix search by artist
const SongsList = (albumSongs) => {
    
    const [songsList, setSongsList] = useState({});
    const [playList, setPlayList] = useState([]);
    const [searchList, setSearchList] = useState("");

    const trackSelected = (track) => {
        setSongsList(songsList => ({
            ...songsList,
            ...track.track_info
        }));
    };

    const fullArtist = (artist) => {
        let names = "";
        artist.map((val => {
            return names += (val.name + ", ");
        }))
        names = names.substring(0, names.length - 2);
        return names;
    }

    useEffect(() => {
        const ModifyList = async() => {
            const list = await Promise.all(albumSongs.albumSongs.map(async(val) => {
                const images = val.track.album.images.map((val) => {return val.url});
                const artistNames = fullArtist(val.track.artists);
                const year = new Date(val.track.album.release_date)
                let track_info = {
                    songId: val.track.id,
                    albumName: val.track.album.name,
                    songName: val.track.name,
                    artistName: artistNames,
                    release: year.getFullYear(),
                    imageUrl: images[1],
                    danceability: val.audio_stats.danceability,
                    energy: val.audio_stats.energy,
                    loudness: val.audio_stats.loudness,
                    acousticness: val.audio_stats.acousticness,
                    valence: val.audio_stats.valence,
                    tempo: val.audio_stats.tempo,
                    timeSignature: val.audio_stats.time_signature,
                    duration: val.audio_stats.duration_ms,
                    mode: val.audio_stats.mode,
                    key: val.audio_stats.key
                };
                val["track_info"] = track_info;
                return val;
            }));
            setPlayList(list);
            trackSelected(list[0])
        }

        ModifyList();
        
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
                        if(searchList === "") {
                            return(track);
                        }else if(track.track_info.songName.toLowerCase().includes(searchList.toLowerCase()) || track.track_info.artistName[0].toLowerCase().includes(searchList.toLowerCase())) {
                            return(track);
                        }
                    }).map((track,i) => {
                        return(
                            <Container onClick={() => trackSelected(track)} className="mt-4 mb-4" key={i+1} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "2px", border: "1px solid black"}}>
                                <Container className="imageContainer mt-4 mb-4">
                                    <img
                                    alt="playlist_cover"
                                    src={track.track_info.imageUrl}
                                    width="80"
                                    height="80"
                                    className='img-fluid shadow-2-strong'/>
                                </Container>
                                <Container className="statsContainer mt-4 mb-4">
                                    <p>{track.track_info.songName}</p>
                                    <p>{track.track_info.artistName}</p>
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

export { SongsList };