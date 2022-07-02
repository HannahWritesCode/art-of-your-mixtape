import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { playlist_id } from './App.js';

const axios = require('axios').default;

const SongBreakdown = () => {

    const [playlistTracks, setPlaylistTrack] = useState('');
    const [playlistCoverUrl, setPlaylistCover] = useState('');

    useEffect(() => {

        const playlistTracks = axios.get(`/playlist/${playlist_id}/tracks`);

        axios.all([playlistTracks])
            .then(axios.spread((...responses) => {
                setPlaylistTrack(responses[0].data.items[0]);
                setPlaylistCover(responses[0].data.items[0].track.album.images[0].url);
            }))
            .catch(error => {
                console.log(error);
            })
    }, [playlist_id]);

    return <>
        <h2 className="text-center">Song Breakdown</h2>
        <Container className="justify-content-md-center mt-5 mb-5">
            <Row className='text-center'>
                <Col>
                    <h1>Prev</h1>
                </Col>
                <Col>
                    <img
                        alt="playlist_cover"
                        src={playlistCoverUrl}
                        width="300"
                        height="300"
                        className='img-fluid shadow-2-strong'
                    />
                </Col>
                <Col>
                    <h1>Next</h1>
                </Col>
            </Row>
        </Container>
    </>
}

export default SongBreakdown;