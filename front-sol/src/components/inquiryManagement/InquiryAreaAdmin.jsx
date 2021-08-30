import React, { useState, useEffect, useRef, useContext } from "react"
import { Container, Row, Col } from 'react-bootstrap'
import InquiryListAdmin from "./subComponents/inquiryList/InquiryListAdmin"

import './styles.css'

const InquiryAreaAdmin = () => {

    return (  
        <Container>   
            <Row>
                <Col className="d-flex justify-content-center">
                    <InquiryListAdmin />
                </Col>
                <Col className="d-flex justify-content-center">

                </Col>
            </Row>   
        </Container>  
    )
}



export default InquiryAreaAdmin