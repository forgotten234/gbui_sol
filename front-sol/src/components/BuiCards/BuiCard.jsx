import React, {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom"
import './styles.css'
import {Container, Card, Row,Col, Button, Carousel} from 'react-bootstrap'
import { EmojiSmile, Star, StarFill } from 'react-bootstrap-icons'
import ProfilePicturePlaceholder from '../../assets/user.png'

function BuiCard(props){
const history = useHistory()
const handleClick = () => {
    history.push({
        pathname: "/detail/"+props.item._id,
    })
}

    return(
        <Card style={{ width: '25rem'}} className="mx-2 card-container border-warning">
            <Row className="card-container">
                <Col xs={4}>
                    <div className="card-logo-container rounded mx-3 mt-3 md-block"> 
                        <img src={props.item.logo} className="card-logo"></img>
                    </div> 
                </Col>
                <Col xs={8}>
                    <Card.Body className="card-container">
                        <Card.Title >{props.item.name}</Card.Title>
                        <Card.Text className="card-text-hidden ">
                            {props.item.description}
                        </Card.Text>
                        <p>...</p>
                        <Card.Text>
                            <h5>Hersteller:</h5>
                            {props.item.manufacturer.map(item=>{return(<p className="m-0">{item}</p>)})}
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
            <Card.Footer style={{backgroundColor: "white"}} className="d-flex justify-content-between align-items-center border-warning">
                <Button variant="outline-warning" onClick={handleClick}>Details</Button>
                {props.item.rating != null ?
                    <div>
                        <StarFill/>
                        <span className="badge alert-warning py-2 mx-2"> {props.item.rating}</span>
                    </div>
                    :
                        <></>
                }
            </Card.Footer>
        </Card>
    )
}
export default BuiCard