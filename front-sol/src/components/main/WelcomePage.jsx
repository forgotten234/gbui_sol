import React, {useContext} from 'react'
import { Link } from "react-router-dom"
import { Button, Navbar } from 'react-bootstrap'
import Navigationbar from './Navigationbar'
import Infopart from './Infopart'
import BuiCardShow from './BuiCardShow'

//simple welcome page to navigate between the existing pages (settings / logout / login)
//can be used as the main page of the system
//used to demonstrate role management right now
export default function WelcomePage(){
   

        return (
            <div>
                <Navigationbar/>
                <Infopart/>
                <BuiCardShow/>
                
            </div>
        )
   
}