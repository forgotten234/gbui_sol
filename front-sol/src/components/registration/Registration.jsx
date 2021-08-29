import React, { useState, useEffect} from "react"
import { Form, Button, Alert, Modal } from 'react-bootstrap'
import { Link } from "react-router-dom"
import './styles.css'
import ProfilePicturePlaceholder from '../../assets/user.png'
import Navigationbar from "../main/Navigationbar"

export default function Registration(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({
        adress: {
            street: "",
            cp: "",
            town: "",
            country: ""
        },
        firm: "",
        name: "",
        surname: "",
        userId: ""
    })
    const [confirmedPassword, setConfirmedPassword] = useState('')

    //States to show and hide Alters and Pop Ups (Modals)
    const [showAlert, setShowAlert] = useState(false)
    const [userInUse, setUserInUse] = useState(false)
    const [showPopUp, setShowPopUp] = useState(false)

    //to check if the email adress is valid
    const validateEmail = (email) => {
        let res = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return res.test(email);
    }
    
    //Submit creates new user
    const onFormSubmit = async (e) => {
        e.preventDefault()
        if(password === confirmedPassword && validateEmail(email)){
            await fetch('http://localhost:9001/registration/register', {
                method: "POST",
                body: JSON.stringify({
                    email: {email},
                    password: {password},
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
            .then(response => response.json())
            .then(async data => {
                await checkIfAccountIsInUseAndCreateRole(data.errorAvailable)
            })
            .then(setShowAlert(false))
            .then(setUserInUse(false))
        } else {
            setShowAlert(true)
        }
    }

    //only create a new role if the user does not exists
    const checkIfAccountIsInUseAndCreateRole = async (checkData) => {
        if(checkData === false){
            await fetch('http://localhost:9000/role/create', {
                method: "POST",
                body: JSON.stringify({
                    userId: userData.userId,
                    role: "User"
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(setShowPopUp(true))
        }
        else {
            setUserInUse(true)
            setShowPopUp(true)
        }
    }

    //Set User Id when the components mount. It is easier to generate it on client side instead of send back the user id from the server.
    //Here it is just one method call.
    useEffect(() => {
        setUserData({...userData, userId: Math.random().toString(36).substr(2, 9)})
    }, [])

    //Methods to set the State out of the form
    const setEmailFromForm = e => setEmail(e.target.value)
    const setPasswordFromForm = e => setPassword(e.target.value)
    const setConfirmedPasswordFromForm = e => setConfirmedPassword(e.target.value)
    const setUserDataFromForm = field => e => {
        if(field === "street") setUserData({...userData, adress: {...userData.adress, street: e.target.value}})
        else if(field === "cp") setUserData({...userData, adress: {...userData.adress, cp: e.target.value}})
        else if(field === "town") setUserData({...userData, adress: {...userData.adress, town: e.target.value}})
        else if(field === "country") setUserData({...userData, adress: {...userData.adress, country: e.target.value}})
        else if(field === "firm") setUserData({...userData, firm: e.target.value})
        else if(field === "name") setUserData({...userData, name: e.target.value})
        else if(field === "surname") setUserData({...userData, surname: e.target.value})
    }
    const handleClose = () => setShowPopUp(prevState => !prevState)

    return(
        <div>
            <Navigationbar/>
            <div className="registrationContainer">
                <Form onSubmit={onFormSubmit}>
                    <div className="registrationHeader">
                        <p className="squareLeft">&#9725;</p>
                        <p className="squareRight">&#9725;</p>
                        <img src={ProfilePicturePlaceholder} className="image" alt="Profile"/>                 
                    </div>
                    <div className="registrationBody">
                        <Form.Group id="userDataForm">
                            <Form.Group id="emailForm"> 
                                <Form.Control className="inputFields" type="email" placeholder="E-Mail" onChange={setEmailFromForm}/>
                            </Form.Group>
                            <Form.Group id="passwordForm">
                                <Form.Control className="inputFields" type="password" placeholder="Password" onChange={setPasswordFromForm}/>
                            </Form.Group>
                            <Form.Group id="confirmPasswordForm">
                                <Form.Control className="inputFields" type="password" placeholder="Password again" onChange={setConfirmedPasswordFromForm}/>
                            </Form.Group>
                            <Form.Group id="personalInformationForm">
                                <Form.Group id="adressForm"> 
                                    <Form.Group id="streetForm">
                                        <Form.Control className="inputFields" type="text" placeholder="Street" onChange={setUserDataFromForm("street")}/>
                                    </Form.Group>
                                    <Form.Group id="cpForm">
                                        <Form.Control className="inputFields" type="text" placeholder="Code postal" onChange={setUserDataFromForm("cp")}/>
                                    </Form.Group>
                                    <Form.Group id="townForm">
                                        <Form.Control className="inputFields" type="text" placeholder="Town" onChange={setUserDataFromForm("town")}/>
                                    </Form.Group>
                                    <Form.Group id="countryForm">
                                        <Form.Control className="inputFields" type="text" placeholder="Country" onChange={setUserDataFromForm("country")}/>
                                    </Form.Group>
                                </Form.Group>
                                <Form.Group id="firmForm"> 
                                    <Form.Control className="inputFields" type="text" placeholder="Firm" onChange={setUserDataFromForm("firm")}/>
                                </Form.Group>
                                <Form.Group id="nameForm"> 
                                    <Form.Control className="inputFields" type="text" placeholder="Name" onChange={setUserDataFromForm("name")}/>
                                </Form.Group>
                                <Form.Group id="surnameForm"> 
                                    <Form.Control className="inputFields" type="text" placeholder="Surname" onChange={setUserDataFromForm("surname")}/>
                                </Form.Group>
                            </Form.Group>
                            <div className="registrationSubmit">
                                <Form.Group>
                                    <div >
                                        <Button variant="outline-light" type="submit" className="outline-light">
                                            <div className="signUpParagraph">Sign up</div>
                                        </Button>
                                    </div> 
                                    <div>
                                        {
                                            showAlert
                                            ?   <Alert variant="danger" >
                                                    Passwords don't match <br />
                                                    and or E-Mail has the wrong format!
                                                </Alert>
                                            : <></>
                                        }
                                    </div>
                                </Form.Group>
                            </div>
                            <div >
                                <Link to="/sign-in">Back to Login</Link>
                            </div>
                        </Form.Group>
                    </div>
                </Form>
            </div>
            <Modal show={showPopUp} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            userInUse
                            ? <p>User exists!</p>
                            : <p>Successful!</p>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        userInUse
                        ? <p>Please use a different E-Mail!</p>
                        : <p>You can login now!</p>
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}