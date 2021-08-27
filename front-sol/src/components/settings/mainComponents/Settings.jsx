import React, {useState, useEffect, useContext} from 'react'
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap'
//import SettingsUser from './SettingsUser'
//import SettingsAdmin from './SettingsAdmin'

const Settings = () => {
    return (
        <>
            <Button variant="outline-info">
                <Link to="/">Welcome page</Link>
            </Button>
        </>
    )
}

export default Settings