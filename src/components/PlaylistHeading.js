import { useState, useEffect } from 'react';
import App from './App.js'
const axios = require('axios').default; 
//let { getAudioFeatures, getPlaylist, getPlaylistItems, getTrack } = require('./apiRequests'); 

const PlaylistHeading = () => {

  const [response, setResponse] = useState('')

  useEffect(()=>{
      axios.get('/express_backend').then((res) => {
      const response = res.data;
      setResponse(response)
    });
  }, [])

  return <>
    <h1>Hello from the frontend!</h1>
    <h1>{JSON.stringify(response)}</h1> 
  </>
}

export default PlaylistHeading;