import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';

const SongsList = (albumSongs) => {
    
    const [songsList, setSongsList] = useState({});
    const [playList, setPlayList] = useState([]);

    const trackSelected = (track) => {
        setSongsList(songsList => ({
            ...songsList,
            ...track.track_info
        }));
    }

    useEffect(() => {
        const ModifyList = async() => {
            const list = await Promise.all(albumSongs.albumSongs.map(async(val) => {
                const images = val.track.album.images.map((val) => {return val.url});
                const artistNames = val.track.artists.map((val) => {return val.name+", "});
                let track_info = {
                    songId: val.track.id,
                    albumName: val.track.album.name,
                    songName: val.track.name,
                    artistName: artistNames,
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
        }

        ModifyList();
        
    },[albumSongs]);

    return(
        <Container style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "2px"}}>
            <Container className="selectedSong">
                <>
                    <Container className='text-center mt-4 mb-4'>
                        <img
                            alt="playlist_cover"
                            src={songsList.imageUrl}
                            width="300"
                            height="300"
                            className='img-fluid shadow-2-strong'/>
                    </Container>
                    <Container className='text-center mt-4 mb-4' style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "2px"}}>
                        <p>Loudness: {songsList.loudness}</p>
                        <p>Acousticness: {songsList.acousticness}</p>
                        <p>Valence: {songsList.valence}</p>
                        <p>Tempo: {songsList.tempo}</p>
                        <p>Time Signature: {songsList.timeSignature}</p>
                        <p>Duration: {songsList.duration}</p>
                        <p>Mode: {songsList.mode}</p>
                        <p>Key: {songsList.key}</p>
                        <p>Danceability: {songsList.danceability}</p>
                        <p>Energy: {songsList.energy}</p>
                    </Container>
                </>
            </Container>
            <Container className="songsList">
                <Container style={{ height: "500px", overflowY: "scroll"}}>
                    {playList.map((track) => {
                        return(
                            <Container onClick={() => trackSelected(track)} className="mt-4 mb-4" key={track.track_info.songId} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: "2px", border: "1px solid black"}}>
                                <Container className="imageContainer">
                                    <img
                                    alt="playlist_cover"
                                    src={track.track_info.imageUrl}
                                    width="80"
                                    height="80"
                                    className='img-fluid shadow-2-strong'/>
                                </Container>
                                <Container className="statsContainer">
                                    <p>{track.track_info.songName}</p>
                                    <p>{track.track_info.artistName}</p>
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