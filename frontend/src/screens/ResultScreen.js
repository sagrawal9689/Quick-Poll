import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import { Card, Container ,ListGroup,Spinner } from 'react-bootstrap'
import socket from '../socket'

const ResultScreen = ({ match ,history}) => {

    const [ loading, setLoading ]= useState(true)
    const [ question, setQuestion ]= useState("")
    const [ options, setOptions ]= useState([])
    const [ totalVotes, setTotalVotes ]= useState(0);

    useEffect(() => {

        const fetchData=async ()=>{
            const { data }= await axios.get(`/api/poll/${match.params.id}`);
            setQuestion(data.question);
            setOptions(data.options);
            setTotalVotes(data.options.reduce((a, b) => ({count: a.count + b.count})).count);
            // console.log(data)
        }

        fetchData();
        setLoading(false);

        // console.log(options)
        
        socket.emit('joinRoom', match.params.id);

        const incrementCount=({ optionId })=> {
            setOptions(prevOpt=> {
                const newOption= [...prevOpt]
                // console.log(newOption)
                const idx= newOption.findIndex((ele)=>
                {
                    return ele._id===optionId
                } )

                if(idx!==-1)
                {
                    newOption[idx].count=newOption[idx].count+1; 
                }
                // console.log(newOption)
                return newOption
            })

            setTotalVotes((prevCount)=>{
                return prevCount+1;
            })
        }

        socket.on('increaseCountDone', incrementCount)
        
        return () => {
            socket.off('increaseCountDone', incrementCount);
        };
        // eslint-disable-next-line
      }, [match.params.id]);


    return (
        loading ?(<Container style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <Spinner animation="border" style={{ width: '4rem', height: '4rem' }}/></Container>):(
        <div>
            <Container style={{ height: '100%',display: 'flex',  flexDirection: 'column', justifyContent:'center', alignItems:'center'}} className='resultContainer'>
            <h2 style={{ margin: '50px' }}>{question}</h2>
            <div style={{ width: '100%', display: 'flex' , flexDirection: 'row'}}>

            <div style={{width: '80%'}}>
            {
                    options.map((opt)=>{
                    return <Card key={opt._id} style={{ width: '95%'}} className='my-2'>
                              <Card.Body>
                                <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>{opt.value}</div> 
                                    <div className='badge rounded-pill bg-info'>{totalVotes?`${Math.floor((opt.count/totalVotes)*100)}%`:'0'}</div>
                                </Card.Title>
                                <Card.Text as="div">
                                <div className="progress">
                                  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${(opt.count/totalVotes)*100}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div>{opt.count} votes</div>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                    })
            }
            </div>
            <div style={{ width: '20%' }}>
            <Card className='my-2'>
              <ListGroup variant="flush">
                <ListGroup.Item>Total Votes: {totalVotes}</ListGroup.Item>
                <ListGroup.Item>Share</ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
              </ListGroup>
            </Card>
            </div>    
            </div>
            </Container>
        </div>
        )
    )
}

export default ResultScreen
