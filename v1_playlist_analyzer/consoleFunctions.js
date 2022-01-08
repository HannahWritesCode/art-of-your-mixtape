/**
 * This is a node.js module that uses the apiRequests functions 
 * to print JSON data from Spotify to the console. 
 */

let { getAudioFeatures, getPlaylistItems, getTrack } = require('./src/apiRequests'); 

/**
 * Return an array of track IDs from a specified playlist, 
 * in order of the tracks in that playlist. 
 * @param playlist_id 
 * @returns Promise
 */
async function getTrackIDsArray(playlist_id) {
  let promises = new Array();
  return await getPlaylistItems(playlist_id).then(async (playlist) => {
    for (let i = 0; i < playlist.items.length; i++) {
      promises.push(playlist.items[i].track.id);
    }
    // return the array of promises in the order they were passed, 
    // regardless of the order in which they resolve! 
    return await Promise.all(promises);
  });
}

/**
 * Return name of a specified track as a string. 
 * @param track_id 
 * @returns Promise
 */
async function getTrackName(track_id) {
  return await getTrack(track_id).then(async (track) => {
    return track.name; // return Promise of string
  });
}

/**
 * Return a 2-item array containing the name of a track 
 * and the audio features of that track. 
 * @param track_id 
 * @returns Promise[]
 */
async function getTrackNameWithAudioFeatures(track_id) {
  let promises = new Array();
  promises.push(getTrackName(track_id));
  promises.push(getAudioFeatures(track_id));
  return await Promise.all(promises);
}

/**
 * Return an array containing the names of tracks in a specified playlist
 * and the audio features of each track, in order of the playlist. 
 * @param playlist_id 
 * @returns Promise[]
 */
async function getPlaylistTrackNamesWithAudioFeatures(playlist_id) {
  let promises = new Array();
  return await getTrackIDsArray(playlist_id).then(async (track_id_array) => {
    for (let i = 0; i < track_id_array.length; i++) {
      promises.push(getTrackName(track_id_array[i]));
      promises.push(getAudioFeatures(track_id_array[i]));
    }
    return await Promise.all(promises);
  });
}

// call getTrackNameWithAudioFeatures function, print result to console
// https://open.spotify.com/track/5t142J9jQl1aaajsbxGjwg?si=c823d82dbbd54d26 

getTrackNameWithAudioFeatures('5t142J9jQl1aaajsbxGjwg').then((data)=>{
  console.log(data);
})

// call getPlaylistTrackNamesWithAudioFeatures function, print result to console 
// https://open.spotify.com/playlist/4XqDiEbFr6XRcauUmuA5q2?si=86d32042d1fa467c 

getPlaylistTrackNamesWithAudioFeatures('4XqDiEbFr6XRcauUmuA5q2').then((data) => {
  console.log(data);
})
