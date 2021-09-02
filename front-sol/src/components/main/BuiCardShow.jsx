import React, {useState,useEffect} from 'react'
import './styles.css'
import {Container} from 'react-bootstrap'
import BuiCard from './BuiCard'

function BuiCardShow(){

    return(
        <div >
            <h4 className="text-uppercase">Hoch Bewertete Buis</h4>
            <BuiCard/>
        </div>
    )
}
export default BuiCardShow