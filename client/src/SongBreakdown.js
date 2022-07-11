import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { playlist_id } from './App.js';
import { msToMinutes } from './components/TimeConverter.js';
import { Carousel } from 'react-bootstrap';

const axios = require('axios').default;

const SongBreakdown = () => {

    const [albumSongs, setAlbumSongs] = useState([]);

    useEffect(() => {

        const getSongs = async() => {
            let tracks = await axios.get(`/playlist/${playlist_id}/tracks`);
            tracks = tracks.data.items
            tracks.map(async(value) => {
                let audio = await axios.get(`/track/${value.track.id}/audio-features`);
                value["audio_stats"] = audio.data;
            })
            setAlbumSongs(tracks);
        };

        getSongs()
        .catch((error) => {
            console.log(error);
        });
    }, [playlist_id]);
    
    return (
        <div className='SongCarousel'>
            <h2 className="text-center">Song Breakdown</h2>
            <Container className="justify-content-md-center mt-5 mb-5">
                <Carousel variant="dark">
                    {albumSongs.map((value) => {
                        const images = value.track.album.images.map((val) => {return val.url});
                        const artistNames = value.track.artists.map((val) => {return val.name+", "});

                        return(
                            <Carousel.Item key={value.track.id}>
                                <img
                                    alt="playlist_cover"
                                    src={images[1]}
                                    width="300"
                                    height="300"
                                    className='img-fluid shadow-2-strong'/>
                            <Carousel.Caption>
                                <p>{value.track.name}</p>
                                <p>{artistNames}</p>
                                <p>{value.track.album.name}</p>
                                <p>{value.track.album.release_date}</p>
                            </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </Container>
        </div>
    );
}

export default SongBreakdown;