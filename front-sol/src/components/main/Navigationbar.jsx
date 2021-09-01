import React, {useState,useEffect,useContext} from 'react'
import './styles.css'
import {Navbar, Nav, NavDropdown, FormControl, Form, Button, Container} from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import LoginStatus from './LoginStatus'
import { useHistory } from "react-router-dom"

import { RoleContext } from '../contexts/RoleContext'
import { AuthContext } from '../contexts/AuthContext'

function Navigationbar(){
    const {auth, setAuthData} = useContext(AuthContext)
    const {role, setRoleData} = useContext(RoleContext)

    const history = useHistory()

    const logOut = () => {
        setAuthData(null)
        setRoleData(null)
        history.push("/")
    }

    return(
        <div>
            <Navbar sticky="top" bg="light" expand="md" className="navigation ">
                <Container>
                    <Navbar.Brand onClick={() => history.push("/")} className="font-weight-bolder text-uppercase">Sol</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-betweens">
                        <Nav className="mr-auto">
                            <div className="card-nav-dark">
                                <Nav.Link onClick={() => history.push("/")}>Start</Nav.Link>
                            </div>
                            <div className="card-nav-light">
                                <NavDropdown title="Menü">
                                    <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                </div>   
                        </Nav>
                        <Form className="d-flex flex-grow-1 searchBar">
                            <FormControl
                                type="search"
                                placeholder="SUCHE BUIS"
                                className="mr-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-dark">Suche</Button>
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