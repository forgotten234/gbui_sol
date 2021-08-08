import React, {useState, useEffect, useContext} from 'react'
import { Form, Button } from 'react-bootstrap'
import {AuthContext} from '../contexts/AuthContext'
//see below role comment
//import {RoleContext} from '../contexts/RoleContext'
import { Link } from "react-router-dom"
export default function Settings(){
    const { auth } = useContext(AuthContext)
    //maybe we need to use role here as well (User vs. Admin Settings)
    //const { role } = useContext(RoleContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState()
    
    //get all information about the user to show them as placeholder in the fields below when auth is ready to use
    useEffect(() => {
        if(auth.data !== null){
            fetchData()
        }     
    }, [auth])

    const fetchData = async () => {
        await fetch('http://localhost:9001/users/get-user/' + auth.data.id)
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
        await fetch('http://localhost:9001/users/update-user/' + auth.data.id, {
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
        <div className="settingsContainer">
          <Form onSubmit={onFormSubmit}>
            <Form.Group>
              <Form.Label>
                Change Password
              </Form.Label>
              <Form.Control type="password" placeholder={"•••••••••••••"} onChange={(e)=> setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Change E-Mail
              </Form.Label>
              <Form.Control type="email" placeholder={email} onChange={(e)=> setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Change Street
              </Form.Label>
              <Form.Control type="textarea" placeholder={userData.adress.street} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, street: e.target.value}})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Change Code Postal
              </Form.Label>
              <Form.Control type="textarea" placeholder={userData.adress.cp} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, cp: e.target.value}})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Change Town
              </Form.Label>
              <Form.Control type="textarea" placeholder={userData.adress.town} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, town: e.target.value}})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Change Country
              </Form.Label>
              <Form.Control type="textarea" placeholder={userData.adress.country} onChange={(e)=> setUserData({...userData, adress: {...userData.adress, country: e.target.value}})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Change Firm
              </Form.Label>
              <Form.Control type="textarea" placeholder={userData.firm} onChange={(e)=> setUserData({...userData, firm: e.target.value})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Change Name
              </Form.Label>
              <Form.Control type="textarea" placeholder={userData.name} onChange={(e)=> setUserData({...userData, name: e.target.value})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Change Surname
              </Form.Label>
              <Form.Control type="textarea" placeholder={userData.surname} onChange={(e)=> setUserData({...userData, surname: e.target.value})}/>
            </Form.Group>
            <Button variant="outline-info" type="submit">Submit</Button>
          </Form>
          <Button variant="outline-info">
            <Link to="/">Welcome page</Link>
          </Button>
        </div>
      ) : (
          <div>Loading..</div>
      )
}