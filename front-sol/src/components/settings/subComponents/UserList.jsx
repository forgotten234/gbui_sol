import React, { useState, useEffect, useContext } from "react"
import { ListGroup } from "react-bootstrap"
import {AuthContext} from "../../contexts/AuthContext"


const UserList = () => {
    const [userMap, setUserMap] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        await fetch('http://localhost:9001/users/get-users')
            .then(response => response.json())
            .then(data => setUserMap(
                data.map(element => 
                    <ListGroup.Item
                        key={element.userId}
                    >
                        Name: {element.name}
                    </ListGroup.Item>
                )

            ))
    }
    
    return (
        <ListGroup className={"userListContainer"}>
            {userMap}
        </ListGroup>
    )
}

export default UserList