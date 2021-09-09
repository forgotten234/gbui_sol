//for email
import emailjs from 'emailjs-com';

import React, { useState,  useContext, useEffect } from "react"
import { Button, Modal, Table, Dropdown, DropdownButton } from 'react-bootstrap'
import { WebSocketContext } from '../../contexts/WebSocketContext';
import { AuthContext } from '../../contexts/AuthContext';

const EditInquiry = (props) => {
    const [allCharacteristics, setAllCharacteristics] = useState({
        applicationField: [],
        observationObject: [],
        observationConcept: [],
        observationLimit: [],
        targetGroup: [],
        integrationLevel: []
    })
    const [charaForCreatingBui, setCharaForCreatingBui] = useState(props.inqData.characteristic)
    const [inqStatus, setInqstatus] = useState("IN_PROGRESS")
    const { setMessageData } = useContext(WebSocketContext)
    const { auth } = useContext(AuthContext)

    const ws = new WebSocket('ws://141.45.92.192:9003')

    useEffect(() => {
        getAllCharacteristics()
    }, [])

    const changeStatusOfBui = () => {
        if(props.inqData.inquiryStatus === "NEW" && inqStatus == "IN_PROGRESS") {
            updateInquiry()
        } else if(inqStatus === "DENIED"){
            updateInquiry()
        } else if(inqStatus === "ACCEPTED"){
            checkIfNewCharaIsAvailableAndPushToChara()
            updateChara()
            updateInquiry()
        }
        props.action()
    } 

    const updateInquiry = async () => {
        await fetch('http://141.45.92.192:9003/inquiries/update-inquiry/' + props.inqData.inquiryId, {
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
            await fetch('http://141.45.92.192:9004/buis/create-bui', {
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

    const updateChara = async () => {
        await fetch('http://141.45.92.192:9004/buis/update-characteristics', {
            method: "PATCH",
            body: JSON.stringify({
                characteristic: {
                    applicationField: allCharacteristics.applicationField,
                    observationObject: allCharacteristics.observationObject,
                    observationConcept: allCharacteristics.observationConcept,
                    observationLimit: allCharacteristics.observationLimit,
                    targetGroup: allCharacteristics.targetGroup,
                    integrationLevel: allCharacteristics.integrationLevel
                }
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    const getAllCharacteristics = async () => {
        await fetch('http://141.45.92.192:9004/buis/get-characteristics')
            .then(response => response.json())
            .then(data => setAllCharacteristics(data[0].characteristic))
    }

    //only for the first 3 fields, because they are the new ones!
    const checkIfNewCharaIsAvailableAndPushToChara = () => {
        if(props.inqData.characteristic) {
            Object.values(props.inqData.characteristic).forEach((val, index) => {
                let field = Object.keys(props.inqData.characteristic)[index]
                for(let i = 0; i<3; i++){
                    if(val[i] && allCharacteristics[field].includes(val[i]) === false) allCharacteristics[field].push(val[i])
                }
            })
        }
        console.log(props.inqData.characteristic)
        console.log(allCharacteristics)
    }

    return(
        props.inqData && props.inqData.contact ?
            <Modal show={props.editInq} onHide={changeStatusOfBui}>
                <Modal.Header closeButton>
                    <Modal.Title>Editiere Anfrage: {props.inqData.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Status:</td>
                                <td>{props.inqData.inquiryStatus}</td>
                            </tr>
                            <tr>
                                <td>Beschreibung:</td>
                                <td>{props.inqData.description}</td>
                            </tr>
                            <tr>
                                <td>Webseite:</td>
                                <td>{props.inqData.webpage}</td>
                            </tr>
                            <tr>
                                <td>Kosten:</td>
                                <td>{props.inqData.cost}</td>
                            </tr>
                            <tr>
                                <td>Name Kontaktperson:</td>
                                <td>{props.inqData.contact.ap_name}</td>
                            </tr>
                            <tr>
                                <td>Vorname Kontaktperson:</td>
                                <td>{props.inqData.contact.ap_surname}</td>
                            </tr>
                            <tr>
                                <td>Telefonnummer Kontaktperson:</td>
                                <td>{props.inqData.contact.ap_phoneNumber}</td>
                            </tr>
                            <tr>
                                <td>E-Mail Kontaktperson:</td>
                                <td>{props.inqData.contact.ap_email}</td>
                            </tr>
                            <tr>
                                <td>Anwendungsgebiet:</td>
                                <td>{props.inqData.characteristic.applicationField.map(
                                        element => {
                                            return element + ", "
                                        }
                                )}</td>
                            </tr>
                            <tr>
                                <td>Betrachtungsobjekt:</td>
                                <td>{props.inqData.characteristic.observationObject.map(
                                        element => {
                                            return element + ", "
                                        }
                                )}</td>
                            </tr>
                            <tr>
                                <td>Betrachtungskonzept:</td>
                                <td>{props.inqData.characteristic.observationConcept.map(
                                        element => {
                                            return element + ", "
                                        }
                                )}</td>
                            </tr>
                            <tr>
                                <td>Betrachtungsgrenzen:</td>
                                <td>{props.inqData.characteristic.observationLimit.map(
                                        element => {
                                            return element + ", "
                                        }
                                )}</td>
                            </tr>
                            <tr>
                                <td>Anwender:</td>
                                <td>{props.inqData.characteristic.targetGroup.map(
                                        element => {
                                            return element + ", "
                                        }
                                )}</td>
                            </tr>
                            <tr>
                                <td>Integrationsgrad:</td>
                                <td>{props.inqData.characteristic.integrationLevel.map(
                                        element => {
                                            return element + ", "
                                        }
                                )}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <DropdownButton variant="outline-warning" title="Änder Status Anfrage">
                        <Dropdown.Item onClick={() => setInqstatus("ACCEPTED")}>Akzeptieren</Dropdown.Item>
                        <Dropdown.Item onClick={() => setInqstatus("DENIED")}>Verweigern</Dropdown.Item>
                    </DropdownButton>
                    <Button variant="outline-warning" onClick={changeStatusOfBui}>
                        Okay
                    </Button>
                </Modal.Footer>
            </Modal>
        :   <></>
    )
}

export default EditInquiry