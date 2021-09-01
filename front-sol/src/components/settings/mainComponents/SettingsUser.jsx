import React, {useState, useEffect, useContext} from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import {AuthContext} from '../../contexts/AuthContext'
import SettingsForm from '../subComponents/SettingsForm'
import SettingsPlaceholder from '../../../assets/settings.png'
//see below role comment
//import {RoleContext} from '../contexts/RoleContext'
import './styles.css'

export default function SettingsUser(){
    const { auth } = useContext(AuthContext)
    //maybe we need to use role here as well (User vs. Admin Settings) ---> but in main settings page! see below
    //const { role } = useContext(RoleContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState()
    const [showFormForChangingPersonalData, setShowFormForChangingPersonalData] = useState(false)
    const [showBuisList, setShowBuisList] = useState(false)

    //if no userData are there a loading component will be rendert till the userData are fetched
    return (
        <div style={{marginTop: "20px"}}>
            <Container className="settingsContainerHeader">
                <p className="squareLeft">&#9725;</p>
                <p className="squareRight">&#9725;</p>

                <img src={SettingsPlaceholder} className="imageSettings" alt="Briefcase"/>   

            </Container>
            <Container className="settingsContainerBody" fluid="md">
                <Row>
                    <Col className="d-flex justify-content-center">
                        <div className="settingsButtonArea">
                            <div className="settingsButton d-grid gap-2">
                                <Button variant="outline-light" onClick={() => setShowBuisList(prevState => !prevState)}>
                                    Show Buis
                                </Button>
                            </div>
                            <div className="settingsButton d-grid gap-2">
                                <Button variant="outline-light" onClick={() => setShowFormForChangingPersonalData(prevState => !prevState)}>
                                    Change personal data
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        {
                            showFormForChangingPersonalData
                            ?
                                <SettingsForm />
                            :   <p className="defaultParagraph">Select one of the buttons <br />to show something in here</p>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
      )
}