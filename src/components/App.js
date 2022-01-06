import '../css/App.css';
import logo from '../images/spotify_green_on_black.png';
import { useState } from "react";
import PlaylistHeading from './PlaylistHeading';
import Buttons from './Buttons';
import {Button, Container, Navbar, InputGroup, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Im not sure why but the react hook for playlistid just stores a empty string when trying to isolate the url 
var playlist_id = '';

function App() {

  const [userInput, setUserInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //const [playlistId, setPlaylistId] = useState('') 
  const [showPlaylistHeading, setShowPlaylistHeading] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userInput.startsWith('https://open.spotify.com/playlist/')) {
      // isolate and save playlist id from spotify url 
      //setPlaylistId(userInput.match(new RegExp('playlist/(.*)\\?si'))[1])
      playlist_id = userInput.match(new RegExp('playlist/(.*)\\?si'))[1];
      setUserInput('');
      setErrorMessage('');
      setShowPlaylistHeading(true);
      setShowButtons(true);
    } else if (userInput === ''){
        console.log('empty form submitted');
        setErrorMessage('You gotta put something in the box, silly');
    } else {
        console.log('wrong link format');
        setErrorMessage("Sure doesn't look like a Spotify link to me");
    }
  }
  
  return <>
  <Navbar bg="black" variant="dark">
    <Container >
      <Navbar.Brand>
        <img
          alt="Spotify_Logo"
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
      Playlist analyzer
      </Navbar.Brand>
        <InputGroup className="mt-3 mb-3" onSubmit={handleSubmit}>
          <FormControl
            placeholder="Enter a Spotify playlist link to get started"
            aria-label="userInput"
            aria-describedby="basic-addon2"
            title = "https://open.spotify.com/playlist/..."
            onChange={(e)=>setUserInput(e.target.value)}
            type = "url" 
            id = 'userInput'
            name = "userInput" 
            value = {userInput}
          />
          <Button variant="outline-secondary" id="button-addon2" type='submit' onClick={handleSubmit}>Submit</Button>
        </InputGroup>
    </Container>
  </Navbar>
  <Container>
        {errorMessage && <h4>{errorMessage}</h4>}
        {showPlaylistHeading && <PlaylistHeading/>}
        {showButtons && <Buttons/>}
  </Container>
  </>
}

export default App
export {playlist_id}
