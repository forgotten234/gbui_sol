import React, { useContext } from "react"
import {RoleContext} from '../contexts/RoleContext'
import InquiryAreaGuest from "./InquiryAreaGuest"
import InquiryAreaUser from "./InquiryAreaUser"
import InquiryAreaAdmin from "./InquiryAreaAdmin"

const InquiryMainPage = () => {
    const {role} = useContext(RoleContext)
    if(role.data === null){
        return <><InquiryAreaGuest /></>
    } else if (role.data[0].role === "User") {
        return <><InquiryAreaUser /></>
    } else if (role.data[0].role === "Admin") {
        return <><InquiryAreaAdmin/></>
    }
}

export default InquiryMainPage