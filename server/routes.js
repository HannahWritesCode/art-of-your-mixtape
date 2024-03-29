/**
 * our API routes 
 */
const path = require('path');
const express = require('express');
const routes = express.Router();
const axios = require('axios');
const getAccessToken = require('./getAccessToken');

/**
 * GET playlist object 
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist 
 */
routes.route('/playlist/:id')
    .get(async function (req, res) {
        const access_token = await getAccessToken()
        const api_url = `https://api.spotify.com/v1/playlists/${req.params.id}`;

        // make GET request to SPOTIFY API, sending access token 
        await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response => {
                res.send(response.data)
            })
            .catch(error => {
                console.log("Error retrieving playlist object");
                console.log("code: " + error.code);
                console.log("response: " + error.response.status + ": " + error.response.statusText + "\n");
                res.send(error);
            })
    })

/**
 * GET cover image(s) associated with playlist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist-cover
 */
routes.route('/playlist/:id/images')
    .get(async function (req, res) {
        const access_token = await getAccessToken();
        const api_url = `https://api.spotify.com/v1/playlists/${req.params.id}/images`;

        // make GET request to SPOTIFY API, sending access token 
        await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response => {
                res.send(response.data)
            })
            .catch(error => {
                console.log("Error retrieving playlist images");
                console.log("code: " + error.code);
                console.log("response: " + error.response.status + ": " + error.response.statusText + "\n");
                res.send(error);
            })
    })

/**
 * GET playlist tracks
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks
 * ?market=ES&limit=3&offset=3
 */
routes.route('/playlist/:id/tracks/:offset?')
    .get(async function (req, res) {
        const access_token = await getAccessToken();
        const api_url = `https://api.spotify.com/v1/playlists/${req.params.id}/tracks?limit=100&offset=${req.params.offset}`;
        // make GET request to SPOTIFY API, sending access token 
        await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response => {
                res.send(response.data)
            })
            .catch(error => {
                console.log("Error retrieving playlist tracks");
                console.log("code: " + error.code);
                console.log("response: " + error.response.status + ": " + error.response.statusText + "\n");
                res.send(error);
            })
    })

/**
 * GET track object
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track 
 */
routes.route('/track/:id')
    .get(async function (req, res) {
        const access_token = await getAccessToken();
        const api_url = `https://api.spotify.com/v1/tracks/${req.params.id}`;

        // make GET request to SPOTIFY API, sending access token 
        await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response => {
                res.send(response.data)
            })
            .catch(error => {
                console.log("Error retrieving track object");
                console.log("code: " + error.code);
                console.log("response: " + error.response.status + ": " + error.response.statusText + "\n");
                res.send(error);
            })
    })

/**
 * GET audio features for a single track
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features
 */
routes.route('/track/:id/audio-features')
    .get(async function (req, res) {
        const access_token = await getAccessToken();
        const api_url = `https://api.spotify.com/v1/audio-features/${req.params.id}`;

        // make GET request to SPOTIFY API, sending access token 
        await axios.get(api_url, {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
            .then(response => {
                res.send(response.data)
            })
            .catch(error => {
                console.log("Error retrieving track audio features");
                console.log("code: " + error.code);
                console.log("response: " + error.response.status + ": " + error.response.statusText + "\n");
                res.send(error);
            })
    })

/**
 * All other GET requests not handled before will return the React app
 */
if (process.env.NODE_ENV === 'production') {
    routes.route('/*')
        .get(function (req, res) {
            res.sendFile(path.resolve(__dirname, '../client/build'));
        })
}

module.exports = routes;
