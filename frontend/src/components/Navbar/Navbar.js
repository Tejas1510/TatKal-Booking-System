import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'

function MainNavbar() {
    return (
        <div>
           
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container class="p-2">
                    <Navbar.Brand href="#home">RailRetro</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/register">Book Ticket</Nav.Link>
                        </Nav>
                        <Nav>
                        <Nav.Link href="/contactus">Contact Us</Nav.Link>
                        </Nav>
                        <Button style={{marginLeft:"18px"}} variant="light" href="/loginRailway">Operator Login</Button> 
                          
                        
                    </Navbar.Collapse>
                    </Container>
                    </Navbar>
        </div>
    )
}

export default MainNavbar
