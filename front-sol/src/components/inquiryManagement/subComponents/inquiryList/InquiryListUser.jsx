import React, { useState, useEffect, useContext } from "react"
import { ListGroup } from "react-bootstrap"
import {WebSocketContext} from "../../../contexts/WebSocketContext"
import {AuthContext} from "../../../contexts/AuthContext"


const InquiryListUser = () => {
    const { message } = useContext(WebSocketContext)
    const { auth } = useContext(AuthContext)
    const [inquiryMap, setInquiryMap] = useState([])

    useEffect(() => {
        
        getInquiries()

    }, [message.data])

    const getInquiries = async () => {
        if(auth.data){
            await fetch('http://localhost:9003/inquiries/get-inquiries/' + auth.data.userId)
            .then(response => response.json())
            .then(data => setInquiryMap(
                data
                    .map(element => 
                        <ListGroup.Item key={element.inquiryId}>
                            Name: {element.name} <br />
                            Status: {element.inquiryStatus}
                        </ListGroup.Item>
                    )
                ))
        }
    }

    return (
        <>  
            <div className={"inquiryListAreaContainer"}>
                <div className="inquiryListBody">
                    <ListGroup className={"inquiryListContainer"}>
                        {inquiryMap}
                    </ListGroup>
                </div>
            </div>
        </>
    )
}

export default InquiryListUser