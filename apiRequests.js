/**
 * This is a node.js module that performs the Client Credentials oAuth2 flow 
 * to access the Spotify Web API. It uses the axios library to make HTTP requests. 
 * 
 * It contains functions that query Spotify's API for a 'track' object, 
 * an array of 'item' objects in a playlist, and a track's 'audio features'. 
 * 
 * Client credentials obtained from the Spotify Developer platform:
 * https://developer.spotify.com/dashboard/
 *
 */

const axios = require('axios').default; // axios library
const qs = require('qs'); // contains JSON 'stringify' utility
//require('dotenv').config(); // used to create environment variables file .env (client credentials) 

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

/**
 * Client credentials oAuth2 flow to obtain access token to the Spotify Web API. 
 * @returns Promise 
 */
async function getAccessToken() {
  try {
    // make post request to SPOTIFY API for access token, sending relevant info
    const token_url = 'https://accounts.spotify.com/api/token';
    const data = qs.stringify({ 'grant_type': 'client_credentials' });
    const response = await axios.post(token_url, data, {
      headers: {
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    // return Promise of access token
    return response.data.access_token;
  } catch (error) {
    //on fail, log the error in console
    console.log(error);
  }
}

/**
 * Send request to Spotify API for the audio features of a specified track. 
 * Web API reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features 
 * @param track_id 
 * @returns Promise
 */
async function getAudioFeatures(track_id) {
  //request token using getAccessToken() function
  const access_token = await getAccessToken();
  const api_url = `https://api.spotify.com/v1/audio-features/${track_id}`;
  try {
    const response = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    //return Promise of JSON data
    return response.data;
  } catch (error) {
    //on fail, log the error in console
    console.log(error);
  }
}

/**
 * Send request to Spotify API for an array of item objects in a specified playlist. 
 * Web API reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks 
 * @param playlist_id 
 * @returns Promise
 */
async function getPlaylistItems(playlist_id) {
  // request token using getAccessToken() function
  const access_token = await getAccessToken();
  const api_url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
  try {
    const response = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    // return Promise of JSON data
    return response.data;
  } catch (error) {
    // on fail, log the error in console
    console.log(error);
  }
}

/**
 * Send request to Spotify API for a specified track object. 
 * Web API reference: https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track 
 * @param track_id 
 * @returns Promise
 */
async function getTrack(track_id) {
  //request token using getAccessToken() function
  const access_token = await getAccessToken();
  const api_url = `https://api.spotify.com/v1/tracks/${track_id}`;
  try {
    const response = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });
    //return Promise of JSON data
    return response.data;
  } catch (error) {
    //on fail, log the error in console
    console.log(error);
  }
}

module.exports = {getAccessToken, getAudioFeatures, getPlaylistItems, getTrack};