//for email
import emailjs from 'emailjs-com';

import React, { useState } from "react"
import { Button, Modal, Table, Dropdown, DropdownButton } from 'react-bootstrap'

const EditInquiry = (props) => {
    const [inqStatus, setInqstatus] = useState("IN_PROGRESS")

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

    return(
        props.inqData ?
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
                                <td>{props.inqData.ap_name}</td>
                            </tr>
                            <tr>
                                <td>Surname contact person:</td>
                                <td>{props.inqData.ap_surname}</td>
                            </tr>
                            <tr>
                                <td>Phone number contact person:</td>
                                <td>{props.inqData.ap_phoneNumber}</td>
                            </tr>
                            <tr>
                                <td>E-Mail contact person:</td>
                                <td>{props.inqData.ap_email}</td>
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