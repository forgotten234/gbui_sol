import React, { useState, useContext, useEffect } from "react"
import { Form, Button } from 'react-bootstrap'
import InquiryForm from "./subComponents/InquiryForm"
import InquiryListUser from "./subComponents/inquiryList/InquiryListUser"
import './styles.css'

const InquiryAreaUser = () => {

    return(
        <>      
            <div className="inquiryListContainer">
                <InquiryListUser />
            </div>
            <br />
            <div className="inquiryFormContainer">
                <InquiryForm />
            </div>
        </>
    )
}

export default InquiryAreaUser