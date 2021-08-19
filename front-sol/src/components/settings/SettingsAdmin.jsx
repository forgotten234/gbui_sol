import React, { useState, useEffect, useRef } from "react"
import { Form, Button } from 'react-bootstrap'
import EditInquiryArea from "./EditInquiryArea"

const SettingsAdmin = () => {
    const [receivedMessage, setReceivedMessage] = useState([])
    const [newMessage, setNewMessage] = useState(false)
    const [showEditInquiryArea, setShowEditInquiryArea] = useState(false)
    const firstUpdate = useRef(true);

    const ws = new WebSocket('ws://localhost:3030')
    const reader = new FileReader()

    useEffect(() => {
        //on mounting we set the event listener to set the receivedMessage everytime a message in incoming
        reader.addEventListener('loadend', (e) => {
            var text = e.target.result
            setReceivedMessage(text)
        });
        ws.onopen = () => {
            console.log('connected to webSocket')
        }
        ws.onmessage = e => {
            const message = e.data
            reader.readAsText(message)           
        }
      }, []);

    useEffect(() => {
        //this should stop the component to set new message to true at initial starting the component
        if(firstUpdate.current) {
            firstUpdate.current = false
            return
        } 
        console.log(receivedMessage)
        setNewMessage(true)
        //PopUp disappears after a while
        //Also a Todo! -> new component as pop up in the right corner
        setTimeout(() => {
            setNewMessage(false)
        }, 60000)
        //TODO: when new inquiry comes from guest -> rerender area where inquiriys are displayed! (API)
    }, [receivedMessage])

    /*
    logic for sending in progress status:
    1. click on new buis in overview
    2. modal open
    3. send in progress, because admin saw it
    (need component for bui items, so we can open the correct one -> send back correct props)
    useEffect(() => {
        openBui()
        sendChangeOfBuiItem()
    }, [buiItemIsClicked])

    */

    

    return (
        <> 
            {
                newMessage === true
                ?   <div>
                        New Message ! <br />                   
                        <EditInquiryArea action={() => setShowEditInquiryArea(prevState => !prevState)} editBui={showEditInquiryArea}/>
                        <Button onClick={() => setShowEditInquiryArea(prevState => !prevState)}>Edit?</Button>                 
                    </div>
                :   <></>
            }
            <div></div>
        </>
    )
}



export default SettingsAdmin