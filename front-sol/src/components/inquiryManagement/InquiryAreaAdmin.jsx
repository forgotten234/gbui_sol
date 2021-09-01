import React, { useState, useEffect, useRef, useContext } from "react"
import { Container, Row, Col, Button } from 'react-bootstrap'
import InquiryListAdmin from "./subComponents/inquiryList/InquiryListAdmin"
import BriefcasePlaceholder from '../../assets/briefcase.png'
import './styles.css'

const InquiryAreaAdmin = () => {
    const [showInquiryList, setShowInquiryList] = useState(false)

    const showOnlyInquiryList = () => {
        /*if(showInquiryForm === true){
            setShowInquiryForm(false)
        }*/
        setShowInquiryList(prevState => !prevState)
    }
    return (  
        <div style={{position: "relative", marginTop: "50px"}}>
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
                                <Button variant="outline-light" onClick={showOnlyInquiryList}>
                                    Show Inquiry List
                                </Button>
                            </div>
                        </div>
                        
                    </Col>
                    <Col className="d-flex justify-content-center">
                        {
                            showInquiryList 
                            ? <InquiryListAdmin />
                            : <></>
                        }
                    </Col>
                </Row>   
            </Container>
        </div>
    )
}



export default InquiryAreaAdmin