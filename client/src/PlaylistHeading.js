import { useState, useEffect } from 'react';
import { playlist_id } from './App.js';
import { Container, Row, Col } from 'react-bootstrap';
import { msToHours } from './components/UnitConverter';
import Buttons from './components/Buttons';
import Spinner from "react-bootstrap/Spinner";

const axios = require('axios').default;

const PlaylistHeading = () => {

    const [playlistInfo, setPlaylistInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const playlistName = axios.get(`/playlist/${playlist_id}`);
        const playlistCover = axios.get(`/playlist/${playlist_id}/images`)
        const playlistTracks = axios.get(`/playlist/${playlist_id}/tracks`)
        setLoading(true);
        // errors to handle: 
        // 404 when playlist is not found / is private 
        axios.all([playlistName, playlistCover, playlistTracks])
            .then(axios.spread((...responses) => {
                let playlist = {
                    name: responses[0].data.name,
                    coverUrl: responses[1].data[0].url,
                    description: responses[0].data.description,
                    owner: responses[0].data.owner.display_name,
                    numberOfSongs: responses[2].data.total,
                    duration: msToHours(responses[2].data.items),
                    likes: responses[0].data.followers.total
                }
                setPlaylistInfo(playlist);
                setLoading(false);
            }))
            .catch(error => {
                console.log(error);
            })
    }, [playlist_id]);

    return <>
        <Container className="justify-content-md-center mt-5 mb-5">
            {loading ? (
                <Container className="text-center">
                    <Spinner animation="border" variant="dark"/>
                </Container>
            ):(
                    <Container className='playlist'>
                        <Row className='text-center'>
                            <Col>
                                <img
                                    alt="playlist_cover"
                                    src={playlistInfo.coverUrl}
                                    width="300"
                                    height="300"
                                    className='img-fluid shadow-2-strong'
                                />
                            </Col>
                            <Col className='pt-5'>
                                <h1>{playlistInfo.name}</h1>
                                <p>{playlistInfo.description}</p>
                                <p>{playlistInfo.owner} &bull; {playlistInfo.likes} likes &bull; {playlistInfo.numberOfSongs} Songs, {playlistInfo.duration}</p>
                            </Col>
                        </Row>
                        <Container className='justify-content-md-center mt-5 mb-5'>
                            <Buttons/>
                        </Container>
                </Container>
            )}
        </Container>

    </>
}

export default PlaylistHeading;