import React, { useContext } from "react"
import {RoleContext} from '../contexts/RoleContext'
import InquiryAreaGuest from "./InquiryAreaGuest"
import InquiryAreaUser from "./InquiryAreaUser"
import InquiryAreaAdmin from "./InquiryAreaAdmin"

import Navigationbar from "../main/Navigationbar"

const InquiryMainPage = () => {
    const {role} = useContext(RoleContext)
    if(role.data === null){
        return <><Navigationbar/><InquiryAreaGuest /></>
    } else if (role.data[0].role === "User") {
        return <><Navigationbar/><InquiryAreaUser /></>
    } else if (role.data[0].role === "Admin") {
        return <><Navigationbar/><InquiryAreaAdmin/></>
    }
}

export default InquiryMainPage