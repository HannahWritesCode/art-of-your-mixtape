import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { playlist_id } from './App.js';
import { SongsList } from './components/Album';
import { playlistLength } from './PlaylistHeading';
import GetTrackItems from './components/GetTracks.js';
import Spinner from 'react-bootstrap/Spinner';

const axios = require('axios').default;

// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
const SongBreakdown = () => {

    const [albumSongs, setAlbumSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const sessionStorage = window.sessionStorage.getItem("playlist");

    const getTrackInfo = async() => {
        const songs = await GetTrackItems(playlist_id, 0, Math.ceil(playlistLength/100));
        setLoading(false);
        window.sessionStorage.setItem("playlist", JSON.stringify(songs));
        setAlbumSongs(songs);
    }

    useEffect(() => {
        if(sessionStorage != null) {
            setAlbumSongs(JSON.parse(sessionStorage));
            setLoading(false);
        }else{
            getTrackInfo();
        }
    }, [playlist_id]);
    
    return (
        <Container className='justify-content-md-center mt-5 mb-5'>
            <div className='SongBreakDown'>
                <h2 className="text-center">Song Breakdown</h2>
                {loading ? ( 
                    <Spinner className='text-center' animation="border" variant="dark"/>
                ) : (
                    <>
                    <SongsList albumSongs = {albumSongs}/>
                    <h3>{albumSongs.length}</h3>
                    </>
                )}
            </div>
        </Container>
    );
}

export default SongBreakdown;