import React, {useState, useContext, useEffect} from 'react'
import { Form, Button, Alert, Row, Col} from 'react-bootstrap'
import { AuthContext } from '../../../contexts/AuthContext'
import { WebSocketContext } from '../../../contexts/WebSocketContext'
import CharacteristicsArea from './CharacteristicsArea'
import '../../styles.css'

const InquiryForm = () => {
    const { setMessageData } = useContext(WebSocketContext)
    const {auth} = useContext(AuthContext)
    const [numberCounterForArraysInForm, setNumberCounterForArraysInForm] = useState(0)
    const [inquiryDataForm, setInquiryDataForm] = useState({
        name: "",
        type: "",
        description: "",
        webpage: "",
        cost: 0.00,
        manufacturer: [""],
        characteristic: {
            applicationField: [],
            observationObject: [],
            observationConcept: [],
            oberservationLimit: [],
            targetGroup: [],
            integrationLevel: []
        },
        logo: "",
        downloadLink: "",
        contact: {
            ap_name: "",
            ap_surname: "",
            ap_phoneNumber: "",
            ap_email: "",
        }
    })
    const [showAlert, setShowAlert] = useState(false)
    const [showCharacteristics, setShowCharacteristics] = useState(false)
    const ws = new WebSocket('ws://0.0.0.0:3030')


    useEffect(() => {
        console.log(inquiryDataForm)
    }, [inquiryDataForm.characteristic])

    const addMoreManufacturer = () => {
        setNumberCounterForArraysInForm(prevState => prevState+1)
        setInquiryDataForm({...inquiryDataForm, manufacturer: [...inquiryDataForm.manufacturer, ""]})
    }

    const updateArrayOnLastPosition = (array, value, index) => {
        switch(array){
            case "manufacturer": 
                let newArray = [...inquiryDataForm.manufacturer]
                newArray.splice(index, 1, value)
                setInquiryDataForm({...inquiryDataForm, manufacturer: newArray})
                break
            default:
        }
    }

    const setInquiryDataFromForm = field => e => {
        if(field === "name") setInquiryDataForm({...inquiryDataForm, name: e.target.value})
        else if(field === "type") setInquiryDataForm({...inquiryDataForm, type: e.target.value})
        else if(field === "description") setInquiryDataForm({...inquiryDataForm, description: e.target.value})
        else if(field === "webpage") setInquiryDataForm({...inquiryDataForm, webpage: e.target.value})
        else if(field === "cost") setInquiryDataForm({...inquiryDataForm, cost: e.target.value})
        if(field === "manufacturer") {
            updateArrayOnLastPosition("manufacturer", e.target.value, numberCounterForArraysInForm)            
            console.log(inquiryDataForm.manufacturer)
        }
        else if(field === "ap_name") setInquiryDataForm({...inquiryDataForm, contact: {...inquiryDataForm.contact, ap_name: e.target.value}})
        else if(field === "ap_surname") setInquiryDataForm({...inquiryDataForm, contact: {...inquiryDataForm.contact, ap_surname: e.target.value}})
        else if(field === "ap_phoneNumber") setInquiryDataForm({...inquiryDataForm, contact: {...inquiryDataForm.contact, ap_phoneNumber: e.target.value}})
        else if(field === "ap_email") setInquiryDataForm({...inquiryDataForm, contact: {...inquiryDataForm.contact, ap_email: e.target.value}})
        else if(field === "logo") setInquiryDataForm({...inquiryDataForm, logo: e.target.value})
        else if(field === "downloadlink") setInquiryDataForm({...inquiryDataForm, downloadLink: e.target.value})
    }

    const checkForEmptyFields = () => {
        if(inquiryDataForm.name === "" || inquiryDataForm.description === "" || inquiryDataForm.webpage === ""
            || inquiryDataForm.cost === 0.00 || inquiryDataForm.ap_name === "" || inquiryDataForm.ap_surname === ""
            || inquiryDataForm.ap_phoneNumber === "" || inquiryDataForm.ap_email === "" || inquiryDataForm.type === ""
            || !inquiryDataForm.manufacturer.length || inquiryDataForm.logo === "" || inquiryDataForm.downloadLink === "" || inquiryDataForm.contact.ap_name === ""
            || inquiryDataForm.contact.ap_surname === "" || inquiryDataForm.contact.ap_phoneNumber === "" || inquiryDataForm.contact.ap_email=== "")
        {
            return true
        } else {
            return false
        }
    }

    const onFormSubmit = async (e) => {
        e.preventDefault()
        if(checkForEmptyFields() === true){
            setShowAlert(true)
        } else {
            let idForPassing = ""
            if(auth.data) idForPassing = auth.data.userId
            await fetch('http://141.45.92.192:9003/inquiries/create-inquiry', {
                method: "POST",
                body: JSON.stringify({
                    userId: idForPassing, //this is the form for guest so we can simply use "" for the userId -> a guest does not have a userId
                    name: inquiryDataForm.name,
                    type: inquiryDataForm.type,
                    description: inquiryDataForm.description,
                    webpage: inquiryDataForm.webpage,
                    cost: inquiryDataForm.cost,
                    manufacturer: inquiryDataForm.manufacturer,
                    characteristic: inquiryDataForm.characteristic,
                    logo: inquiryDataForm.logo,
                    downloadLink: inquiryDataForm.downloadLink,
                    contact: inquiryDataForm.contact
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

    return (
        <div className={"inquiryFormContainer"}>
            <Form onSubmit={onFormSubmit}>
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
                    <Form.Group className="inputFieldsInquiryForm">
                        <Form.Control type="textarea" placeholder="Logo URL" onChange={setInquiryDataFromForm("logo")}></Form.Control>
                    </Form.Group >
                    <Form.Group className="inputFieldsInquiryForm">
                        <Form.Control type="textarea" placeholder="Downloadlink" onChange={setInquiryDataFromForm("downloadlink")}></Form.Control>
                    </Form.Group >
                    <Form.Group className="inputFieldsInquiryForm">
                        <Form.Control type="textarea" placeholder="Type" onChange={setInquiryDataFromForm("type")}></Form.Control>
                    </Form.Group >
                    <Form.Group className="inputFieldsInquiryForArrays">
                        {
                            inquiryDataForm.manufacturer.map(element => 
                                <Row key={() => Math.random().toString(36).substr(2, 9)}>
                                    <Col>
                                        <Form.Control style={{width: '340px', height: '38px'}} type="textarea" placeholder="Hersteller" onChange={setInquiryDataFromForm("manufacturer")} />
                                    </Col>
                                    <Col>
                                        <Button variant="outline-warning">
                                            <div onClick={addMoreManufacturer}>Add more?</div>
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        }
                    </Form.Group>
                    <Button variant="outline-warning" className="outline-warning">
                        <div onClick={() => setShowCharacteristics(prevState => !prevState)}>Add characteristics</div>
                    </Button>
                    {
                        showCharacteristics
                        ?  <CharacteristicsArea action={(data) => setInquiryDataForm({...inquiryDataForm, characteristic: data})}/>
                        :  <></>
                    }
                    <div className="inquirySubmit">
                        <Form.Group>
                            <div>
                                <Button variant="outline-warning" type="submit" className="outline-warning">
                                    <div >Submit Inquiry</div>
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