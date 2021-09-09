import React, {useEffect, useState} from 'react'
import { Button, Container } from 'react-bootstrap'
import { Star, StarFill, FaStar } from 'react-bootstrap-icons'
import { useParams } from 'react-router-dom'
import './styles.css'

function BuiRating(props){
    
    const list = [...Array(5)]
    const [rating, setRating] = useState(0) 
    const [hoverRating, setHoverRating] = useState(0)
    const [isRated, setIsRated] = useState(false)

    useEffect(()=>{
        setIsRated(true)
        saveData()
    },[rating])


    const handleClick = (e) =>{
        setRating(e.target.value)   
    }

    const saveData = async()=>{
        await fetch('http://141.45.92.192:9004/buis/update-bui/'+ props.id, {
                method: "PATCH",
                body: JSON.stringify({
                    rating1234: rating
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
    }

    const mapStars = (list) =>{
        return(
            list.map((item, i)=>{
                const ratingValue = i+1
                return(
                    <label>
                        <input type="radio" name="rating" className="input-rating" value={ratingValue} onClick={handleClick}/>
                        <StarFill className="star-rating" color={ratingValue <= (hoverRating || rating) ?  '#ffc107' : '#999'} onMouseOver={()=>setHoverRating(ratingValue)} onMouseLeave={()=>setHoverRating(0)}/>
                    </label>
            
                )
            })
        )
    }

    return(
        <Container>
            {isRated ?  <p>Bewertung erhalten</p> : mapStars(list)}
        </Container>
    )

}
export default BuiRating
