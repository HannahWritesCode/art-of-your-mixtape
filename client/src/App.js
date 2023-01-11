import logo from './images/spotify_green_on_black.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/App.css'
import { useState } from "react";
import { PlaylistHeading } from './PlaylistHeading';
import { Nav, NavDropdown, Button, Container, Navbar, Form } from 'react-bootstrap';

var playlist_id = '';

function App() {

  const [userInput, setUserInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [playlistId, setPlaylistId] = useState('')
  const [showPlaylistHeading, setShowPlaylistHeading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userInput.startsWith('https://open.spotify.com/playlist/')) {
      // isolate and save playlist id from spotify url 
      //setPlaylistId(userInput.match(new RegExp('playlist/(.*)\\?si'))[1])
      playlist_id = userInput.match(new RegExp('playlist/(.*)\\?si'))[1];
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

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="black" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <img
              alt="Spotify_Logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Playlist Analyzer
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse className="mt-2 mb-2" id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">About</Nav.Link>
            </Nav>
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {errorMessage && <h4>{errorMessage}</h4>}
        {showPlaylistHeading && <PlaylistHeading />}
      </Container>
    </>
  )
}

export default App
export { playlist_id }
