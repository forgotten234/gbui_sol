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
            return <p className="defaultParagraph">Wählen Sie einer der Button, <br />um hier etwas anzuzeigen.</p>
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
                                <Button variant="outline-warning" onClick={showOnlyInquiryList}>
                                    Anfragen anzeigen
                                </Button>
                            </div>
                            <div className="inquiryButton d-grid gap-2">
                                <Button variant="outline-warning" onClick={showOnlyInquiryForm}>
                                    Anfrage hinzufügen
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