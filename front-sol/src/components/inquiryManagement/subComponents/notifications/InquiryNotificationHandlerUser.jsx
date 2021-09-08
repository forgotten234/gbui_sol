import {WebSocketContext} from "../../../contexts/WebSocketContext"
import { AuthContext } from "../../../contexts/AuthContext"
import React, { useState, useEffect, useRef, useContext } from "react"
import { ToastContainer, toast } from 'react-toastify';
import '../../styles.css'
import { Link } from "react-router-dom"

const InquiryNotificationHandlerUser = ({children}) => {
    const {auth} = useContext(AuthContext)
    const { message, setMessageData } = useContext(WebSocketContext)
    //actual Message
    const [receivedMessage, setReceivedMessage] = useState([])

    //for not calling useEffect at mounting
    const firstUpdate = useRef(true);


    const ws = new WebSocket('ws://141.45.92.192:9003')
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
        var text = JSON.parse(e.target.result)
        setReceivedMessage(prevState => [...prevState, text])
        if(text.updatedMessage === true && text.data.inq.userId !== auth.data.userId){
            toast.info(
                <div>
                    Der Status der Anfrage für das BUI {text.data.inq.name} hat sich geändert!<br />
                    <Link to="/inquiry">Gehe zu Anfragen</Link>
                </div>,          
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                } )
            
        }
        //data for gloabal use of the websockets
        setMessageData(text)
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

    }, [receivedMessage])

    return (
        <> 
            <ToastContainer progressClassName="toastProgress" bodyClassName="toastBody"/>
            {children}
        </>
    )
}

export default InquiryNotificationHandlerUser