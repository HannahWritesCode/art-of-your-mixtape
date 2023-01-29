const msToMinutes = (time) => {

    var minutes = Math.floor((time / (1000 * 60)) % 60);
    var seconds = Math.floor((time/1000) % 60);

    return minutes + "min " + seconds + "sec";
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

const signitureConvertion = (signitureNum) => {
    switch(signitureNum) {
        case 3:
            return "3/4";
        case 4:
            return "4/4";
        case 5:
            return "5/4";
        case 6:
            return "6/8";
        case 7:
            return "7/4";
        default:
            return "No time signiture detected";
    }
};

const modeConvertion = (modeNum) => {
    switch(modeNum) {
        case 0:
            return "Minor";
        case 1:
            return "Major";
        default:
            return "No modality detected";
    }
};
   

const pitchConvertion = (pitchNum) => {

    switch(pitchNum) {
        case 0:
            return "C";
        case 1:
            return "C♯, D♭";
        case 2:
            return "D";
        case 3:
            return "D♯, E♭";
        case 4:
            return "E";
        case 5:
            return "F";
        case 6:
            return "F♯, G♭";
        case 7:
            return "G";
        case 8:
            return "G♯, A♭";
        case 9:
            return "A";
        case 10:
            return "A♯, B♭";
        case 11:
            return "B";
        default:
            return "No pitch detected";
    }
};

export { msToMinutes, msToHours, pitchConvertion, modeConvertion, signitureConvertion };