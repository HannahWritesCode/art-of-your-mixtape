import { Nav, Container, Navbar } from 'react-bootstrap';
import logo from '../images/spotify_green_on_black.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/App.css'

const Navigation = (props) => {

    return(
        <Navbar collapseOnSelect expand="md" bg="black" variant="dark">
            <Container fluid>
                <Navbar.Brand>
                    <img
                    alt="Spotify_Logo"
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"/>
                    Playlist Analyzer
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse className="mt-2 mb-2" id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link href="#action1">Home</Nav.Link>
                        <Nav.Link href="#action2">About</Nav.Link>
                    </Nav>
                    {props.children}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;