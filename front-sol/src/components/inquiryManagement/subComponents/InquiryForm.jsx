import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'

//for the websSocket
const reader = new FileReader()
var message = ""
reader.addEventListener('loadend', (e) => {
    var text = e.target.result;
    message = text
    console.log(message);
});

const InquiryForm = () => {
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
    const ws = new WebSocket('ws://localhost:3030')
    const onFormSubmit = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:9003/inquiries/create-inquiry', {
            method: "POST",
            body: JSON.stringify({
                userId: "", //this is the form for guest so we can simply use "" for the userId -> a guest does not have a userId
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
        .then(data => ws.send(JSON.stringify({data}))) //sends to admin
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
        <Form onSubmit={onFormSubmit} className="mt-4">
                <Form.Group className="my-3">
                    <Form.Label>
                        Titel der Anwendung
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Titel..." onChange={setInquiryDataFromForm("name")}></Form.Control>
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label>
                        Beschreibung des Buis
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Beschreibung..." onChange={setInquiryDataFromForm("description")}></Form.Control>
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label>
                        Internetpräsenz
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Webpage..." onChange={setInquiryDataFromForm("webpage")}></Form.Control>
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label>
                        Kosten
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Kosten..." onChange={setInquiryDataFromForm("cost")}></Form.Control>
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label>
                        AnsprechpartnerIn Name
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Name..." onChange={setInquiryDataFromForm("ap_name")}></Form.Control>
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label>
                        AnsprechpartnerIn Vorname
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Vorname..." onChange={setInquiryDataFromForm("ap_surname")}></Form.Control>
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label>
                        Telefon
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Telefon..." onChange={setInquiryDataFromForm("ap_phoneNumber")}></Form.Control>
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label>
                        E-Mail
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="E-Mail..." onChange={setInquiryDataFromForm("ap_email")}></Form.Control>
                </Form.Group>
                <Form.Group className="my-3">
                    <Button variant="primary" type="submit">
                        Submit Inquiry
                     </Button>
                </Form.Group>
            </Form>
    )
}

export default InquiryForm