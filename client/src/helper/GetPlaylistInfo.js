import axios from "axios";

const delay = (milliseconds) => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

const GetArtistNames = (artist) => {
    let names = artist.map((val) => {
       return val.name;
    })
    return names.join(", ");
}

const SimplifyTrackObj = (playlistInfo) => {

    let playlist = playlistInfo.map((val) => {
        const year = new Date(val.track.album.release_date);
        const images = val.track.album.images.map((val) => {return val.url});
        let trackInfo = {};

        trackInfo.id = val.track.id;
        trackInfo.albumName = val.track.album.name;
        trackInfo.songName = val.track.name;
        trackInfo.artistNames = GetArtistNames(val.track.artists);
        trackInfo.release = year.getFullYear();
        trackInfo.imageUrl = images[1];
        trackInfo.danceability = val.audio_stats.danceability;
        trackInfo.energy = val.audio_stats.energy;
        trackInfo.loudness = val.audio_stats.loudness;
        trackInfo.acousticness = val.audio_stats.acousticness;
        trackInfo.valence = val.audio_stats.valence;
        trackInfo.tempo = val.audio_stats.tempo;
        trackInfo.timeSignature = val.audio_stats.time_signature;
        trackInfo.duration = val.audio_stats.duration_ms;
        trackInfo.mode = val.audio_stats.mode;
        trackInfo.key = val.audio_stats.key;
        
        return trackInfo;
    })
    return playlist;
}

const GetAudioInfo = async (track) => {
    const res2 = await Promise.all(track.filter((val) => {
        if(val.track === undefined || val.track.id == null) return false;
         return true;
    }).map(async(val) => {
        let audio = await axios.get(`/track/${val.track.id}/audio-features`);
        val["audio_stats"] = audio.data;
        return val;
    }));
    return res2
};

const GetPlaylistInfo = async (playlist_id, offset, playlistLength) => {
    let albumSongs = [];
    let fetches = [];

    for(let i = 0; i < playlistLength; i++) {
        fetches.push(
            axios.get(`/playlist/${playlist_id}/tracks/${offset}`)
            .then(async (res) => {
                if(res.data.items !== undefined) {
                    let modifiedTrack = await GetAudioInfo(res.data.items);
                    return modifiedTrack
                }
            })
        )
        await delay(1000);
        offset += 100;
    }

    return (
        Promise.all(fetches)
        .then((val) => {
            val.forEach((value) => {
                if(value !== undefined) {
                    albumSongs = [...albumSongs, ...value]
                }
            })
            return SimplifyTrackObj(albumSongs)
            //return albumSongs;
        })
    )
}

export default GetPlaylistInfo;