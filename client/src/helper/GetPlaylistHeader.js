import { msToHours } from '../helper/UnitConverter';
import axios from "axios";

const GetPlaylistHeader = (playlistId) => {

    const playlistName = axios.get(`/playlist/${playlistId}`);
    const playlistCover = axios.get(`/playlist/${playlistId}/images`)
    const playlistTracks = axios.get(`/playlist/${playlistId}/tracks/${0}`)

    // errors to handle: 
    // 404 when playlist is not found / is private 
    return(
        axios.all([playlistName, playlistCover, playlistTracks])
        .then(axios.spread((...responses) => {
            let playlist = {
                name: responses[0].data.name,
                coverUrl: responses[1].data[0].url,
                description: responses[0].data.description,
                owner: responses[0].data.owner.display_name,
                numberOfSongs: responses[2].data.total,
                duration: msToHours(responses[2].data.items),
                likes: responses[0].data.followers.total
            }
            return playlist
        }))
        .catch(error => {
            console.log(error);
        })
    )
}

export default GetPlaylistHeader;