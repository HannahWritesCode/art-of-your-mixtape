import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { playlist_id } from './App.js';
import { msToMinutes } from './components/TimeConverter.js';
import { Carousel } from 'react-bootstrap';

const axios = require('axios').default;

const SongBreakdown = () => {

    const [albumSongs, setAlbumSongs] = useState([]);

    const getSongs = async() => {
        axios.get(`/playlist/${playlist_id}/tracks`)
            .then(async (res) => {                
                if(res.data.items != undefined){
                    const res2 = await Promise.all(res.data.items.map(async(val) => {
                        let audio = await axios.get(`/track/${val.track.id}/audio-features`);
                        val["audio_stats"] = audio.data;
                        return val;
                    }));
                    setAlbumSongs(res2);
                };
            });
    };

    useEffect(() => {
        getSongs();
    }, [playlist_id]);
    
    // TODO: fix design of carousel, add lettering to keys and mode, convert duration from ms to minutes
    return (
        <div className='SongCarousel'>
            <h2 className="text-center">Song Breakdown</h2>
            <Container className='justify-content-md-center mt-5 mb-5'>
                <Carousel indicators={false} variant="dark">
                    {albumSongs.map((value) => {
                        if(value.track.id != null) {
                            const images = value.track.album.images.map((val) => {return val.url});
                            const artistNames = value.track.artists.map((val) => {return val.name+", "});
                            return(
                                <Carousel.Item key={value.track.name}>
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
            </Container>
        </div>
    );
}

export default SongBreakdown;