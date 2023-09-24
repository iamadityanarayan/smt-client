import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

type Props = {}

const Header = (props: Props) => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
    <Container>
      <Navbar.Brand href="#home" className='font-lobster- f-space fw-bold fs-3 mb-0'>Aditya</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
    
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header;