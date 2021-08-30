import React, { useState, useContext, useEffect } from "react"
import { Container, Row, Col} from 'react-bootstrap'
import InquiryForm from "./subComponents/InquiryForm"
import InquiryListUser from "./subComponents/inquiryList/InquiryListUser"
import './styles.css'

const InquiryAreaUser = () => {

    return(
        <Container>   
            <Row>
                <Col className="d-flex justify-content-center">
                    <InquiryListUser />
                </Col>
                <Col className="d-flex justify-content-center">
                    <InquiryForm />
                </Col>
            </Row>   
        </Container>
    )
}

export default InquiryAreaUser