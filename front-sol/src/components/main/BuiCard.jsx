import React, {useState,useEffect} from 'react'
import './styles.css'
import {Container, Card, Row,Col, Button} from 'react-bootstrap'
import { EmojiSmile } from 'react-bootstrap-icons'
import ProfilePicturePlaceholder from '../../assets/user.png'

function BuiCard(props){

const handleClick = () => {

}

    return(
        <div >
            <Card bg="light" style={{ width: '25rem' }}>
                <Row>
                    <Col xs={4}>
                        <img width="120em" Height="120em" src={ProfilePicturePlaceholder} className="rounded mx-3 mt-3 d-block"></img>
                    </Col>
                    <Col xs={8}>
                        <Card.Body>
                            <Card.Title>Titel</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            <Card.Text>
                                <h5>Hersteller:</h5>
                                <p>Irgendwer</p>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
                <Card.Footer>
                    <Button variant="outline-dark" onClick={handleClick}>Details</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}
export default BuiCard