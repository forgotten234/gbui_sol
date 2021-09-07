import React, { useState, useEffect, useContext } from "react"
import { Button, ListGroup } from "react-bootstrap"
import '../../mainComponents/styles.css'
import { useHistory } from "react-router-dom"

const BuiListAdmin = () => {
    const [buiMap, setBuiMap] = useState([])
    const [buiIsDeletedOrAdded, setBuiIsDeletedOrAdded] = useState(0)

    const history = useHistory()

    useEffect(() => {
        getBuis()
    }, [buiIsDeletedOrAdded])

    const navigateToDetailPage = (id) => {
        history.push({
            pathname: "/detail/"+id,
        })
    }

    const getBuis = async () => {
        await fetch('http://localhost:9004/buis/get-buis')
            .then(response => response.json())
            .then(data => setBuiMap(
                data.map(element => 
                    <ListGroup.Item
                        key={element._id}
                    >
                        Name: {element.name} <br />
                        <Button variant="outline-dark" size="sm" style={{marginRight: "5px"}} onClick={() => deleteBui(element._id)}>Delete</Button>
                        <Button variant="outline-dark" size="sm" style={{marginRight: "5px"}} onClick={() => navigateToDetailPage(element._id)}>Go to page</Button>
                    </ListGroup.Item>    
                )
            ))
    }

    const deleteBui = async (id) => {
        await fetch("http://localhost:9004/buis/delete/" + id, {
            method: 'DELETE',
            body: JSON.stringify({
                _id: id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(setBuiIsDeletedOrAdded(prevState => prevState + 1))
    }

    return (
        <>
            <div className={"buiListAreaContainer"}>
                <div className="buiListBody">
                    <ListGroup className={"buiListContainer"}>
                        {buiMap}
                    </ListGroup>
                </div>
            </div>
        </>
    )
}

export default BuiListAdmin