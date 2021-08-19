import React, { useState, useEffect } from "react"
import { Form, Button, Modal } from 'react-bootstrap'

const EditInquiryArea = (props) => {

    const handleClose = () => {
        props.action()
    }

    return(
        <Modal show={props.editBui} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit BUI</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button>
                    Finish
                </Button>
                <Button>
                    Discard
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditInquiryArea