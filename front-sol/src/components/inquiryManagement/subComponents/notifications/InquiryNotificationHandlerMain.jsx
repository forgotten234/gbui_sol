import React, {useContext} from "react"
import { RoleContext } from "../../../contexts/RoleContext"
import InquiryNotificationHandlerAdmin from "./InquiryNotificationHandlerAdmin"
import InquiryNotificationHandlerUser from "./InquiryNotificationHandlerUser"
const InquiryNotificationHandlerMain = ({children}) => {
    const {role} = useContext(RoleContext)
    if(role.data === null){
        return <>{children}</>
    } else if (role.data[0].role === "User") {
        return (
            <InquiryNotificationHandlerUser>
                {children}
            </InquiryNotificationHandlerUser>
        )
    } else if (role.data[0].role === "Admin") {
        return (
            <InquiryNotificationHandlerAdmin>
                {children}
            </InquiryNotificationHandlerAdmin>
        )
    }
}

export default InquiryNotificationHandlerMain