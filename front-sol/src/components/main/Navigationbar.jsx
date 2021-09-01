import React, {useState,useEffect} from 'react'
import './styles.css'
import {Navbar, Nav, NavDropdown, FormControl, Form, Button, Container} from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import LoginStatus from './LoginStatus'

function Navigationbar(){
    
    return(
        <div>
            <Navbar sticky="top" bg="light" expand="md" className="navigation ">
                <Container>
                    <Navbar.Brand href="#home" className="font-weight-bolder text-uppercase">Sol</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-betweens">
                        <Nav className="mr-auto">
                            <div className="card-nav-dark">
                            <Nav.Link href="#home">Start</Nav.Link>
                            </div>
                            <div className="card-nav-light">
                                <NavDropdown title="Menü"></NavDropdown>
                                </div>   
                        </Nav>
                        <Form className="d-flex flex-grow-1 searchBar">
                            <FormControl
                                type="search"
                                placeholder="SUCHE BUIS"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-dark"s>Suche</Button>
                        </Form>
                        <Nav>
                            <PersonCircle className="icon" size="40"/>
                            <LoginStatus/>
                        </Nav>      
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
export default Navigationbar