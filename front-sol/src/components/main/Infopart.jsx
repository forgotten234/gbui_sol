import React, {useState,useEffect} from 'react'
import './styles.css'
import {Container} from 'react-bootstrap'
import LoginStatus from './LoginStatus'

function Infopart(){

    return(
        <div>
            <Container className="text-center text-info mt-2">
                Um BUIS hinzufügen zu können, logge dich bitte ein.
            </Container>
            
            <Container className="text-center mt-2">
                <h1>SOL BUIS</h1>
                <p>Ein webbasiertes Werkzeug für die Registrierung und Recherche von Betrieblichen Umweltinformationssystemen</p>
            </Container>
        </div>
    )
}
export default Infopart