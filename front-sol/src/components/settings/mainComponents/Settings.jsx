import React, {useState, useEffect, useContext} from 'react'
import { Link } from "react-router-dom"
import { Container } from 'react-bootstrap'
import SettingsUser from './SettingsUser'
import SettingsAdmin from './SettingsAdmin'
import { RoleContext } from '../../contexts/RoleContext'
const Settings = () => {
    const {role} = useContext(RoleContext)
    if(role.data === null){
        return (
            <Container className="text-center mt-2 ">
               <h5 className={"settingsNotLoggedIn"}>Please register or log in !</h5>
            </Container>
        )
    } else if (role.data[0].role === "User") {
        return <><SettingsUser /></>
    } else if (role.data[0].role === "Admin") {
        return <><SettingsAdmin/></>
    }
}

export default Settings