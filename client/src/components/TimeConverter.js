const msToMinutes = (track) => {

    var time = track;
    var minutes = Math.floor((time / (1000 * 60)) % 60);

    return minutes + " min";
};

const msToHours = (track) => {

    var time = 0;
    track.forEach(element => {
        time += element.track.duration_ms;
    });

    var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((time / (1000 * 60)) % 60);

    return hours + " hr " + minutes + " min";
};

export {msToMinutes, msToHours};