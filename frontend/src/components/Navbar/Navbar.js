import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
function MainNavbar() {
    return (
        <div>
           
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container class="p-2">
                    <Navbar.Brand href="#home">RailRetro</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Link to="/" style={{textDecoration:'none',color:'white',padding:'5px'}}>Home</Link>
                        <Link style={{textDecoration:'none',color:'white',padding:'5px'}} to="/register">Book Ticket</Link>
                        </Nav>
                        <Nav>
                        {/* <Nav.Link to="/contactus">Contact Us</Nav.Link> */}
                        </Nav>
                        <Button style={{marginLeft:"18px"}} variant="light"><Link to="/loginRailway">Operator Login </Link></Button> 
                          
                        
                    </Navbar.Collapse>
                    </Container>
                    </Navbar>
        </div>
    )
}

export default MainNavbar
