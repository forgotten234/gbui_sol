import React, {useState, useEffect, useContext} from 'react'
import './styles.css'
import { Button, Container, Row, Col } from 'react-bootstrap'
import SettingsPlaceholder from '../../../assets/settings.png'
import SettingsForm from '../subComponents/SettingsForm'
import UserList from '../subComponents/UserList'

const SettingsAdmin = () => {
    const [showFormForChangingPersonalData, setShowFormForChangingPersonalData] = useState(false)
    const [showBuisList, setShowBuisList] = useState(false)
    const [showUsers, setShowUsers] = useState(false)


    const showSelectedArea = () => {
        if(showFormForChangingPersonalData === true){
            return <SettingsForm />
        } else if (showUsers === true) {
            return <UserList />
        } else {
            return <p className="defaultParagraph">Select one of the buttons <br />to show something in here</p>
        }
    }

    return(
        <div style={{marginTop: "50px"}}>
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
                                    Maintain buis
                                </Button>
                            </div>
                            <div className="settingsButton d-grid gap-2">
                                <Button variant="outline-light" onClick={() => setShowFormForChangingPersonalData(prevState => !prevState)}>
                                    Change personal data
                                </Button>
                            </div>
                            <div className="settingsButton d-grid gap-2">
                                <Button variant="outline-light" onClick={() => setShowUsers(prevState => !prevState)}>
                                    Maintain user
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

export default SettingsAdmin