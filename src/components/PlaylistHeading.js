import { useState, useEffect } from 'react';
import {playlist_id} from './App.js';
import {Container, Row, Col} from 'react-bootstrap';

const axios = require('axios').default; 
//let { getAudioFeatures, getPlaylist, getPlaylistItems, getTrack } = require('./apiRequests'); 

const msToHours = (track) =>{

  var time = 0;
  track.forEach(element => {
    time += element.track.duration_ms;
  });
  
  var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  var minutes = Math.floor((time / (1000 * 60)) % 60);

  return hours + " hr " + minutes + " min"
}

const PlaylistHeading = () => {

  const [accessToken, setAccessToken] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistCoverUrl, setPlaylistCover] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [playlistOwner, setPlaylistOwner] = useState('');
  const [playlistNumSongs, setPlaylistNumSongs] = useState('');
  const [playlistDuration, setPlaylistDuration] = useState('');
  const [playlistLikes, setPlaylistLikes] = useState('');

  useEffect(()=>{
      // GET access token using spotify credentials
      axios.get('/getAccessToken')
      .then(response => {
        console.log(response.data)
        setAccessToken(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  useEffect(()=>{
    if(!accessToken.isEmpty()){
      // GET Spotify Playlist object 
      const playlistName = axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}`,{ headers:{'Authorization': `Bearer ${accessToken}`}});
      const playlistCover = axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/images`,{ headers:{'Authorization': `Bearer ${accessToken}`}});
      const playlistTracks = axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,{ headers:{'Authorization': `Bearer ${accessToken}`}});

      axios.all([playlistName, playlistCover, playlistTracks])
      .then (axios.spread((...responses) => {
        setPlaylistName(responses[0].data.name);
        setPlaylistLikes(responses[0].data.followers.total);
        setPlaylistDescription(responses[0].data.description);
        setPlaylistOwner(responses[0].data.owner.display_name);
        setPlaylistCover(responses[1].data[0].url);
        setPlaylistNumSongs(responses[2].data.total);
        setPlaylistDuration(msToHours(responses[2].data.items));
      }))
      .catch (error => {
        console.log(error);
      })
    }
  }, [accessToken, playlist_id]);

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