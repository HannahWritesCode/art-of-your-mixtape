import { useState, useEffect } from 'react';
import App from './App.js';
import {playlist_id} from './App.js';
import {Container, Row, Col} from 'react-bootstrap';

const axios = require('axios').default; 
//let { getAudioFeatures, getPlaylist, getPlaylistItems, getTrack } = require('./apiRequests'); 

const PlaylistHeading = () => {

  const [accessToken, setAccessToken] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistCoverUrl, setPlaylistCover] = useState('');

  // There is an error were after submitting the effect will infinitely call the api
  //error 400 
  useEffect(()=>{
      // GET access token using spotify credentials
      axios.get('/getAccessToken')
      .then(response => {
        setAccessToken(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  }, [accessToken]);

  useEffect(()=>{
      // GET Spotify Playlist object 
      console.log(accessToken) 
      const playlistName = axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}`,{ headers:{'Authorization': `Bearer ${accessToken}`}});
      const playlistCover = axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/images`,{ headers:{'Authorization': `Bearer ${accessToken}`}});
      axios.all([playlistName, playlistCover])
      .then (axios.spread((...responses) => {
        setPlaylistName(responses[0].data.name)
        setPlaylistCover(responses[1].data[0].url)
      }))
      .catch (error => {
        console.log(error);
      })

}, [accessToken, playlistName,playlistCoverUrl]);

  return <>
    <Container>
      <Row>
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
          <h1>{playlistName}</h1>
        </Col>
      </Row>
    </Container>
  </>
}

export default PlaylistHeading;