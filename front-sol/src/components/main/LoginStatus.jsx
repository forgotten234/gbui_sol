import React, {useContext} from 'react'
import WelcomeAdmin from './WelcomeAdmin'
import WelcomeGuest from './WelcomeGuest'
import WelcomeUser from './WelcomeUser'
import {AuthContext} from '../contexts/AuthContext'
import {RoleContext} from '../contexts/RoleContext'
import { Link, useHistory } from "react-router-dom"
import { Button } from 'react-bootstrap'

//simple welcome page to navigate between the existing pages (settings / logout / login)
//can be used as the main page of the system
//used to demonstrate role management right now
function LoginStatus(){
    const { setAuthData } = useContext(AuthContext)
    const { role, setRoleData } = useContext(RoleContext)

    const history = useHistory()

    const handleClick = location => () => {
        history.push(location)
        /*setAuthData(null)
        setRoleData(null)*/
    }

    // const onLogOut = () => {
    //     setAuthData(null)
    //     setRoleData(null)
    // }

    if(role.data === null){
        return (
            <div>
               <Button 
                    variant="outline-dark"
                    onClick={handleClick("/sign-in")}
                    className="buttonRight"
                >
                    Login
                </Button>
                <Button 
                    variant="outline-dark"
                    className="buttonRight"
                    onClick={handleClick("/inquiry")}
                >
                    Antrag
                </Button>
            </div>
        )
    } else if(role.data[0].role === "User"){
        return (
            <div>
            <Button 
                 variant="outline-dark"
                 onClick={handleClick("/settings")}
                 className="buttonRight"
             >
                 Settings
             </Button>
             <Button 
                 variant="outline-dark"
                 className="buttonRight"
                 onClick={handleClick("/inquiry")}
             >
                 Antrag
             </Button>
         </div>
        )
    } else if(role.data[0].role === "Admin" ){
        return (
            <div>
            <Button 
                 variant="outline-dark"
                 onClick={handleClick("/settings")}
                 className="buttonRight"
             >
                 Settings
             </Button>
             <Button 
                 variant="outline-dark"
                 className="buttonRight"
                 onClick={handleClick("/inquiry")}
             >
                 Antrag
             </Button>
         </div>
        )
    }
}
export default LoginStatus