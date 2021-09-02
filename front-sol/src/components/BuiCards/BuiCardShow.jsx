import React, {useState,useEffect} from 'react'
import './styles.css'
import {CardGroup, Container, Row, Col} from 'react-bootstrap'
import BuiCard from "./BuiCard"

function BuiCardShow(){

    const [BuiList, setBuiList] = useState([])

    const getItems = async () => {
        await fetch("http://localhost:9004/buis/get-buis")
        .then(response => response.json())
        .then((items) => {
            setBuiList(items)
        })    
    } 
    useEffect(()=> {
        getItems()
    },[])

    const showItems=()=>{
        return(
            BuiList.map(item => {return(<Col><BuiCard item={item}/></Col>)})
        )
    }
    // const showRatedItems=()=>{

    // }

    return(
        <div>
            <Container>
              <h4 className="text-uppercase">Hoch Bewertete Buis</h4>
              <Row md={1} lg={3} className="">
                    {showItems()}
              </Row>
              
            </Container>
        </div>
    )
}
export default BuiCardShow