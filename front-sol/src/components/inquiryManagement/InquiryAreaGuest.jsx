import React, { useState, useContext, useEffect } from "react"
import { Form, Button } from 'react-bootstrap'
import InquiryForm from "./subComponents/InquiryForm"
const InquiryAreaGuest = () => {

    return(
        <>  
            <div className="inquiryListContainer">
                <InquiryForm />        
            </div>
        </>
    )
}

export default InquiryAreaGuest