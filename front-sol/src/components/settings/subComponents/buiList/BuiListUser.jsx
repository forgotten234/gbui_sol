import React, { useState, useEffect, useContext } from "react"
import { Button, ListGroup } from "react-bootstrap"
import '../../mainComponents/styles.css'
import { AuthContext } from "../../../contexts/AuthContext"

const BuiListUser = () =>  {
    const [buiMap, setBuiMap] = useState([])
    const [buiIsDeleted, setBuiIsDeleted] = useState(0)
    const {auth} = useContext(AuthContext)

    useEffect(() => {
        getBuis()
    }, [buiIsDeleted])

    const getBuis = async () => {
        await fetch('http://141.45.92.192:9004/buis/get-bui/' + auth.data.userId)
            .then(response => response.json())
            .then(data => setBuiMap(
                data.map(element => 
                    <ListGroup.Item
                        key={element._id}
                    >
                        Name: {element.name} <br />
                        <Button variant="outline-dark" size="sm" style={{marginRight: "5px"}} onClick={() => deleteBui(element._id)}>Delete</Button>
                        <Button variant="outline-dark" size="sm" style={{marginRight: "5px"}}>Go to page</Button>
                    </ListGroup.Item>    
                )
            ))
    }

    const deleteBui = async (id) => {
        await fetch("http://141.45.92.192:9004/buis/delete/" + id, {
            method: 'DELETE',
            body: JSON.stringify({
                _id: id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(setBuiIsDeleted(prevState => prevState + 1))
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

export default BuiListUser