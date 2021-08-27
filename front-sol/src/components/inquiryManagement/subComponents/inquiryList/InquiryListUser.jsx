import React, { useState, useEffect, useContext } from "react"
import { ListGroup } from "react-bootstrap"
import {WebSocketContext} from "../../../contexts/WebSocketContext"
import { RoleContext } from "../../../contexts/RoleContext"
import EditInquiry from "./EditInquiry"
import './styles.css' 

const isNewOrInProgress = (element) => {
    return element === "NEW" || element === "IN_PROGRESS"
}

const InquiryListUser = () => {
    const { message } = useContext(WebSocketContext)
    const { role } = useContext(RoleContext)
    const [inquiryMap, setInquiryMap] = useState([])
    const [showEditInquiryArea, setShowEditInquiryArea] = useState(false)
    const [dataForEditInquiryArea, setDataForEditInquiryArea] = useState({})
    //need this extra state for getting Inquiries after at one is worked on
    //beacuse if we do it with the showEditInquiryArea state we need one api call more
    const [editInquiryAreaIsClosed, setEditInquiryAreaIsClosed] = useState(0)

    useEffect(() => {
        getInquiries()
        //we use showEditInquiryArea, beacuse when an Item is changed via the modal, we can check
        //if the status of the inquiries has changed while it is 
    }, [message.data, editInquiryAreaIsClosed])

    const showEditInquiryAreaAndSetBuiDataForItem = (data) => {
        setDataForEditInquiryArea(data)
        setShowEditInquiryArea(prevState => !prevState)
    }

    //for below action in EditInquiry
    const closeEditInquiryAreaAndGetInquiriesAgain = () => {
        setShowEditInquiryArea(prevState => !prevState)
        setEditInquiryAreaIsClosed(prevState => prevState + 1)
    }

    const getInquiries = async () => {
        await fetch('http://localhost:9003/inquiries/get-inquiries/' + role.user)
            .then(response => response.json())
            .then(data => setInquiryMap(
                data
                    .filter(element => isNewOrInProgress(element.inquiryStatus))
                    .map(element => 
                        <ListGroup.Item 
                            key={element.inquiryId}
                            onClick={() => showEditInquiryAreaAndSetBuiDataForItem(element)}
                        >
                            {element.name}
                        </ListGroup.Item>
                    )
                ))
    }

    return (
        <>
            Inquiries:
            <ListGroup className="inquiryListContainer">
                {inquiryMap}
            </ListGroup>
            <EditInquiry 
                editInq={showEditInquiryArea} 
                inqData={dataForEditInquiryArea} 
                action={closeEditInquiryAreaAndGetInquiriesAgain}
            />
        </>
    )
}

export default InquiryListUser