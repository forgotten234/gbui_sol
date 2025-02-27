import React, { useState, useContext } from "react"
import {AuthContext} from '../contexts/AuthContext'
import {RoleContext} from '../contexts/RoleContext'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link } from "react-router-dom"
import ProfilePicturePlaceholder from '../../assets/user.png'
import './styles.css' 

export default function Login({history}){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showAlert, setShowAlert] = useState(false)
    const { setAuthData } = useContext(AuthContext)
    const { setRoleData } = useContext(RoleContext)

    //on Submit log in the user and redirect to annother page
    const onFormSubmit = async e => {
        e.preventDefault()
        let fetchedData
        await fetch('http://localhost:9001/login/login', {
            method: 'POST',
            body: JSON.stringify({
            email: email,
            password: password
        }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => fetchedData = data)
        .then(async () => {
            while (fetchedData === undefined || fetchedData.loading === true) console.log("wait for data")
            if(fetchedData.errorAvailable === true) setShowAlert(true)
            else {       
                setAuthData(fetchedData)
                await activateRole(fetchedData.userId)
                history.replace("/")
            }
        })     
    }

    //after login activate the role, means that the systems knows which role is activated right now
    const activateRole = async (id) =>  {
        await fetch('http://localhost:9000/role/get-role/' + id)
            .then(response => response.json())
            .then(data => setRoleData(data))
    }

    return (
        <div>
            <div className="loginContainer">
                <Form onSubmit={onFormSubmit}>
                    <div className="registrationHeader">
                        <p className="squareLeft">&#9725;</p>
                        <p className="squareRight">&#9725;</p>
                        <img src={ProfilePicturePlaceholder} className="image" alt="Profile"/>                 
                    </div> 
                    <div className="loginBody">
                        <Form.Group className="inputFieldsLogin">
                            <Form.Control type="email" placeholder="E-Mail" onChange={e => {setEmail(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group className="inputFieldsLogin">
                            <Form.Control type="password" placeholder="Password" onChange={e => {setPassword(e.target.value)}}/>
                        </Form.Group>
                        <div className="loginSubmit">
                            <div>
                                <Button variant="outline-warning" type="submit" className="outline-warning">
                                    <div>Einloggen</div>
                                </Button>
                            </div> 
                            <div>
                                {
                                    showAlert
                                    ? <Alert variant="danger" style={{width: "100%"}}>Falsche Daten!</Alert>
                                    : <></>
                                }
                            </div>
                            <div>
                                <Link to="/register">Registrieren</Link>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}