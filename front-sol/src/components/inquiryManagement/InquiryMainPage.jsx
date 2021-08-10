import React, { useContext } from "react"
import {RoleContext} from '../contexts/RoleContext'
import InquiryFormGuest from "./InquiryFormGuest"

const InquiryMainPage = () => {
    const {role} = useContext(RoleContext)
    if(role.data === null){
        return <InquiryFormGuest />
    } else if (role.data[0].role === "User") {
        return <></>
    } else if (role.data[0].role === "Admin") {
        return <></>
    }
}

export default InquiryMainPage