import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

type Props = {}

const Header = (props: Props) => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
    <Container>
      <Navbar.Brand href="#home" className='font-lobster'>AT Tools</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
    
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header;