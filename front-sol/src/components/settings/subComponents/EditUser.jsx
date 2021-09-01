import React, { useState,  useContext } from "react"
import { Button, Modal, Table } from 'react-bootstrap'

const EditUser = (props) => {

    const deleteRole = async () => {
        await fetch('http://localhost:9000/role/delete-role/' + props.userData.userId, {
            method: 'DELETE',
            body: JSON.stringify({
                userId: props.userId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    const deleteUser = async () => {
        await fetch('http://localhost:9001/users/delete-user/' + props.userData.userId, {
            method: 'DELETE',
            body: JSON.stringify({
                userId: props.userId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(deleteRole())
        .then(props.action())
    }

    return (
        props.userData.adress ?
            <Modal show={props.editUser} onHide={() => props.action()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user: {props.userData.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{props.userData.name}</td>
                            </tr>
                            <tr>
                                <td>Vorname:</td>
                                <td>{props.userData.surname}</td>
                            </tr>
                            <tr>
                                <td>E-Mail:</td>
                                <td>{props.userData.email}</td>
                            </tr>
                            <tr>
                                <td>Straße:</td>
                                <td>{props.userData.adress.street}</td>
                            </tr>
                            <tr>
                                <td>Postleitzahl:</td>
                                <td>{props.userData.adress.cp}</td>
                            </tr>
                            <tr>
                                <td>Stadt:</td>
                                <td>{props.userData.adress.town}</td>
                            </tr>
                            <tr>
                                <td>Land:</td>
                                <td>{props.userData.adress.country}</td>
                            </tr>
                            <tr>
                                <td>Firma:</td>
                                <td>{props.userData.firm}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => deleteUser()}>Delete User</Button>
                    <Button onClick={() => props.action()}>Decline</Button>
                </Modal.Footer>
            </Modal>
        : <></>
    )
}

export default EditUser

/*
props.userData.adress ?
            <Modal show={props.editUser} onHide={() => props.action()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user: {props.userData.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{props.userData.name}</td>
                            </tr>
                            <tr>
                                <td>Vorname:</td>
                                <td>{props.userData.surname}</td>
                            </tr>
                            <tr>
                                <td>E-Mail:</td>
                                <td>{props.userData.email}</td>
                            </tr>
                            <tr>
                                <td>Straße:</td>
                                <td>{props.userData.adress.street}</td>
                            </tr>
                            <tr>
                                <td>Postleitzahl:</td>
                                <td>{props.userData.adress.cp}</td>
                            </tr>
                            <tr>
                                <td>Stadt:</td>
                                <td>{props.userData.adress.town}</td>
                            </tr>
                            <tr>
                                <td>Land:</td>
                                <td>{props.userData.adress.country}</td>
                            </tr>
                            <tr>
                                <td>Firma:</td>
                                <td>{props.userData.firm}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => deleteUser()}>Delete User</Button>
                    <Button onClick={() => props.action()}>Decline</Button>
                </Modal.Footer>
            </Modal>
        : <></>


        <Modal>
            <Modal.Header>
                <Modal.Title>bla</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>

                </Table>
            </Modal.Body>
        </Modal>
*/