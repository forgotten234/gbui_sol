import React, {useState, useEffect, useContext} from 'react'
import './styles.css'
import { Button, Container, Row, Col } from 'react-bootstrap'
import SettingsPlaceholder from '../../../assets/settings.png'
import SettingsForm from '../subComponents/SettingsForm'
import UserList from '../subComponents/UserList'
import BuiListAdmin from '../subComponents/buiList/BuiListAdmin'

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
            return <BuiListAdmin />
        }else {
            return <p className="defaultParagraph">Wählen Sie einer der Button, <br />um hier etwas anzuzeigen.</p>
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
                                <Button variant="outline-warning" onClick={showOnlyBuisList}>
                                    Buis verwalten
                                </Button>
                            </div>
                            <div className="settingsButton d-grid gap-2">
                                <Button variant="outline-warning" onClick={showOnlyForm}>
                                    Persönliche Daten ändern
                                </Button>
                            </div>
                            <div className="settingsButton d-grid gap-2">
                                <Button variant="outline-warning" onClick={showOnlyUsers}>
                                    User verwalten
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