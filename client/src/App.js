import { useState } from "react";
import { Button, Container, Form } from 'react-bootstrap';
import Navigation from "./components/Navigation";
import PlaylistHeader from './components/PlaylistHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/App.css'

function App() {

  const [userInput, setUserInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPlaylistHeading, setShowPlaylistHeading] = useState(false);
  const [playlistId, setPlaylistId] = useState('');

      const handleSubmit = (e) => {
      e.preventDefault()
      if (userInput.startsWith('https://open.spotify.com/playlist/')) {
        setPlaylistId(userInput.match(new RegExp('playlist/(.*)\\?si'))[1]);
        window.sessionStorage.removeItem("playlist");
        setUserInput('');
        setErrorMessage('');
        setShowPlaylistHeading(true);
      } else if (userInput === '') {
        console.log('empty form submitted');
        setErrorMessage('You gotta put something in the box, silly');
      } else {
        console.log('wrong link format');
        setErrorMessage("Sure doesn't look like a Spotify link to me");
      }
    }

  return(
    <>
      <Navigation>
        <Form className="d-flex mt-3 mb-3" onSubmit={handleSubmit}>
          <Form.Control
            className="me-2"
            size="lg"
            placeholder="Analyze Playlist"
            aria-label="userInput"
            aria-describedby="basic-addon2"
            title="https://open.spotify.com/playlist/..."
            onChange={(e) => setUserInput(e.target.value)}
            type="url"
            id='userInput'
            name="userInput"
            value={userInput}
          />
          <Button variant="outline-secondary" type='submit' onClick={handleSubmit}>Search</Button>
        </Form>
      </Navigation>
      <Container>
        {errorMessage && <h4>{errorMessage}</h4>}
        {showPlaylistHeading && <PlaylistHeader playlistId={playlistId}/>}
      </Container>
    </>
  )
}

export default App;
