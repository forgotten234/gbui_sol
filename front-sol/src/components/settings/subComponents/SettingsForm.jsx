import React, {useState, useEffect, useContext} from 'react'
import { Form, Button } from 'react-bootstrap'
import '../mainComponents/styles.css'
import {AuthContext} from '../../contexts/AuthContext'
const SettingsForm = () => {
    const { auth } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState()
    //get all information about the user to show them as placeholder in the fields below when auth is ready to use
    useEffect(() => {
        if(auth.data !== null){
            fetchData()
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

    return userData ? (
        <Form onSubmit={onFormSubmit} className="settingsForm">
            <Form.Group className="settingsFormInput">
                <Form.Control type="password" placeholder={"•••••••••••••"} onChange={(e)=> setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="settingsFormInput">
                <Form.Control type="email" placeholder={email} onChange={(e)=> setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="settingsFormInput">
                <Form.Control type="textarea" placeholder={userData.adress.street} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, street: e.target.value}})}/>
            </Form.Group>
            <Form.Group className="settingsFormInput">
                <Form.Control type="textarea" placeholder={userData.adress.cp} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, cp: e.target.value}})}/>
            </Form.Group>
            <Form.Group className="settingsFormInput">
                <Form.Control type="textarea" placeholder={userData.adress.town} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, town: e.target.value}})}/>
            </Form.Group>
            <Form.Group className="settingsFormInput">
                <Form.Control type="textarea" placeholder={userData.adress.country} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, country: e.target.value}})}/>
            </Form.Group>
            <Form.Group className="settingsFormInput">                       
                <Form.Control type="textarea" placeholder={userData.firm} onChange={(e)=> setUserData({...userData, firm: e.target.value})}/>
            </Form.Group>
            <Form.Group className="settingsFormInput">
                <Form.Control type="textarea" placeholder={userData.name} onChange={(e)=> setUserData({...userData, name: e.target.value})}/>
            </Form.Group>
            <Form.Group className="settingsFormInput">
                <Form.Control type="textarea" placeholder={userData.surname} onChange={(e)=> setUserData({...userData, surname: e.target.value})}/>
            </Form.Group>
            <div className="settingsFormInput">
                <Button variant="outline-light" type="submit" className="outline-light">
                    <div className="submitParagraph">Submit Changes</div>
                </Button>
            </div>
        </Form>
    ) : (
        <div>Loading..</div>
    )
}

export default SettingsForm