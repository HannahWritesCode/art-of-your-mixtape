import { useState, useEffect } from 'react';
import { playlist_id } from './App.js';
import { Container, Row, Col } from 'react-bootstrap';

const axios = require('axios').default;

const msToHours = (track) => {

    var time = 0;
    track.forEach(element => {
        time += element.track.duration_ms;
    });

    var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((time / (1000 * 60)) % 60);

    return hours + " hr " + minutes + " min"
}

const PlaylistHeading = () => {

    const [playlistName, setPlaylistName] = useState('');
    const [playlistCoverUrl, setPlaylistCover] = useState('');
    const [playlistDescription, setPlaylistDescription] = useState('');
    const [playlistOwner, setPlaylistOwner] = useState('');
    const [playlistNumSongs, setPlaylistNumSongs] = useState('');
    const [playlistDuration, setPlaylistDuration] = useState('');
    const [playlistLikes, setPlaylistLikes] = useState('');

    useEffect(() => {

        const playlistName = axios.get(`/playlist/${playlist_id}`);
        const playlistCover = axios.get(`/playlist/${playlist_id}/images`)
        const playlistTracks = axios.get(`/playlist/${playlist_id}/tracks`)
        console.log(playlistCover);

        // errors to handle: 
        // 404 when playlist is not found / is private 

        axios.all([playlistName, playlistCover, playlistTracks])
            .then(axios.spread((...responses) => {
                console.log('response received from spotify api')
                setPlaylistName(responses[0].data.name);
                setPlaylistLikes(responses[0].data.followers.total);
                setPlaylistDescription(responses[0].data.description);
                setPlaylistOwner(responses[0].data.owner.display_name);
                setPlaylistCover(responses[1].data[0].url);
                setPlaylistNumSongs(responses[2].data.total);
                setPlaylistDuration(msToHours(responses[2].data.items));
            }))
            .catch(error => {
                console.log(error);
            })
    }, [playlist_id]);

    return <>
        <Container className="justify-content-md-center mt-5 mb-5">
            <Row className='text-center'>
                <Col>
                    <img
                        alt="playlist_cover"
                        src={playlistCoverUrl}
                        width="300"
                        height="300"
                        className='img-fluid shadow-2-strong'
                    />
                </Col>
                <Col className='pt-5'>
                    <h1>{playlistName}</h1>
                    <p>{playlistDescription}</p>
                    <p>{playlistOwner} &bull; {playlistLikes} likes &bull; {playlistNumSongs} Songs, {playlistDuration}</p>
                </Col>
            </Row>
        </Container>
    </>
}

export default PlaylistHeading;