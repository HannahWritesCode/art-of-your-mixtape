/**
 * node.js express server 
*/
const path = require('path');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(require('./routes'));

// this line needs to be in the entry point of the app, and 
// development .env needs to be in the same directory as package.json 
require('dotenv').config();

// have node serve the built React app
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "./build")));
}

app.use(cors({
    origin: [
        'https://art-of-your-mixtape.herokuapp.com/'
    ]
}))

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

