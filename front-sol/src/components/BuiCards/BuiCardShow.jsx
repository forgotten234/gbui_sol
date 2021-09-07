import React, {useState,useEffect} from 'react'
import './styles.css'
import {CardGroup, Container, Row, Col, Carousel, CarouselItem} from 'react-bootstrap'
import BuiCard from "./BuiCard"

function BuiCardShow(){

    const [BuiList, setBuiList] = useState([])
    const [BuiRatedList, setBuiRatedList] = useState([])
    const [BuiCountList, setBuiCountList] = useState([])

    const getItems = async () => {
        await fetch("http://localhost:9004/buis/get-buis")
        .then(response => response.json())
        .then((items) => {
            setBuiList(items)
            setBuiRatedList(items.sort((a,b)=>b.rating - a.rating))
            setBuiCountList(items.sort((a,b)=>b.count - a.count))
        })    
    } 
    useEffect(()=> {
        getItems()
    },[])

    const showItems=(list)=>{
        if(BuiList.length % 2 === 0){
            return(
                list.map(item => {return(<Col><BuiCard item={item}/></Col>)})
            )
        } else {
            return(
                <>
                    {
                        list.map(item => {return(<Col><BuiCard item={item}/></Col>)})
                    }
                    <Col></Col>
                </>
            )
        }
    }
  

    return(
        <div>
            <Container>
                <div className="my-3">
                    <h4 className="text-uppercase">Hoch Bewertete Buis</h4>
                    <Row className="d-flex align-item-stretch" dataToggle="collapse">
                        {showItems(BuiRatedList)}
                    </Row>
                </div>
                <div className="my-3">
                <h4 className="text-uppercase">Meistgesehene Buis</h4>
                    <Row className="d-flex align-item-stretch">
                        {showItems(BuiCountList)}
                    </Row> 
                </div>
  
            </Container>
        </div>
    )
}
export default BuiCardShow