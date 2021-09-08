import React, { useState, useEffect, useContext } from "react"
import { ListGroup } from "react-bootstrap"
import {AuthContext} from "../../contexts/AuthContext"
import '../mainComponents/styles.css'
import EditUser from "./EditUser"
import { RoleContext } from "../../contexts/RoleContext"

const UserList = () => {
    const [userMap, setUserMap] = useState([])
    const [showEditUserArea, setShowEditUserArea] = useState(false)
    const [dataForEditUserArea, setDataForEditUserArea] = useState({})
    //need this extra state for getting Users after at one is worked on
    //beacuse if we do it with the showEditUserArea state we need one api call more
    const [editUserAreaIsClosed, setEditUserAreaIsClosed] = useState(0)
    const {role} = useContext(RoleContext)

    useEffect(() => {
        getUsers()
        console.log(dataForEditUserArea)
    }, [editUserAreaIsClosed])

    const showEditUserAreaAndSetUserDataForItem = (data) => {
        setDataForEditUserArea(data)
        setShowEditUserArea(prevState => !prevState)
    }

    //for below action in EditUser
    const closeEditUserAreaAndGetUsersAgain = () => {
        setShowEditUserArea(prevState => !prevState)
        setEditUserAreaIsClosed(prevState => prevState + 1)
    }

    const getUsers = async () => {
        await fetch('http://127.0.0.1:9001/users/get-users')
            .then(response => response.json())
            .then(data => setUserMap(
                data
                    .filter(element => element.userId !== role.data[0].userId)
                    .map(element => 
                        <ListGroup.Item
                            key={element.userId}
                            onClick={() => showEditUserAreaAndSetUserDataForItem(element)}
                        >
                            Name: {element.name}
                        </ListGroup.Item>
                    )
            ))
    }
    
    return (
        <>
            <div className={"userListAreaContainer"}>
                <div className="userListBody">
                    <ListGroup className={"userListContainer"}>
                        {userMap}
                    </ListGroup>
                </div>
            </div>
            <EditUser
                editUser={showEditUserArea}
                userData={dataForEditUserArea}
                action={closeEditUserAreaAndGetUsersAgain}
            />
        </>
    )
}

export default UserList