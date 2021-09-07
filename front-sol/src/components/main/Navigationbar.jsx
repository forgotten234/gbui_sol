import React, {useState,useEffect} from 'react'
import './styles.css'
import {Navbar, Nav, NavDropdown, FormControl, Form, Button, Container} from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import LoginStatus from './LoginStatus'
import { useHistory } from "react-router-dom"
import { ListGroup } from "react-bootstrap"

function Navigationbar(){
    const [searchResults, setSearchResults] = useState([])
    const [displayResults, setDisplayResults] = useState(false)
    const [searchBarValue, setSearchBarValue] = useState("")

    useEffect(() => {
        console.log(searchResults)
        if(searchResults.length === 0){
            setDisplayResults(false)
        } else if (searchResults.length > 0){
            setDisplayResults(true)
        }
    }, [searchResults])

    const history = useHistory()

    const searchBui = async (searchString) => {
        await fetch('http://141.45.92.192:9004/buis/search-bui', {
            method: 'POST',
            body: JSON.stringify({
                searchString: searchString
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => setSearchResults(data))
    }

    const startSearching = e => {
        setSearchBarValue(e.target.value)
        searchBui(e.target.value)
    }

    const navigateToDetailPage = (id) => {
        history.push({
            pathname: "/detail/"+id,
        })
        setSearchBarValue("")
        setDisplayResults(false)
    }

    return(
        <div>
            <Navbar sticky="top" expand="md" className="navigation navbar-custom ">
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
                                    <NavDropdown.Item onClick={() => history.push("/settings")}>Settings</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => history.push("/morphological-box")}>Morphologischer Kasten</NavDropdown.Item>
                                </NavDropdown>
                                </div>   
                        </Nav>
                        <Form className="d-flex flex-grow-1">
                            <FormControl
                                type="search"
                                placeholder="SUCHE BUIS"
                                className="mr-2"
                                aria-label="Search"
                                onChange={startSearching}
                                value={searchBarValue}
                            />      
                            
                        </Form>
                        <Nav>   
                            <PersonCircle className="icon" size="40"/>
                            <LoginStatus/>
                        </Nav>      
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {
                //should this be an own component?
                displayResults 
                ?   <Container className="searchResultsContainer">
                        <ListGroup className="searchResults">
                            {
                                searchResults.map(element => 
                                    <ListGroup.Item key={() => Math.random().toString(36).substr(2, 9)} >
                                        <div onClick={() => navigateToDetailPage(element._id)}>
                                            <img src={element.logo} style={{width: '150px', height: '75px'}}/>
                                            <span style={{marginRight: '100px'}}>{element.name}</span>
                                        </div>
                                    </ListGroup.Item>    
                                )
                            }
                        </ListGroup>
                    </Container>
                :   <></>
            }
        </div>
    )
}
export default Navigationbar