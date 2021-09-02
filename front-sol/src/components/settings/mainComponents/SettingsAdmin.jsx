import React, {useState, useEffect, useContext} from 'react'
import './styles.css'
import { Button, Container, Row, Col } from 'react-bootstrap'
import SettingsPlaceholder from '../../../assets/settings.png'
import SettingsForm from '../subComponents/SettingsForm'
import UserList from '../subComponents/UserList'
import BuiList from '../subComponents/BuiList'

const SettingsAdmin = () => {
    const [showFormForChangingPersonalData, setShowFormForChangingPersonalData] = useState(false)
    const [showBuisList, setShowBuisList] = useState(false)
    const [showUsers, setShowUsers] = useState(false)

    const showOnlyForm = () => {
        if(showBuisList === true || showUsers === true){
            setShowBuisList(false)
            setShowUsers(false)
        }
        setShowFormForChangingPersonalData(prevState => !prevState)
    }

    const showOnlyBuisList = () => {
        if(showFormForChangingPersonalData === true || showUsers === true){
            setShowFormForChangingPersonalData(false)
            setShowUsers(false)
        }
        setShowBuisList(prevState => !prevState)
    }

    const showOnlyUsers = () => {
        if(showFormForChangingPersonalData === true || showBuisList === true){
            setShowBuisList(false)
            setShowFormForChangingPersonalData(false)
        }
        setShowUsers(prevState => !prevState)
    }

    const showSelectedArea = () => {
        if(showFormForChangingPersonalData === true){
            return <SettingsForm />
        } else if (showUsers === true) {
            return <UserList />
        } else if (showBuisList === true) { 
            return <BuiList />
        }else {
            return <p className="defaultParagraph">Select one of the buttons <br />to show something in here</p>
        }
    }

    return(
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
                                <Button variant="outline-light" onClick={showOnlyBuisList}>
                                    Maintain buis
                                </Button>
                            </div>
                            <div className="settingsButton d-grid gap-2">
                                <Button variant="outline-light" onClick={showOnlyForm}>
                                    Change personal data
                                </Button>
                            </div>
                            <div className="settingsButton d-grid gap-2">
                                <Button variant="outline-light" onClick={showOnlyUsers}>
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