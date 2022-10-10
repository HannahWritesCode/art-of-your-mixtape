import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';

const SongsList = (albumSongs) => {

    const [playList, setPlayList] = useState([]);
    const [songsList, setSongsList] = useState({
        songId:'',
        albumName:'',
        songName:'',
        artistName:'',
        imageUrl:'',
        danceability:'',
        energy:'', 
        loudness:'', 
        acousticness:'', 
        valence:'', 
        tempo:'',
        timeSignature:'',
        duration:'',
        mode:'', 
        key:''
    });

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

    const trackSelected = (track) => {
        let selectedTrack = {
            songId: track.track_info.id,
            albumName: track.track_info.albumName,
            songName: track.track_info.songName,
            artistName: track.track_info.artistName,
            imageUrl: track.track_info.imageUrl,
            danceability: track.track_info.danceability,
            energy: track.track_info.energy,
            loudness: track.track_info.loudness,
            acousticness: track.track_info.acousticness,
            valence: track.track_info.valence,
            tempo: track.track_info.tempo,
            timeSignature: track.track_info.timeSignature,
            duration: track.track_info.duration,
            mode: track.track_info.mode,
            key: track.track_info.key
        };
        setSongsList(songsList => ({
            ...songsList,
            ...selectedTrack
        }));
    }

    useEffect(() => {
        ModifyList();
        if(playList[0] != undefined) {
            trackSelected(playList[0]);
        }
        
    },[albumSongs]);

    return(
        <Container>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <Container className='text-center mt-4 mb-4'>
                                <img
                                    alt="playlist_cover"
                                    src={songsList.imageUrl}
                                    width="300"
                                    height="300"
                                    className='img-fluid shadow-2-strong'/>
                            </Container>
                        </Col>
                    </Row>
                    <Container className='text-center mt-4 mb-4'>
                        <Row>
                            <Col>
                                <p>Loudness: {songsList.loudness}</p>
                            </Col>
                            <Col>
                                <p>Acousticness: {songsList.acousticness}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Valence: {songsList.valence}</p>
                            </Col>
                            <Col>
                                <p>Tempo: {songsList.tempo}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Time Signature: {songsList.timeSignature}</p>
                            </Col>
                            <Col>
                                <p>Duration: {songsList.duration}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Mode: {songsList.mode}</p>
                            </Col>
                            <Col>
                                <p>Key: {songsList.key}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Danceability: {songsList.danceability}</p>
                            </Col>
                            <Col>
                                <p>Energy: {songsList.energy}</p>
                            </Col>
                        </Row>
                    </Container>
                 </Col>
                 <Col>
                    <Container style={{ height: "500px", overflowY: "scroll", border: "5px solid black"}}>
                        {playList.map((track) => {
                            return(
                                <Container onClick={() => trackSelected(track)} className="mt-4 mb-4" key={track.track_info.songId}>
                                    <Row>
                                        <Col>
                                            <img
                                            alt="playlist_cover"
                                            src={track.track_info.imageUrl}
                                            width="80"
                                            height="80"
                                            className='img-fluid shadow-2-strong'/>
                                        </Col>
                                        <Col>
                                            <p>{track.track_info.songName}</p>
                                            <p>{track.track_info.artistName}</p>
                                        </Col>
                                    </Row>
                                </Container>
                            )
                        })}
                    </Container>
                 </Col>
            </Row>
        </Container>
    )
};

const SongsCar = (albumSongs) => {
    return(               
        <Carousel indicators={false} variant="dark">
            {albumSongs.albumSongs.map((value) => {
                if(value.track.id != null) {
                    const images = value.track.album.images.map((val) => {return val.url});
                    const artistNames = value.track.artists.map((val) => {return val.name+", "});
                    return(
                        <Carousel.Item key={value.track.id}>
                            <Row>
                                <Col>
                            <img
                                alt="playlist_cover"
                                src={images[1]}
                                width="400"
                                height="400"
                                className='img-fluid shadow-2-strong'/>
                                </Col>
                            <br></br>
                            <Col>
                            <Carousel.Caption>
                                <Row>
                                    <Col>
                                    <p>{value.track.name}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>{artistNames}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>{value.track.album.name}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Danceability: {value.audio_stats.danceability}</p>
                                    </Col>
                                    <Col>
                                        <p>Energy: {value.audio_stats.energy}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Loudness: {value.audio_stats.loudness}</p>
                                    </Col>
                                    <Col>
                                        <p>Acousticness: {value.audio_stats.acousticness}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Valence: {value.audio_stats.valence}</p>
                                    </Col>
                                    <Col>
                                        <p>Tempo: {value.audio_stats.tempo}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Time Signature: {value.audio_stats.time_signature}</p>
                                    </Col>
                                    <Col>
                                        <p>Duration: {value.audio_stats.duration_ms}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>Mode: {value.audio_stats.mode}</p>
                                    </Col>
                                    <Col>
                                        <p>Key: {value.audio_stats.key}</p>
                                    </Col>
                                </Row>
                            </Carousel.Caption>
                            </Col>
                            </Row>
                        </Carousel.Item>
                    )
                }   
            })}
        </Carousel>
    )
}

export { SongsCar, SongsList };