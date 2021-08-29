import React, { useState, useEffect, useRef, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import InquiryListAdmin from "./subComponents/inquiryList/InquiryListAdmin"

import './styles.css'

const InquiryAreaAdmin = () => {

    return (    
        <div className="inquiryListContainer">
            <InquiryListAdmin />
        </div>
    )
}



export default InquiryAreaAdmin