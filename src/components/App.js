//import logo from './logo.svg';
import '../css/App.css';
import { useState } from "react";
import PlaylistHeading from './PlaylistHeading'
import Buttons from './Buttons';

function App() {

  const [userInput, setUserInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [playlistId, setPlaylistId] = useState('') 
  const [showPlaylistHeading, setShowPlaylistHeading] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (userInput.startsWith('https://open.spotify.com/playlist/')) {
      console.log(userInput)
      // isolate and save playlist id from spotify url 
      setPlaylistId(userInput.match(new RegExp('playlist/(.*)\\?si'))[1]);  
      console.log(playlistId) 
      setUserInput('')
      setErrorMessage('')
      setShowPlaylistHeading(true)
      setShowButtons(true)
    } else if (userInput === ''){
        console.log('empty form submitted')
        setErrorMessage('You gotta put something in the box, silly')
    } else {
        console.log('wrong link format')
        setErrorMessage("Sure doesn't look like a Spotify link to me")
    }
  }
  
  return <>
    <article>
      <section>
        <form onSubmit={handleSubmit}>
          <input 
            type = "url" 
            id = 'userInput'
            name = "userInput" 
            value = {userInput}
            onChange={(e)=>setUserInput(e.target.value)}
            size = "50" 
            placeholder = "Enter a Spotify playlist link to get started" 
            title = "https://open.spotify.com/playlist/..."
          /> 
          <button type='submit' onClick={handleSubmit}>Submit</button>
        </form>
        {errorMessage && <h4>{errorMessage}</h4>}
      </section>

      <section>
        {showPlaylistHeading && <PlaylistHeading/>}
      </section>

      <section>
        {showButtons && <Buttons/>}
      </section>

    </article>
  </>
}

export default App;
