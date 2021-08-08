import React, {useState, useEffect, useContext} from 'react'
import WelcomeAdmin from './WelcomeAdmin'
import WelcomeGuest from './WelcomeGuest'
import WelcomeUser from './WelcomeUser'
import {AuthContext} from '../contexts/AuthContext'
import {RoleContext} from '../contexts/RoleContext'
import { Link } from "react-router-dom"
import { Navbar, Nav, Button } from 'react-bootstrap'
export default function WelcomePage(){
    const [activeRole, setActiveRole] = useState()
    const { auth, setAuthData } = useContext(AuthContext)
    const { role, setRoleData } = useContext(RoleContext)

    const onLogOut = () => {
        setAuthData(null)
        setRoleData(null)
    }

    if(role.data === null){
        return (
            <div>
                <WelcomeGuest />
                <Button 
                    variant="outline-info"
                    onClick={onLogOut}
                    className="buttonRight"
                ><Link to="/sign-in">Sign In</Link>
                </Button>
            </div>
        )
    } else if(role.data[0].role === "User"){
        return (
            <div>
                <WelcomeUser />
                <Button 
                    variant="outline-info"
                    onClick={onLogOut}
                    className="buttonRight"
                >Log Out
                </Button>
            </div>
        )
    } else if(role.data[0].role === "Admin" ){
        return (
            <div>
                <WelcomeAdmin />
                <Button 
                    variant="outline-info"
                    onClick={onLogOut}
                    className="buttonRight"
                >Log Out
                </Button>
            </div>
        )
    }
}