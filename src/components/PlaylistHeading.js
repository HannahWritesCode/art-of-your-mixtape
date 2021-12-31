import { useState, useEffect } from 'react';
import App from './App.js';
import {Container, Row, Col} from 'react-bootstrap';
import playlistCover from '../images/playlist_cover_placeholder.jpg';

const axios = require('axios').default; 
//let { getAudioFeatures, getPlaylist, getPlaylistItems, getTrack } = require('./apiRequests'); 

const PlaylistHeading = () => {

  const [accessToken, setAccessToken] = useState('');
  var playlist_id = '25PK50ilMZN5xk9kdao4vc'; // placeholder, will need to get the one from the App.js form 
  const [playlistName, setPlaylistName] = useState('');

  useEffect(()=>{
      // GET access token using spotify credentials
      axios.get('https://art-of-your-mixtape.herokuapp.com/getAccessToken').then(response => {
        setAccessToken(response.data);
        //console.log(accessToken)
        // GET Spotify Playlist object  
        axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}`,{
          headers:{
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then (response => {
          setPlaylistName(response.data.name);
        })
        .catch (error => {
          console.log(error);
        })

      });
  }, [accessToken, playlist_id])

  return <>
    <Container>
      <Row>
        <Col>
          <img
            alt="playlist_cover"
            src={playlistCover}
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