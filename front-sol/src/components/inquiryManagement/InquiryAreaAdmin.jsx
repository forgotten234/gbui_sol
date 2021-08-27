import React, { useState, useEffect, useRef, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import EditInquiry from "./subComponents/inquiryList/EditInquiry"
import InquiryList from "./subComponents/inquiryList/InquiryListAdmin"
import {WebSocketContext} from "../contexts/WebSocketContext"

const InquiryAreaAdmin = () => {
    const { setMessageData } = useContext(WebSocketContext)
    //actual Message
    const [receivedMessage, setReceivedMessage] = useState([])
    //for the pop up in the right vorner to show there is a new message (show or not show)
    const [newMessage, setNewMessage] = useState(false)
    //for modal where you can edit the inquiry (show or not show)
    const [showEditInquiryArea, setShowEditInquiryArea] = useState(false)
    //for not calling useEffect at mounting
    const firstUpdate = useRef(true);

    const ws = new WebSocket('ws://localhost:3030')
    const reader = new FileReader()

    //useEffect for websocket
    //here we add the EventListener when the connection to the web socket is established and remove it afterwards
    //so that there isn't an eventListener left when the component unmounts
    useEffect(() => {
        ws.onopen = () => {
            console.log('connected to webSocket')
            reader.addEventListener('loadend', webSocketEventListenerMethod)
        }
        //here we use the reader with the eventlistener
        //also here: we transform the data via readAsText and then the method in the eventListener is called
        //afterwards we make sure that the component knows that there is a new message
        //then the component renders the object which shows that ther is a new message
        ws.onmessage = e => {
            reader.readAsText(e.data)  
            setNewMessage(true) 
        }
        //remove eventListener on Closing
        ws.onclose = () => {
            console.log('disconnected to webSocket')
            reader.removeEventListener('loadend', webSocketEventListenerMethod)
        }

    }, [])

    //need this extra method to pass to the removeEventListenerMethod
    //this method actually set the receivedMessage to the data object we send from the guest (see InquiryFormGuest)
    //also we transform the data here correctly that we have the object in json format
    const webSocketEventListenerMethod = (e) => {
        var text = e.target.result
        setReceivedMessage(JSON.parse(text))
        //data for gloabal use of the websockets
        setMessageData(JSON.parse(text))
    }

    //useEffect for receiving a new message
    //here we set a timeout for the object which shows that there is a new message
    //also rerender the area where all inquiries are shown which haven't the status "NEW" or "In_PROCESS"
    useEffect(() => {
        //this should stop the component to set new message to true at initial starting the component
        if(firstUpdate.current) {
            firstUpdate.current = false
            return
        } 
        console.log(receivedMessage) 

        //PopUp disappears after a while
        //Also a Todo! -> new component as pop up in the right corner
        setTimeout(() => {
            setNewMessage(false)            
        }, 6000)
        
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
                        <EditInquiry action={() => setShowEditInquiryArea(prevState => !prevState)} editBui={showEditInquiryArea}/>
                        <Button onClick={() => setShowEditInquiryArea(prevState => !prevState)}>Edit?</Button>                 
                    </div>
                :   <></>
            }
            <div>
                <InquiryList />
            </div>
        </>
    )
}



export default InquiryAreaAdmin