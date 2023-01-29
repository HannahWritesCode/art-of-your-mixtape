import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GetPlaylistHeader from '../helper/GetPlaylistHeader';
import Buttons from './Buttons';
import Spinner from "react-bootstrap/Spinner";

const PlaylistHeader = (id) => {

    const [playlistInfo, setPlaylistInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [playlistLength, setPlaylistLength] = useState(0);
    const playlistId = id.playlistId;

    useEffect(() => {
        setLoading(true);
        const setHeader = async() => {
            const headerList = await GetPlaylistHeader(playlistId);
            setPlaylistInfo(headerList);
            setPlaylistLength(headerList.numberOfSongs);
            setLoading(false);
        }

        setHeader();
    }, [playlistId]);

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
                            <Buttons playlistId={playlistId} playlistLength={playlistLength}/>
                        </Container>
                </Container>
            )}
        </Container>

    </>
}

export default PlaylistHeader;