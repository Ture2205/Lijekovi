import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { RoutesNames } from '../constants';

import './NavBar.css';

function NavBar() {
    const navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand
                    className='linkPocetna'
                    onClick={() => navigate(RoutesNames.HOME)}
                    role="button"
                    tabIndex="0"
                    aria-label="Povratak na početnu stranicu"
                >
                    Lijekovi APP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Izbornik" id="basic-nav-dropdown">
                            <NavDropdown.Item
                                onClick={() => navigate(RoutesNames.LIJEKOVI_PREGLED)}
                            >
                                Lijekovi pregled
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-end'>
                    <Nav.Link target='_blank' href="http://mario2205-001-site1.gtempurl.com/swagger/index.html">
                        API Dokumentacija
                    </Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;