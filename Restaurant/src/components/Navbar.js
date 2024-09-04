import React from "react";
import { Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function NavBar() {
    return (
      <Navbar expand="lg" className='fixed-top bg-body-tertiary shadow'>
      <Container>
        <Navbar.Brand>
          <Link to="/" className='navbar-brand text-success fw-semibold'>
            KingOS Restaurant
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto justify-content-end w-100'>
            <Nav.Link href='/' className='active text-uppercase'>Home</Nav.Link>
            <Nav.Link href='/about' className='text-uppercase'>About</Nav.Link>
            <Nav.Link href='/menu' className='text-uppercase'>Menu</Nav.Link>
            <Nav.Link href='/Order' className='text-uppercase'>Order Now</Nav.Link>
            <Nav.Link href='/contact' className='text-uppercase'>Contact</Nav.Link>
            <Nav.Link href='/workers' className='text-uppercase'>👨🏻‍🍳</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}