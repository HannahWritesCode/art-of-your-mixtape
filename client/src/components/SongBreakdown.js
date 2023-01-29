import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Playlist from './PlaylistBreakdown';
import GetPlaylistInfo from '../helper/GetPlaylistInfo.js';
import Spinner from 'react-bootstrap/Spinner';

// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
const SongBreakdown = (id) => {

    const [albumSongs, setAlbumSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const playlistId = id.playlistId;
    const playlistLength = id.playlistLength;

    useEffect(() => {
        const sessionStorage = window.sessionStorage.getItem("playlist");
        setLoading(true);

        const getTrackInfo = async() => {
            const songs = await GetPlaylistInfo(playlistId, 0, Math.ceil(playlistLength/100));
            setLoading(false);
            window.sessionStorage.setItem("playlist", JSON.stringify(songs));
            setAlbumSongs(songs);
        }

        if(sessionStorage != null) {
            setAlbumSongs(JSON.parse(sessionStorage));
            setLoading(false);
        }else{
            getTrackInfo();
        }

    }, [playlistId, playlistLength])

    
    return (
        <Container className='justify-content-md-center mt-5 mb-5'>
            <div className='SongBreakDown'>
                <h2 className="text-center">Song Breakdown</h2>
                {loading ? ( 
                    <Spinner className='text-center' animation="border" variant="dark"/>
                ) : (
                    <Playlist albumSongs = {albumSongs}/>
                )}
            </div>
        </Container>
    );
}

export default SongBreakdown;