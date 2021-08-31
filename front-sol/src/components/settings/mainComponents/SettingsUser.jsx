import React, {useState, useEffect, useContext} from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import {AuthContext} from '../../contexts/AuthContext'
//see below role comment
//import {RoleContext} from '../contexts/RoleContext'
import './styles.css'

export default function SettingsUser(){
    const { auth } = useContext(AuthContext)
    //maybe we need to use role here as well (User vs. Admin Settings) ---> but in main settings page! see below
    //const { role } = useContext(RoleContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState()
    const [showFormForChangingPersonalData, setShowFormForChangingPersonalData] = useState(false)
    const [showBuisList, setShowBuisList] = useState(false)

    //get all information about the user to show them as placeholder in the fields below when auth is ready to use
    useEffect(() => {
        if(auth.data !== null){
            fetchData()
            console.log(userData)
        }     
    }, [auth])


    //this and the useeffect needs to be in the main settings page 
    const fetchData = async () => {
        await fetch('http://localhost:9001/users/get-user/' + auth.data.userId)
            .then(response => response.json())
            .then(data => {
                setPassword(data.password)
                setEmail(data.email)
                setUserData(data)
            })
    }

    //by submitting the form all typed in data will be updated
    const onFormSubmit = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:9001/users/update-user/' + auth.data.userId, {
            method: 'PATCH',
            body: JSON.stringify({
                email: email,
                password: password,
                adress: userData.adress,
                firm: userData.firm,
                name: userData.name,
                surname: userData.surname,
                userId: userData.userId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    //if no userData are there a loading component will be rendert till the userData are fetched
    return userData ? (
        <div style={{marginTop: "50px"}}>
            <Container className="containerHeader">
                <p className="squareLeft">&#9725;</p>
                <p className="squareRight">&#9725;</p>
            </Container>
            <Container className="containerBody" fluid="md">
                <Row>
                    <Col className="d-flex justify-content-center">
                        <div className="settingsButtonArea">
                            <div className="settingsButton d-grid gap-2">
                                <Button variant="outline-light" onClick={() => setShowBuisList(prevState => !prevState)}>
                                    Show Buis
                                </Button>
                            </div>
                            <div className="settingsButton d-grid gap-2">
                                <Button variant="outline-light" onClick={() => setShowFormForChangingPersonalData(prevState => !prevState)}>
                                    Change personal data
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        {
                            showFormForChangingPersonalData
                            ?
                                <Form onSubmit={onFormSubmit} className="settingsForm">
                                    <Form.Group className="inputSettingsForm">
                                        <Form.Control type="password" placeholder={"•••••••••••••"} onChange={(e)=> setPassword(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="inputSettingsForm">
                                        <Form.Control type="email" placeholder={email} onChange={(e)=> setEmail(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="inputSettingsForm">
                                        <Form.Control type="textarea" placeholder={userData.adress.street} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, street: e.target.value}})}/>
                                    </Form.Group>
                                    <Form.Group className="inputSettingsForm">
                                        <Form.Control type="textarea" placeholder={userData.adress.cp} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, cp: e.target.value}})}/>
                                    </Form.Group>
                                    <Form.Group className="inputSettingsForm">
                                        <Form.Control type="textarea" placeholder={userData.adress.town} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, town: e.target.value}})}/>
                                    </Form.Group>
                                    <Form.Group className="inputSettingsForm">
                                        <Form.Control type="textarea" placeholder={userData.adress.country} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, country: e.target.value}})}/>
                                    </Form.Group>
                                    <Form.Group className="inputSettingsForm">                       
                                        <Form.Control type="textarea" placeholder={userData.firm} onChange={(e)=> setUserData({...userData, firm: e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group className="inputSettingsForm">
                                        <Form.Control type="textarea" placeholder={userData.name} onChange={(e)=> setUserData({...userData, name: e.target.value})}/>
                                    </Form.Group>
                                    <Form.Group className="inputSettingsForm">
                                        <Form.Control type="textarea" placeholder={userData.surname} onChange={(e)=> setUserData({...userData, surname: e.target.value})}/>
                                    </Form.Group>
                                    <div className="submitArea">
                                        <Button variant="outline-light" type="submit" className="outline-light">
                                            <div className="submitParagraph">Submit Changes</div>
                                        </Button>
                                    </div>
                                </Form>
                            :   <></>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
      ) : (
          <div>Loading..</div>
      )
}