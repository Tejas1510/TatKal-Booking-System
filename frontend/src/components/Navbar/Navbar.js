import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
function MainNavbar() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
                <Container>
                <Navbar.Brand href="/">
                    {/* <img
                    alt=""
                    src={IRCTC}
                    width="45"
                    height="45"
                    className="d-inline-block align-top"
                    style={{backgroundColor:"white" , padding:"3px"}}
                    />{' '}Tatkal */}
                    <p style={{color:'white'}}>Tatkal Booking</p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="me-auto ">
                    <Nav.Link href="/mainhomepage">Home</Nav.Link>
                    <Nav.Link href="/guideliness">Guidelines</Nav.Link>
                    </Nav>
                    <Nav>
                    <Nav.Link href="/contactus">Contact Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default MainNavbar
