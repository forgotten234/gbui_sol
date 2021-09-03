import React, {useState,useEffect} from 'react'
import './styles.css'
import {Container, Card, Row,Col, Button, Carousel} from 'react-bootstrap'
import { EmojiSmile, Star, StarFill } from 'react-bootstrap-icons'
import ProfilePicturePlaceholder from '../../assets/user.png'

function BuiCard(props){

const handleClick = () => {

}

    return(
        <div>
                <Card bg="light" style={{ width: '25rem'}} className="mx-2 card-container">
                    <Row className="card-container">
                        <Col xs={4}>
                            <div className="card-logo-container rounded mx-3 mt-3 md-block"> 
                                <img src={props.item.logo} className="card-logo"></img>
                            </div> 
                        </Col>
                        <Col xs={8}>
                            <Card.Body className="card-container">
                                <Card.Title >{props.item.name}</Card.Title>
                                <Card.Text>
                                    {props.item.description}
                                </Card.Text>
                                <Card.Text>
                                    <h5>Hersteller:</h5>
                                    {props.item.manufacturer.map(item=>{return(<p>{item}</p>)})}
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                    <Card.Footer className="d-flex justify-content-between align-items-center">
                        <Button variant="outline-dark" onClick={handleClick}>Details</Button>
                        <div>
                        <StarFill/>
                        <span> {props.item.rating}</span>
                        </div>
                    </Card.Footer>
                </Card>
        </div>
    )
}
export default BuiCard