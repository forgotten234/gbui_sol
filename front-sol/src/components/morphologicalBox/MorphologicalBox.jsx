import React, {useState, useEffect} from 'react'
import './styles.css'
import {Row, Col, Button, Container, ListGroup} from 'react-bootstrap'
import SearchResultItem from './SearchResultItem'
//The terms needs to be in this order to achieve, that the correct words are in the correct area
const germanCharacteristics = [
    "Anwendungsgebiet", "Betrachtungsobjekt", "Betrachtungskonzept", 
    "Betrachtungsgrenzen", "Anwender", "Integrationsgrad"
]

const MorphologicalBox = () => {
    const [allCharacteristics, setAllCharacteristics] = useState({
        applicationField: [],
        observationObject: [],
        observationConcept: [],
        observationLimit: [],
        targetGroup: [],
        integrationLevel: []
    })

    const [buiList, setBuiList] = useState([])
    const [filteresList, setFilteresList] = useState([])

    const [selectedFilter, setSelectedFilter] = useState([])

    useEffect(() => {
        getAllCharacteristics()
        getBuis()
    }, [])

    useEffect(() => {
        filterAll(selectedFilter)
    }, [selectedFilter])

    const filterBui = (field, value) => {
        if(field === "applicationField"){
            setFilteresList(filteresList.filter(bui => bui.characteristic.applicationField.includes(value)))
        } else if (field === "observationObject") {
            setFilteresList(filteresList.filter(bui => bui.characteristic.observationObject.includes(value)))
        } else if (field === "observationLimit") {
            setFilteresList(filteresList.filter(bui => bui.characteristic.observationLimit.includes(value)))
        } else if (field === "targetGroup") {
            setFilteresList(filteresList.filter(bui => bui.characteristic.targetGroup.includes(value)))
        } else if (field === "integrationLevel") {
            setFilteresList(filteresList.filter(bui => bui.characteristic.integrationLevel.includes(value)))
        } else if (field === "observationConcept") {
            setFilteresList(filteresList.filter(bui => bui.characteristic.observationConcept.includes(value)))
        }    
    }

    const checkForField = (value) => {
        let field = ""
        Object.values(allCharacteristics).forEach((val, index) => {
            if(val.includes(value) === true) field = Object.keys(allCharacteristics)[index]
        })
        return field
    }

    const filterAll = (values) => {
        values.forEach(ele => {
                filterBui(checkForField(ele), ele)
            }     
        )
    }

    const getAllCharacteristics = async () => {
        await fetch('http://141.45.92.192:9004/buis/get-characteristics')
            .then(console.log(allCharacteristics))
            .then(response => response.json())
            .then(data => setAllCharacteristics(data[0].characteristic))
    }

    const onClick =  (e) => {
        if(e.target.classList[1] === "btn-outline-warning"){
            e.target.classList.remove(e.target.classList[1])
            e.target.classList.add("btn-warning")
            setSelectedFilter([...selectedFilter, e.target.value])
        } else {
            e.target.classList.remove(e.target.classList[1])
            e.target.classList.add("btn-outline-warning")
            setSelectedFilter(selectedFilter.filter(item => item !== e.target.value))
            setFilteresList(buiList)
        }
    }

    const getBuis = async () => {
        await fetch('http://141.45.92.192:9004/buis/get-buis')
            .then(response => response.json())
            .then(data => {
                setBuiList(data)
                setFilteresList(data)
            })
    }

    return(
        <div style={{marginTop: "25px"}}>
            <Container className={"morphBoxHeader"}>

            </Container>
            <Container>
                {
                    Object.keys(allCharacteristics).map((outerElement, index) => {
                        let field = Object.keys(allCharacteristics)[index]
                        return (
                            <Row className="d-flex align-item-stretch" className={{display: 'inline-block'}}>
                                <Col >{germanCharacteristics[index]}</Col>       
                                {
                                    allCharacteristics[outerElement].map(innerElement => {
                                        return (
                                            <Col >
                                                <div>
                                                    <Button style={{width: "100%"}} value={innerElement} variant="outline-warning" onClick={onClick}>{innerElement}</Button>
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                                <hr style={{marginTop: "3px"}}/>
                            </Row>
                        )
                    })
                }
            </Container>
            <Container>
                <br />
                <h4 className="text-uppercase">Ergebnisse:</h4>
                <ListGroup>
                    {  
                        filteresList.map((item) => {
                            return (
                                item.name ?
                                    <SearchResultItem 
                                        text={item.name} 
                                        image={item.logo}
                                        description={item.description}
                                        _id={item._id}
                                    />
                                : <></>
                            )
                        })
                    }
                </ListGroup>
            </Container>
        </div>
    )
}

export default MorphologicalBox

// ignor this! 

//we need to combine the results. if an result is in every array which is not empty then it is the search result
const combineResults = (arrayObject) => {
    var resultArray = []
    Object.values(arrayObject).forEach(val => {
        val.forEach(element => {
            if(checkIfValueIsInEachArray(element, arrayObject) === true) resultArray.push(element)
        })
    })
    return [...new Set(resultArray)]
}

const checkIfValueIsInArray = (value, array) => {
    for(let i of array) {
        if(i === value) return true
    }
    return false
}

const checkIfValueIsInEachArray = (value, object) => {
    let totalResultArrays = Object.keys(object).length
    let resultArrayNumber = 0
    Object.values(object).forEach(val => {
        if((val.length > 0 && checkIfValueIsInArray(value, val) === true) || !val.length) resultArrayNumber++
    })
    if(totalResultArrays === resultArrayNumber) return true
    else return false
}