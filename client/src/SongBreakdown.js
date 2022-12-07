import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { playlist_id } from './App.js';
import { SongsList } from './components/Album';
import Spinner from 'react-bootstrap/Spinner';

const axios = require('axios').default;

// https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
const SongBreakdown = () => {

    const [albumSongs, setAlbumSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const sessionStorage = window.sessionStorage.getItem("playlist");

    const getSongs = async() => {
        setLoading(true);
        axios.get(`/playlist/${playlist_id}/tracks`)
            .then(async (res) => {         
                if(res.data.items !== undefined){
                    const res2 = await Promise.all(res.data.items.filter((val) => {
                        if(val.track === undefined || val.track.id == null) return false;
                        return true;
                    }).map(async(val) => {
                        let audio = await axios.get(`/track/${val.track.id}/audio-features`);
                        val["audio_stats"] = audio.data;
                        return val;
                    }));
                    setAlbumSongs(res2);
                    window.sessionStorage.setItem("playlist", JSON.stringify(res2));
                    setLoading(false);
                };
            });
    };

    useEffect(() => {
        if(sessionStorage != null) {
            setAlbumSongs(JSON.parse(sessionStorage));
            setLoading(false);
        }else{
            getSongs();
        }
        
    }, [playlist_id]);
    
    return (
        <Container className='justify-content-md-center mt-5 mb-5'>
            <div className='SongBreakDown'>
                <h2 className="text-center">Song Breakdown</h2>
                {loading ? ( 
                    <Spinner className='text-center' animation="border" variant="dark"/>
                ) : (
                    <SongsList albumSongs = {albumSongs}/>
                )}
            </div>
        </Container>
    );
}

export default SongBreakdown;