import React, { useState, useContext, useEffect } from "react"
import { Container, Row, Col} from 'react-bootstrap'
import InquiryForm from "./subComponents/InquiryForm"
const InquiryAreaGuest = () => {

    return(
        <>  
            <Container>   
                <Row>
                    <Col className="d-flex justify-content-center">

                    </Col>
                    <Col className="d-flex justify-content-center">
                        <InquiryForm />
                    </Col>
                </Row>   
            </Container>
        </>
    )
}

export default InquiryAreaGuest