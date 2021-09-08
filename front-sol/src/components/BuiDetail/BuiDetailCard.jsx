import React, {useState,useEffect,useContext} from 'react'
import './styles.css'
import {Container, Button, Accordion, Card, Col} from 'react-bootstrap'
import {CaretDownSquare, CaretUpSquare} from 'react-bootstrap-icons'

function BuiDetailCard(props){

    const mapCharacteristic = (list) => {
        return(
            list ?
                list.map(item=>{return(<Button variant="success" className="text-center p-1 m-1">{item}</Button>)})
            : <></>
        )
    }
  

    return(
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="secondary" eventKey={props.eventKey}>
                    {props.title}
                    <CaretDownSquare className="mx-2 float-right"/>
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={props.eventKey}>
                    <Card.Body>
                        <Container className="d-flex flex-wrap">
                        {mapCharacteristic(props.item)}
                        </Container>
                        
                    </Card.Body>      
                </Accordion.Collapse> 
            </Card>
    )
}
export default BuiDetailCard