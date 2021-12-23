import { useState, useEffect } from 'react';
import App from './App.js'
const axios = require('axios').default; 
//let { getAudioFeatures, getPlaylist, getPlaylistItems, getTrack } = require('./apiRequests'); 

const PlaylistHeading = () => {

  const [accessToken, setAccessToken] = useState('')
  var playlist_id = '25PK50ilMZN5xk9kdao4vc' // placeholder, will need to get the one from the App.js form 
  const [playlistName, setPlaylistName] = useState('')

  // this works, but the second GET request returns a 400 error 
  // before the first one can return the access token 
  useEffect(()=>{
      // GET access token using spotify credentials
      axios.get('/getAccessToken').then(response => {
        setAccessToken(response.data);
        //console.log(accessToken)
        // GET Spotify Playlist object  
        axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}`,{
          headers:{
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then (response => {
          setPlaylistName(response.data.name)
        })
        .catch (error => {
          console.log(error)
        })

      });
  }, [accessToken, playlist_id])

  return <>
    <h1>{playlistName}</h1>
  </>
}

export default PlaylistHeading;