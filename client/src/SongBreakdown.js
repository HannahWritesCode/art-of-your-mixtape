import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { playlist_id } from './App.js';
import { SongsList } from './components/Album';
import Spinner from 'react-bootstrap/Spinner';

const axios = require('axios').default;

const SongBreakdown = () => {

    const [albumSongs, setAlbumSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSongs = async() => {
        setLoading(true);
        axios.get(`/playlist/${playlist_id}/tracks`)
            .then(async (res) => {           
                if(res.data.items !== undefined){
                    const res2 = await Promise.all(res.data.items.map(async(val) => {
                        let audio = await axios.get(`/track/${val.track.id}/audio-features`);
                        val["audio_stats"] = audio.data;
                        return val;
                    }));
                    setAlbumSongs(res2);
                    setLoading(false);
                };
            });
    };

    useEffect(() => {
        getSongs();
    }, [playlist_id]);
    
    // TODO: fix design of carousel, add lettering to keys and mode, convert duration from ms to minutes, choose style of displaying track info
    return (
        <Container className='justify-content-md-center mt-5 mb-5'>
            <div className='SongCarousel'>
                <h2 className="text-center">Song Breakdown</h2>
                {loading ? (
                    <Container className='text-center'> 
                        <Spinner animation="border" variant="dark"/>
                    </Container>
                ) : (
                    <SongsList albumSongs = {albumSongs}/>
                )}
            </div>
        </Container>
    );
}

export default SongBreakdown;