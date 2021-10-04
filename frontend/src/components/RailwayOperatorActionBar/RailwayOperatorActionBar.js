import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import moment from "moment";
import Badge from 'react-bootstrap/Badge'

function RailwayOperatorActionBar(props) {
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
                        <Nav.Link href="/otp_op">Authenticate Passengers</Nav.Link>
                        <Nav.Link href="/counter_op">Passenger Details</Nav.Link>
                        </Nav>
                        
                        <span class="text-white ml-2"><AccountCircleIcon/> {props.email}</span>
                        <Button style={{marginLeft:"15px"}} variant="contained" onClick={props.logoutMethod} color="primary">Logout</Button>
        
                        <Badge pill bg="success" style={{marginLeft:"20px",padding:"8px"}}>
                           Date: {moment().format("DD-MM-YYYY")}
                           {/* Time: {moment().format("hh:mm:ss")} */}
                        </Badge>
                    </Navbar.Collapse>
                    </Container>
                    </Navbar>


    
        </div>
    )
}

export default RailwayOperatorActionBar;
