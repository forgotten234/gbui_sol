import React, {useState, useContext} from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { AuthContext } from '../../contexts/AuthContext'
import { WebSocketContext } from '../../contexts/WebSocketContext'
import '../styles.css'
import BriefcasePlaceholder from '../../../assets/briefcase.png'
const InquiryForm = () => {
    const { setMessageData } = useContext(WebSocketContext)
    const {auth} = useContext(AuthContext)
    const [inquiryDataForm, setInquiryDataForm] = useState({
        name: "",
        description: "",
        webpage: "",
        cost: 0.00,
        ap_name: "",
        ap_surname: "",
        ap_phoneNumber: "",
        ap_email: ""
    })
    const [showAlert, setShowAlert] = useState(false)
    const ws = new WebSocket('ws://localhost:3030')
    const onFormSubmit = async (e) => {
        e.preventDefault()
        if(checkForEmptyFields === true){
            setShowAlert(true)
        } else {
            let idForPassing = ""
            if(auth.data) idForPassing = auth.data.userId
            await fetch('http://localhost:9003/inquiries/create-inquiry', {
                method: "POST",
                body: JSON.stringify({
                    userId: idForPassing, //this is the form for guest so we can simply use "" for the userId -> a guest does not have a userId
                    name: inquiryDataForm.name,
                    description: inquiryDataForm.description,
                    webpage: inquiryDataForm.webpage,
                    cost: inquiryDataForm.cost,
                    ap_name: inquiryDataForm.ap_name,
                    ap_surname: inquiryDataForm.ap_surname,
                    ap_phoneNumber: inquiryDataForm.ap_phoneNumber,
                    ap_email: inquiryDataForm.ap_email
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(data => ws.send(JSON.stringify({data, newMessage: true}))) //sends to admin
            .then(data => setMessageData(data))
            .then(setShowAlert(false))
        }
    }

    const checkForEmptyFields = () => {
        if(inquiryDataForm.name === "" || inquiryDataForm.description === "" || inquiryDataForm.webpage === ""
            || inquiryDataForm.cost === 0.00 || inquiryDataForm.ap_name === "" || inquiryDataForm.ap_surname === ""
            || inquiryDataForm.ap_phoneNumber === "" || inquiryDataForm.ap_email === "")
        {
            return true
        } else {
            return false
        }
    }

    const setInquiryDataFromForm = field => e => {
        if(field === "name") setInquiryDataForm({...inquiryDataForm, name: e.target.value})
        else if(field === "description") setInquiryDataForm({...inquiryDataForm, description: e.target.value})
        else if(field === "webpage") setInquiryDataForm({...inquiryDataForm, webpage: e.target.value})
        else if(field === "cost") setInquiryDataForm({...inquiryDataForm, cost: e.target.value})
        else if(field === "ap_name") setInquiryDataForm({...inquiryDataForm, ap_name: e.target.value})
        else if(field === "ap_surname") setInquiryDataForm({...inquiryDataForm, ap_surname: e.target.value})
        else if(field === "ap_phoneNumber") setInquiryDataForm({...inquiryDataForm, ap_phoneNumber: e.target.value})
        else if(field === "ap_email") setInquiryDataForm({...inquiryDataForm, ap_email: e.target.value})
    }

    return (
        <div className={"inquiryFormContainer"}>
            <Form onSubmit={onFormSubmit}>
                <div className="inquiryFormHeader">
                    <p className="squareLeft">&#9725;</p>
                    <p className="squareRight">&#9725;</p>
                    <img src={BriefcasePlaceholder} className="imageInquiryForm" alt="Briefcase"/>                 
                </div>
                <div className="inquiryFormBody">
                    <Form.Group className="inputFieldsInquiryForm">
                        <Form.Control type="textarea" placeholder="BUIS name" onChange={setInquiryDataFromForm("name")}></Form.Control>
                    </Form.Group>
                    <Form.Group className="inputFieldsInquiryForm">
                        <Form.Control type="textarea" placeholder="Description" rows={3} onChange={setInquiryDataFromForm("description")}></Form.Control>
                    </Form.Group>
                    <Form.Group className="inputFieldsInquiryForm">
                        <Form.Control type="textarea" placeholder="Webpage" onChange={setInquiryDataFromForm("webpage")}></Form.Control>
                    </Form.Group>
                    <Form.Group className="inputFieldsInquiryForm">
                        <Form.Control type="textarea" placeholder="Cost" onChange={setInquiryDataFromForm("cost")}></Form.Control>
                    </Form.Group>
                    <Form.Group className="inputFieldsInquiryForm">
                        <Form.Control type="textarea" placeholder="Name contact person" onChange={setInquiryDataFromForm("ap_name")}></Form.Control>
                    </Form.Group>
                    <Form.Group className="inputFieldsInquiryForm">
                        <Form.Control type="textarea" placeholder="Surname contact person" onChange={setInquiryDataFromForm("ap_surname")}></Form.Control>
                    </Form.Group>
                    <Form.Group className="inputFieldsInquiryForm">
                        <Form.Control type="textarea" placeholder="Phone number contact person" onChange={setInquiryDataFromForm("ap_phoneNumber")}></Form.Control>
                    </Form.Group>
                    <Form.Group className="inputFieldsInquiryForm">
                        <Form.Control type="email" placeholder="E-Mail contact person" onChange={setInquiryDataFromForm("ap_email")}></Form.Control>
                    </Form.Group >
                    <div className="inquirySubmit">
                        <Form.Group>
                            <div>
                                <Button variant="outline-light" type="submit" className="outline-light">
                                    <div className="signUpParagraph">Submit Inquiry</div>
                                </Button>
                            </div>
                            <div style={{marginTop: '5px'}}>
                                {
                                    showAlert
                                    ?   <Alert variant="danger" >
                                            Please fill in all fields! 
                                        </Alert>
                                    : <></>
                                }           
                            </div>                  
                        </Form.Group>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default InquiryForm