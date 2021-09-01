import React, { useState, useContext, useEffect } from "react"
import { Container, Row, Col, Button} from 'react-bootstrap'
import InquiryForm from "./subComponents/InquiryForm"
import BriefcasePlaceholder from '../../assets/briefcase.png'
import './styles.css'
const InquiryAreaGuest = () => {
    const [showInquiryForm, setShowInquiryForm] = useState(false)

    const showOnlyInquiryForm = () => {
        /*if(showInquiryList === true){
            setShowInquiryList(false)
        }*/
        setShowInquiryForm(prevState => !prevState)
    }

    return(
        <div style={{position: "relative", marginTop: "20px"}}>
            <Container className="inquiryContainerHeader">
                <p className="squareLeft">&#9725;</p>
                <p className="squareRight">&#9725;</p>
                <img src={BriefcasePlaceholder} className="imageInquiryForm" alt="Briefcase"/>   
            </Container>
            <Container className="inquiryContainerBody" fluid="md">   
                <Row>
                    <Col className="d-flex justify-content-center">
                        <div className="inquiryButtonArea">
                            <div className="inquiryButton d-grid gap-2 ">
                                <Button variant="outline-light" >
                                    Show something different
                                </Button>
                            </div>
                            <div className="inquiryButton d-grid gap-2">
                                <Button variant="outline-light" onClick={showOnlyInquiryForm}>
                                    Create inquiry
                                </Button>
                            </div>
                        </div>
                        
                    </Col>
                    <Col className="d-flex justify-content-center">
                        {
                            showInquiryForm 
                            ? <InquiryForm />
                            : <></>
                        }
                    </Col>
                </Row>   
            </Container>
        </div>
    )
}

export default InquiryAreaGuest