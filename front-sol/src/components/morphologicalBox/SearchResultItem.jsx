import React, {useState, useEffect} from 'react'
import './styles.css'
import {ListGroup} from 'react-bootstrap'
import { useHistory } from "react-router-dom"
const SearchResultItem = (props) => {
    const history = useHistory()
    const navigateToDetailPage = (id) => {
        history.push({
            pathname: "/detail/"+id,
        })
    }
    return(
        <ListGroup.Item className={"itemContainer"} onClick={() => navigateToDetailPage(props._id)}>
            <div style={{width: '950px'}}>
                <div style={{width: '300px', float: 'left'}}>
                    <img src={props.image} style={{width: '250px'}}/>
                </div>
                <div className={"textHidden"}> 
                    <h5>{props.text}</h5>
                    <span>{props.description}</span>
                </div>
            </div>
        </ListGroup.Item>
    )
}

export default SearchResultItem