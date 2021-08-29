import React, {useContext, useEffect} from 'react'
import WelcomeAdmin from './WelcomeAdmin'
import WelcomeGuest from './WelcomeGuest'
import WelcomeUser from './WelcomeUser'
import {AuthContext} from '../contexts/AuthContext'
import {RoleContext} from '../contexts/RoleContext'
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap'
//simple welcome page to navigate between the existing pages (settings / logout / login)
//can be used as the main page of the system
//used to demonstrate role management right now
export default function WelcomePage(){
    const { setAuthData } = useContext(AuthContext)
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
                <Button 
                    variant="outline-info"
                    className="buttonRight"
                ><Link to="/inquiry">Inquiry</Link>
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
                <Button 
                    variant="outline-info"
                    className="buttonRight"
                ><Link to="/settings">Settings</Link>
                </Button>
                <Button 
                    variant="outline-info"
                    className="buttonRight"
                ><Link to="/inquiry">Inquiry</Link>
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
                <Button 
                    variant="outline-info"
                    className="buttonRight"
                ><Link to="/settings">Settings</Link>
                </Button>
                <Button 
                    variant="outline-info"
                    className="buttonRight"
                ><Link to="/inquiry">Inquiry</Link>
                </Button>
            </div>
        )
    }
}