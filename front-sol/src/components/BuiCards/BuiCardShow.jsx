import React, {useState,useEffect} from 'react'
import './styles.css'
import {CardGroup, Container, Row, Col, Carousel, CarouselItem, Button} from 'react-bootstrap'
import BuiCard from "./BuiCard"


function BuiCardShow(){

    const [BuiList, setBuiList] = useState([])
    const [BuiRatedList, setBuiRatedList] = useState([])
    const [BuiCountList, setBuiCountList] = useState([])
    const [LoadedBuis, setLoadedBuis] = useState([])
    const [LoadRatedList, setLoadRatedList] = useState(3)
    const [LoadCountList, setLoadCountList] = useState(3)

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

    const displayList = (list, count) =>{
        var newList = []
        for(var i = 0; i<count; i++){
            newList.push(list[i])
        }
        return(   
            showItems(newList)
        )
    }


    const showItems=(list)=>{
        return(
            list.map(item => {return(<Col><BuiCard item={item}/></Col>)})
        )
    }

    const handleClickRated = () => {
        if(BuiRatedList.length > LoadRatedList + 3)
        setLoadRatedList(prevState => prevState + 3)
        else
        setLoadRatedList(prevState => prevState + BuiRatedList.length - LoadRatedList)
    }
    const handleClickZeroRated = () => {
        setLoadRatedList(3)
    }
    const handleClickCount= () => {
        if(BuiCountList.length > LoadCountList + 3)
        setLoadCountList(prevState => prevState + 3)
        else
        setLoadCountList(prevState => prevState + BuiCountList.length - LoadCountList)
    }
    const handleClickZeroCount = () => {
        setLoadCountList(3)
    }
  

    return(
        <div>
            <Container>
                <div className="my-3">
                    <h4 className="text-uppercase">Hoch Bewertete Buis</h4>
                    <Row className="d-flex align-item-stretch" dataToggle="collapse">
                        {BuiRatedList[0] != null ?  displayList(BuiRatedList,LoadRatedList) : <p>Loading...</p>}
                        {BuiRatedList.length != LoadRatedList ? 
                            <Button variant="outline-secondary" size="lg" block className="my-2" onClick={handleClickRated}>Mehr...</Button>
                            :
                            <Button variant="outline-secondary" size="lg" block className="my-2" onClick={handleClickZeroRated}>Weniger...</Button>
                        }
                    </Row>
                </div>
                <div className="my-3">
                <h4 className="text-uppercase">Meistgesehene Buis</h4>
                    <Row className="d-flex align-item-stretch">
                    {BuiCountList[0] != null ?  displayList(BuiCountList,LoadCountList) : <p>Loading...</p>}
                    {BuiCountList.length != LoadCountList ? 
                            <Button variant="outline-secondary" size="lg" block className="my-2" onClick={handleClickCount}>Mehr...</Button>
                            :
                            <Button variant="outline-secondary" size="lg" block className="my-2" onClick={handleClickZeroCount}>Weniger...</Button>
                        }
                    </Row> 
                </div>
  
            </Container>
        </div>
    )
}
export default BuiCardShow