/**
 * Node.js Express backend 
 */

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

const axios = require('axios').default; // to send HTTP request 
const qs = require('qs'); // to send authorization data in application/x-www-form-urlencoded format
require('dotenv').config(); // to use environment variables (spotify credentials) 

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

/**
 * GET Spotify API token 
 * Spotify reference doc: https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/ 
 */ 
app.get('/getToken', (req, res) => {
  // make post request to SPOTIFY API for access token, sending relevant info
  const token_url = 'https://accounts.spotify.com/api/token';
  const data = qs.stringify({ 'grant_type': 'client_credentials' });
  const response = axios.post(token_url, data, {
    headers: {
      'Authorization': `Basic ${auth_token}`,
      'Content-Type': 'application/x-www-form-urlencoded' 
    }
  })
  .then(response => {
    // send access token back to client 
    res.send(response.data.access_token)
  })
  .catch(error => {
    console.log(error)
  })
})

// console.log that server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// serve static build to Heroku 
app.use(express.static(path.join(__dirname, './build'))); 
app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname + './build/index.html')) 
});

module.exports = app;