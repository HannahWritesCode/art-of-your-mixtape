import { useState, useEffect } from 'react';
import App from './App.js'
const axios = require('axios').default; 
//let { getAudioFeatures, getPlaylist, getPlaylistItems, getTrack } = require('./apiRequests'); 

const PlaylistHeading = () => {

  const [accessToken, setAccessToken] = useState('')

  useEffect(()=>{
      axios.get('/getToken').then((token) => {
      setAccessToken(token)
    });
  }, [])

  return <>
    <h1>Playlist Heading</h1>
    <h1>Spotify access token: {JSON.stringify(accessToken)}</h1> 
  </>
}

export default PlaylistHeading;