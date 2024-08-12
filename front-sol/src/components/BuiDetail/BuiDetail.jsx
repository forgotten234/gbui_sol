import React, {useState,useEffect} from 'react'
import './styles.css'
import {Container, Row, Col, Table, Image, Button, Accordion, Card} from 'react-bootstrap'
import {PersonFill, TelephoneFill, EnvelopeFill, StarFill} from 'react-bootstrap-icons'
import BuiDetailCard from './BuiDetailCard'
import BuiRating from './BuiRating'


function BuiDetail(props){
    const [reRender, setRerender] = useState(0)
    const [SelectedBui, setSelectedBui] = useState([])
    const [showDescription, setShowDescription] = useState(false)

    const getItem = async () => {
        await fetch("http://localhost:9004/buis/get-buis/"+props.match.params.id)
        .then(response => response.json())
        .then((item) => {
            setSelectedBui(item)
        })    
    } 
    useEffect(()=> {
        getItem()
        console.log(SelectedBui)
    }, [props.match.params.id])

    //Check if Logo exists or return empty
    const logo = (item) => {
        return item ? <Image src={item} fluid rounded className="mx-auto d-block p-5 bui-logo"/> : <></>
    }
    //map multiple manufacturers to list
    const getManufacturer = (items) =>{
        return(
            items.map(item => {return(<li className="list-group-item bg-transparent px-0">{item}</li>)})
        )  
    }
    //toggle between full and hidden description
    const handleClick = () =>{
       setShowDescription(prevState => !prevState)
    }
    //handle show full or part Description 
    const buiDescription = ()=>{
        return showDescription ? 
            <div>
                <p className="description-text-full">
                    {SelectedBui[0].description}
                </p>
            </div>
            : 
            <div>
                <p className="description-text-hidden">
                    {SelectedBui[0].description}
                </p>
            </div>
    }

    return(
        SelectedBui[0] ?
        <div>
            <Container className="my-3">
                <Row className="bg-dark text-light text-center rounded">
                    <Col>
                        <h1>{SelectedBui[0].name}</h1>
                    </Col>
                </Row>
                <Row className="bg-secondary rounded pb-3">
                    <Col className="border border-dark rounded bg-light mx-2">
                        {logo(SelectedBui[0].logo)}
                        <Table>
                            <tbody>
                                <tr>
                                    <td className="align-middle">Hersteller</td>
                                    <td><ul className="list-group list-group-flush">{getManufacturer(SelectedBui[0].manufacturer)}</ul></td>
                                </tr>
                                <tr>
                                    <td>Typ</td>
                                    <td>{SelectedBui[0].type}</td>
                                </tr>
                                <tr>
                                    <td>Webseite</td>
                                    <td><a href={SelectedBui[0].website}>{SelectedBui[0].website}</a></td>
                                </tr>
                                <tr>
                                    <td>Beschreibung</td>
                                    <td>
                                        {buiDescription()}
                                        {showDescription ? <Button variant="outline-dark" onClick={handleClick}>...Weniger</Button> : <Button variant="outline-dark" onClick={handleClick}>Mehr...</Button>}
                                    </td>      
                                </tr>
                                <tr>
                                    <td>Kontakt</td>
                                    <td>
                                        <ul className="list-unstyled">
                                            <li>
                                                <PersonFill/>
                                                <span className="mx-2"></span>
                                                {SelectedBui[0].contact.title}{SelectedBui[0].contact.firstName} {SelectedBui[0].contact.lastName}
                                            </li>
                                            <li>
                                                <TelephoneFill/>
                                                <span className="mx-2"></span>
                                                {SelectedBui[0].contact.telephoneNumber}
                                            </li>
                                            <li>
                                                <EnvelopeFill/>
                                                <span className="mx-2"></span>
                                                {SelectedBui[0].contact.email}
                                            </li>
                                        </ul>         
                                    </td> 
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col className="border border-dark rounded bg-light mx-2 py-5">
                        <Container>
                            <h3>Merkmale</h3>
                            <Accordion className="my-2" defaultActiveKey="0">
                                <BuiDetailCard item={SelectedBui[0].characteristic.applicationField} title="Anwendungsgebiet" eventKey="0"/>
                                <BuiDetailCard item={SelectedBui[0].characteristic.observationObject} title="Betrachtungsobjekt" eventKey="1"/>
                                <BuiDetailCard item={SelectedBui[0].characteristic.observationConcept} title="Betrachtungskonzept" eventKey="2"/>
                                <BuiDetailCard item={SelectedBui[0].characteristic.observationLimit} title="Betrachtungsgrenzen" eventKey="3"/>
                                <BuiDetailCard item={SelectedBui[0].characteristic.targetGroup} title="Anwender" eventKey="4"/>
                                <BuiDetailCard item={SelectedBui[0].characteristic.integrationLevel} title="Integrationsgrad" eventKey="5"/> 
                            </Accordion>
                        </Container>
                        <hr />
                       <Container>
                           <h4>Bewertung</h4>
                           <Row>
                                <Col>
                                  <div>
                                    <StarFill className="align-middle"/>
                                    <span className="align-middle mx-2 badge alert-warning p-2">{SelectedBui[0].rating} von 5</span>
                                  </div>
                                </Col>
                                <Col>
                                    <BuiRating id={props.match.params.id}/>
                                </Col>
                           </Row>
                       </Container>
                       <hr />
                    </Col>
                </Row>
                
            </Container>
        </div> 
        : 
        <Container className="d-flex align-items-center justify-content-center my-5">
            Lädt...
        </Container>
        
    )
}
export default BuiDetail