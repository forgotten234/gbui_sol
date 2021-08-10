import React, { useState } from "react"
import { Form, Button } from 'react-bootstrap'

const InquiryFormGuest = () => {
    const [inquiryData, setInquiryData] = useState({
        name: "",
        description: "",
        webpage: "",
        cost: 0.00,
        ap_name: "",
        ap_surname: "",
        ap_phoneNumber: ""
    })

    const onFormSubmit = async (e) => {
        e.preventDefault()
        await fetch('http:localhost:9003')
    }

    const setInquiryDataFromForm = field => e => {
        if(field === "name") setInquiryData({...inquiryData, name: e.target.value})
        else if(field === "description") setInquiryData({...inquiryData, description: e.target.value})
        else if(field === "webpage") setInquiryData({...inquiryData, webpage: e.target.value})
        else if(field === "cost") setInquiryData({...inquiryData, cost: e.target.value})
        else if(field === "ap_name") setInquiryData({...inquiryData, ap_name: e.target.value})
        else if(field === "ap_surname") setInquiryData({...inquiryData, ap_surname: e.target.value})
        else if(field === "ap_phoneNumber") setInquiryData({...inquiryData, ap_phoneNumber: e.target.value})
    }

    return(
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>
                        Type In the name of the bui
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Bui..." onChange={setInquiryDataFromForm("name")}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Type In some description
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Description..." onChange={setInquiryDataFromForm("description")}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Type In the webpage of the bui
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Webpage..." onChange={setInquiryDataFromForm("webpage")}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Type In the cost of the bui
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Cost..." onChange={setInquiryDataFromForm("cost")}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Type In the contact person's name
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Name contact person..." onChange={setInquiryDataFromForm("ap_name")}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Type In the contact person's surname
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Surname..." onChange={setInquiryDataFromForm("ap_surname")}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Type In the contact person's phone number
                    </Form.Label>
                    <Form.Control type="textarea" placeholder="Phone number..." onChange={setInquiryDataFromForm("ap_phoneNumber")}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit">
                        Submit Inquiry
                     </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default InquiryFormGuest