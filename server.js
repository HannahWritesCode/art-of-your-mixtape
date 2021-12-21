/**
 * Node.js Express backend 
 */
const express = require('express');
const app = express();
//const cors = require("cors");
//const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

//app.use(cors())
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

const axios = require('axios').default; 
const qs = require('qs'); // contains JSON 'stringify' utility

var client_id = process.env.SPOTIFY_CLIENT_ID;
var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

// create a GET route
app.get('/express_backend', (req, res) => {
  res.json({message: "Hello from server!"})
});

// console.log that server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

/**
 * Client credentials oAuth2 flow to obtain access token to the Spotify Web API. 
 * @returns Promise 
 */
/*
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
    //res.send(response.data.access_token)
  } catch (error) {
    //on fail, log the error in console
    console.log(error);
  }
}
*/

// serve static build to Heroku 
app.use('/build',express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname + '/build/index.html')) 
});

module.exports = app;