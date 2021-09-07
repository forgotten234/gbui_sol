//for email
import emailjs from 'emailjs-com';

import React, { useState,  useContext } from "react"
import { Button, Modal, Table, Dropdown, DropdownButton } from 'react-bootstrap'
import { WebSocketContext } from '../../contexts/WebSocketContext';
import { AuthContext } from '../../contexts/AuthContext';

const EditInquiry = (props) => {
    const [inqStatus, setInqstatus] = useState("IN_PROGRESS")
    const { setMessageData } = useContext(WebSocketContext)
    const { auth } = useContext(AuthContext)

    const ws = new WebSocket('ws://localhost:3030')

    const changeStatusOfBui = () => {
        if(props.inqData.inquiryStatus === "NEW" && inqStatus == "IN_PROGRESS") {
            updateInquiry()
        } else if(inqStatus === "DENIED" || inqStatus === "ACCEPTED"){
            updateInquiry()
        }   
        props.action()
    } 

    const updateInquiry = async () => {
        await fetch('http://localhost:9003/inquiries/update-inquiry/' + props.inqData.inquiryId, {
            method: "PATCH",
            body: JSON.stringify({
                inquiryStatus: inqStatus
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => ws.send(JSON.stringify({data, updatedMessage: true}))) //sends to user
        .then(insertBUItoDB())
        .then(setInqstatus("IN_PROGRESS"))
        .then(sendEmailToGuest())
    }

    const sendEmailToGuest = () => {
        //ToDo: with roleContext? -> No, because it has nothing to do with the role of the person which is logged in
        //the userId refers here to the person who creates the bui
        if(props.inqData.userId === ""){
            emailjs.send('service_aqvuzv8','template_l8lj8qk', {
                ap_email: props.inqData.ap_email,
                ap_surname: props.inqData.ap_surname,
                inquiryStatus: inqStatus,
                name: props.inqData.name
            }, 'user_qAFmeHxSZa9IgHbTDtFK4')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                console.log('FAILED...', err);
            });
        }
    }

    const insertBUItoDB = async () => {
        if(inqStatus === "ACCEPTED"){
            let idForPassing = ""
            if(auth.data) idForPassing = auth.data.userId
            await fetch('http://localhost:9004/buis/create-bui', {
                method: "POST",
                body: JSON.stringify({
                    userId: idForPassing,
                    name: props.inqData.name,
                    type: props.inqData.type,
                    description: props.inqData.description,
                    website: props.inqData.webpage,
                    downloadLink: props.inqData.downloadLink,
                    manufacturer: props.inqData.manufacturer,
                    price: props.inqData.cost,
                    contact: {
                        title: "",
                        firstName: props.inqData.contact.ap_surname,
                        lastname: props.inqData.contact.ap_lastName,
                        telephoneNumber: props.inqData.contact.ap_phoneNumber,
                        email: props.inqData.contact.ap_email
                    },
                    logo: props.inqData.logo,
                    characteristic: props.inqData.characteristic
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            console.log(props.inqData)
        }
    }

    return(
        props.inqData && props.inqData.contact ?
            <Modal show={props.editInq} onHide={changeStatusOfBui}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit BUI: {props.inqData.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Status:</td>
                                <td>{props.inqData.inquiryStatus}</td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>{props.inqData.description}</td>
                            </tr>
                            <tr>
                                <td>Webpage:</td>
                                <td>{props.inqData.webpage}</td>
                            </tr>
                            <tr>
                                <td>Cost:</td>
                                <td>{props.inqData.cost}</td>
                            </tr>
                            <tr>
                                <td>Name contact person:</td>
                                <td>{props.inqData.contact.ap_name}</td>
                            </tr>
                            <tr>
                                <td>Surname contact person:</td>
                                <td>{props.inqData.contact.ap_surname}</td>
                            </tr>
                            <tr>
                                <td>Phone number contact person:</td>
                                <td>{props.inqData.contact.ap_phoneNumber}</td>
                            </tr>
                            <tr>
                                <td>E-Mail contact person:</td>
                                <td>{props.inqData.contact.ap_email}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <DropdownButton title="Change Status BUI">
                        <Dropdown.Item onClick={() => setInqstatus("ACCEPTED")}>Accepted</Dropdown.Item>
                        <Dropdown.Item onClick={() => setInqstatus("DENIED")}>Denied</Dropdown.Item>
                    </DropdownButton>
                    <Button onClick={changeStatusOfBui}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        :   <></>
    )
}

export default EditInquiry