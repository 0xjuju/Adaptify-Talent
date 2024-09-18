import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";


const NavigationBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">RepoCheko</Navbar.Brand>
                <Navbar.Toggle aria-controls="badic=navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/product">Product</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login | Signup</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;