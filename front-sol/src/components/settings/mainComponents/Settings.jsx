import React, {useState, useEffect, useContext} from 'react'
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap'
import SettingsUser from './SettingsUser'
//import SettingsAdmin from './SettingsAdmin'

const Settings = () => {
    return (
        <>  
            <SettingsUser />
        </>
    )
}

export default Settings