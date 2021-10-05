import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import { Container, Form, Row, Spinner,Col } from 'react-bootstrap'
import { Radio, RadioGroup} from 'react-radio-group'

const VotingScreen = ({ match ,history}) => {

    const [ loading, setLoading ]= useState(true)
    const [ question, setQuestion ]= useState("")
    const [ options, setOptions ]= useState([])

    useEffect(() => {

        const fetchData=async ()=>{
            const { data }= await axios.get(`/api/poll/${match.params.id}`);
            setQuestion(data.question);
            setOptions(data.options);
            // console.log(data)
        }

        fetchData();
        setLoading(false);

      }, [match.params.id]);

    return (
        loading ?(<Container style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <Spinner animation="border" style={{ width: '4rem', height: '4rem' }}/></Container>):(
        <div>
            <Container>
            <div>{question}</div>
            <Form.Group as={Row} className="mb-3">
                <Form.Label as="legend" column sm={2}>
                
                </Form.Label>
                <Col sm={10}>
                <RadioGroup name="fruits">
                {
                    options.map((opt)=>{
                    return  <div className="radio-button-background">
                                <Radio value="Applee" className="radio-button" />
                                <h2>{`${opt.value}`}</h2>
                            </div>
                    })
                }
                </RadioGroup>    
                </Col>
            </Form.Group>
            </Container>
        </div>
        )
    )
}

export default VotingScreen
