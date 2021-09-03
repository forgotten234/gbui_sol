import React, { useState, useContext, useEffect } from "react"
import { Container, Row, Col, Button} from 'react-bootstrap'
import InquiryForm from "./subComponents/inquiryForm/InquiryForm"
import InquiryListUser from "./subComponents/inquiryList/InquiryListUser"
import BriefcasePlaceholder from '../../assets/briefcase.png'
import './styles.css'

const InquiryAreaUser = () => {
    const [showInquiryList, setShowInquiryList] = useState(false)
    const [showInquiryForm, setShowInquiryForm] = useState(false)

    const showOnlyInquiryList = () => {
        if(showInquiryForm === true){
            setShowInquiryForm(false)
        }
        setShowInquiryList(prevState => !prevState)
    }

    const showOnlyInquiryForm = () => {
        if(showInquiryList === true){
            setShowInquiryList(false)
        }
        setShowInquiryForm(prevState => !prevState)
    }

    const showSelectedArea = () => {
        if(showInquiryList === true){
            return <InquiryListUser />
        } else if (showInquiryForm === true) { 
            return <InquiryForm />
        }else {
            return <p className="defaultParagraph">Select one of the buttons <br />to show something in here</p>
        }
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
                                <Button variant="outline-light" onClick={showOnlyInquiryList}>
                                    Show inquiries
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
                            showSelectedArea()
                        }
                    </Col>
                </Row>   
            </Container>
        </div>
    )
}

export default InquiryAreaUser