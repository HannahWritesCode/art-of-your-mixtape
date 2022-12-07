/**
 * Middleware function to retrieve Spotify access token 
 * https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/ 
 * https://ritvikbiswas.medium.com/connecting-to-the-spotify-api-using-node-js-and-axios-client-credentials-flow-c769e2bee818 
 */
const axios = require('axios');
const qs = require('qs'); // to send authorization data in application/x-www-form-urlencoded format
require('dotenv').config();

/**
 * Client credentials oAuth2 flow to obtain access token to the Spotify Web API. 
 * @returns Promise 
 */
async function getAccessToken() {
    try {
        // Spotify client credentials
        var client_id = process.env.SPOTIFY_CLIENT_ID;
        var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
        const auth_token = Buffer.from(`${client_id}:${client_secret}`, 'utf-8').toString('base64');

        // make post request to SPOTIFY API for access token, sending relevant info
        const token_url = 'https://accounts.spotify.com/api/token';
        const data = qs.stringify({ 'grant_type': 'client_credentials' });
        const response = await axios.post(token_url, data, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        // return Promise of access token
        return response.data.access_token;

    } catch (error) {
        console.log("Error retrieving access token");
        console.log("code: " + error.code);
        console.log("response: " + error.response.status + ": " + error.response.statusText + "\n");
        return error;
    }
}

module.exports = getAccessToken;