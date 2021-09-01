import React, {useState, useEffect, useContext} from 'react'
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap'
import SettingsUser from './SettingsUser'
import SettingsAdmin from './SettingsAdmin'
import { RoleContext } from '../../contexts/RoleContext'
const Settings = () => {
    const {role} = useContext(RoleContext)
    if(role.data === null){
        return <></>
    } else if (role.data[0].role === "User") {
        return <><SettingsUser /></>
    } else if (role.data[0].role === "Admin") {
        return <><SettingsAdmin/></>
    }
}

export default Settings