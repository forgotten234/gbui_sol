import '../../styles.css'
import React, {useState, useEffect} from 'react'
import { Form, Row, Col} from 'react-bootstrap'

const CharacteristicsArea = (props) => {
    //just for holding the already existing characteristics
    const [allCharacteristics, setAllCharacteristics] = useState({
        applicationField: [],
        observationObject: [],
        observationConcept: [],
        observationLimit: [],
        targetGroup: [],
        integrationLevel: []
    })
    //object to keep values out of selection area
    const [newCharacteristicsSelected, setNewCharacteristicsSelected] = useState({
        applicationField: [],
        observationObject: [],
        observationConcept: [],
        observationLimit: [],
        targetGroup: [],
        integrationLevel: []
    })
    //object to keep values out of text area
    const [newCharacteristicsSelectedText, setNewCharacteristicsSelectedText] = useState({
        applicationField: [],
        observationObject: [],
        observationConcept: [],
        observationLimit: [],
        targetGroup: [],
        integrationLevel: []
    })

    const getAllCharacteristics = async () => {
        await fetch('http://141.45.92.192:9004/buis/get-characteristics')
            .then(response => response.json())
            .then(data => setAllCharacteristics(data[0].characteristic))
    }
    //sending the concated array to parent
    useEffect(() => {
        getAllCharacteristics()
        props.action(concatObjectForGivingBackToParent())
    }, [newCharacteristicsSelectedText, newCharacteristicsSelected])

    const concatObjectForGivingBackToParent = () => {
        const objForParent = {
            applicationField: newCharacteristicsSelected.applicationField.concat(newCharacteristicsSelectedText.applicationField),
            observationObject: newCharacteristicsSelected.observationObject.concat(newCharacteristicsSelectedText.observationObject),
            observationConcept: newCharacteristicsSelected.observationConcept.concat(newCharacteristicsSelectedText.observationConcept),
            observationLimit: newCharacteristicsSelected.observationLimit.concat(newCharacteristicsSelectedText.observationLimit),
            targetGroup: newCharacteristicsSelected.targetGroup.concat(newCharacteristicsSelectedText.targetGroup),
            integrationLevel: newCharacteristicsSelected.integrationLevel.concat(newCharacteristicsSelectedText.integrationLevel)
        }
        return objForParent
    }

    //for select options -> update array correctly (remove / add the items)
    const getSelectedValuesFromSelectArea = field => e => {
        if(field === "applicationField"){
            let newApplArray = []
            Object.keys(e.target.selectedOptions).map((key, index) => {
                newApplArray.push(e.target.selectedOptions[key].value)
            })
            setNewCharacteristicsSelected({...newCharacteristicsSelected, applicationField: newApplArray})
        } else if (field === "observationObject") {
            let newApplArray = []
            Object.keys(e.target.selectedOptions).map((key, index) => {
                newApplArray.push(e.target.selectedOptions[key].value)
            })
            setNewCharacteristicsSelected({...newCharacteristicsSelected, observationObject: newApplArray})
        } else if (field === "observationConcept") {
            let newApplArray = []
            Object.keys(e.target.selectedOptions).map((key, index) => {
                newApplArray.push(e.target.selectedOptions[key].value)
            })
            setNewCharacteristicsSelected({...newCharacteristicsSelected, observationConcept: newApplArray})
        } else if (field === "observationLimit") {
            let newApplArray = []
            Object.keys(e.target.selectedOptions).map((key, index) => {
                newApplArray.push(e.target.selectedOptions[key].value)
            })
            setNewCharacteristicsSelected({...newCharacteristicsSelected, observationLimit: newApplArray})
        } else if (field === "targetGroup") {
            let newApplArray = []
            Object.keys(e.target.selectedOptions).map((key, index) => {
                newApplArray.push(e.target.selectedOptions[key].value)
            })
            setNewCharacteristicsSelected({...newCharacteristicsSelected, targetGroup: newApplArray})
        } else if (field === "integrationLevel") {
            let newApplArray = []
            Object.keys(e.target.selectedOptions).map((key, index) => {
                newApplArray.push(e.target.selectedOptions[key].value)
            })
            setNewCharacteristicsSelected({...newCharacteristicsSelected, integrationLevel: newApplArray})
        }
        //props.action()
    }

    //for text fields -> updates only the first, second or third value 
    //TODO: update for specific number of values
    const updateArrayOnLastPosition = (array, value, index) => {
        let newArray = []
        switch(array){
            case "applicationField": 
                newArray = updateLastValue(newCharacteristicsSelectedText.applicationField, index, value)
                setNewCharacteristicsSelectedText({...newCharacteristicsSelectedText, applicationField: newArray})
                break
            case "observationObject": 
                newArray = updateLastValue(newCharacteristicsSelectedText.observationObject, index, value)
                setNewCharacteristicsSelectedText({...newCharacteristicsSelectedText, observationObject: newArray})
                break
            case "observationConcept": 
                newArray = updateLastValue(newCharacteristicsSelectedText.observationConcept, index, value)
                setNewCharacteristicsSelectedText({...newCharacteristicsSelectedText, observationConcept: newArray})
                break
            case "observationLimit":
                newArray = updateLastValue(newCharacteristicsSelectedText.observationLimit, index, value)
                setNewCharacteristicsSelectedText({...newCharacteristicsSelectedText, observationLimit: newArray})
                break
            case "targetGroup": 
                newArray = updateLastValue(newCharacteristicsSelectedText.targetGroup, index, value)
                setNewCharacteristicsSelectedText({...newCharacteristicsSelectedText, targetGroup: newArray})
                break
            case "integrationLevel": 
                newArray = updateLastValue(newCharacteristicsSelectedText.integrationLevel, index, value)
                setNewCharacteristicsSelectedText({...newCharacteristicsSelectedText, integrationLevel: newArray})
                break
            default:
        }
    }

    //to update the value. If no value is given the item is removed
    const updateLastValue = (arrayToUpdate, index, value) => {
        let newArray = [...arrayToUpdate]
        if(value === ""){
            newArray.splice(index, 1)
        } else {
            newArray.splice(index, 1, value)
        }
        return newArray
    }

    //second method for stop rerendering
    const setInquiryDataFromForm = (field, index) => e => { 
        if(field === "applicationField"){
            updateArrayOnLastPosition("applicationField", e.target.value, index)
        } else if (field === "observationObject") {
            updateArrayOnLastPosition("observationObject", e.target.value, index)
        } else if (field === "observationConcept") {
            updateArrayOnLastPosition("observationConcept", e.target.value, index)
        } else if (field === "observationLimit") {
            updateArrayOnLastPosition("observationLimit", e.target.value, index)
        } else if (field === "targetGroup") {
            updateArrayOnLastPosition("targetGroup", e.target.value, index)
        } else if (field === "integrationLevel") {
            updateArrayOnLastPosition("integrationLevel", e.target.value, index)
        }
    }

    const generateKey = () => {
        return Math.random().toString(36).substr(2, 9)
    }

    return(
        <>
            <Form.Group className="inputFieldsInquiryForArrays">
                <Row>
                    <Col>  
                        <Form.Control as="select" multiple style={{width: '230px'}} onChange={getSelectedValuesFromSelectArea("applicationField")}>
                            {
                                allCharacteristics.applicationField.map(element => 
                                    <option key={generateKey()}>{element}</option>
                                )
                            }
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Anwendungsfeld" onChange={setInquiryDataFromForm("applicationField", 0)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Anwendungsfeld" onChange={setInquiryDataFromForm("applicationField", 1)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Anwendungsfeld" onChange={setInquiryDataFromForm("applicationField", 2)}></Form.Control>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="inputFieldsInquiryForArrays">
                <Row>
                    <Col>  
                        <Form.Control as="select" multiple style={{width: '230px'}} onChange={getSelectedValuesFromSelectArea("observationObject")}>
                            {
                                allCharacteristics.observationObject.map(element => 
                                    <option key={generateKey()}>{element}</option>
                                )
                            }
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Betrachtungsobjekt" onChange={setInquiryDataFromForm("observationObject", 0)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Betrachtungsobjekt" onChange={setInquiryDataFromForm("observationObject", 1)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Betrachtungsobjekt" onChange={setInquiryDataFromForm("observationObject", 2)}></Form.Control>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="inputFieldsInquiryForArrays">
                <Row>
                    <Col>  
                        <Form.Control as="select" multiple style={{width: '230px'}} onChange={getSelectedValuesFromSelectArea("observationConcept")}>
                            {
                                allCharacteristics.observationConcept.map(element => 
                                    <option key={generateKey()}>{element}</option>
                                )
                            }
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Betrachtungskonzept" onChange={setInquiryDataFromForm("observationConcept", 0)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Betrachtungskonzept" onChange={setInquiryDataFromForm("observationConcept", 1)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Betrachtungskonzept" onChange={setInquiryDataFromForm("observationConcept", 2)}></Form.Control>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="inputFieldsInquiryForArrays">
                <Row>
                    <Col>  
                        <Form.Control as="select" multiple style={{width: '230px'}} onChange={getSelectedValuesFromSelectArea("observationLimit")}>
                            {
                                allCharacteristics.observationLimit.map(element => 
                                    <option key={generateKey()}>{element}</option>
                                )
                            }
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Betrachtungslimit" onChange={setInquiryDataFromForm("observationLimit", 0)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Betrachtungslimit" onChange={setInquiryDataFromForm("observationLimit", 1)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Betrachtungslimit" onChange={setInquiryDataFromForm("observationLimit", 2)}></Form.Control>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="inputFieldsInquiryForArrays">
                <Row>
                    <Col>  
                        <Form.Control as="select" multiple style={{width: '230px'}} onChange={getSelectedValuesFromSelectArea("targetGroup")}>
                            {
                                allCharacteristics.targetGroup.map(element => 
                                    <option key={generateKey()}>{element}</option>
                                )
                            }
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Anwendungsgruppe" onChange={setInquiryDataFromForm("targetGroup", 0)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Anwendungsgruppe" onChange={setInquiryDataFromForm("targetGroup", 1)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Anwendungsgruppe" onChange={setInquiryDataFromForm("targetGroup", 2)}></Form.Control>
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="inputFieldsInquiryForArrays">
                <Row>
                    <Col>  
                        <Form.Control as="select" multiple style={{width: '230px'}} onChange={getSelectedValuesFromSelectArea("integrationLevel")}>
                            {
                                allCharacteristics.integrationLevel.map(element => 
                                    <option key={generateKey()}>{element}</option>
                                )
                            }
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Integrationslevel" onChange={setInquiryDataFromForm("integrationLevel", 0)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Integrationslevel" onChange={setInquiryDataFromForm("integrationLevel", 1)}></Form.Control>
                        <Form.Control style={{height: '35px'}} type="textarea" placeholder="Neues Integrationslevel" onChange={setInquiryDataFromForm("integrationLevel", 2)}></Form.Control>
                    </Col>
                </Row>
            </Form.Group>
        </>
    )
}

export default CharacteristicsArea