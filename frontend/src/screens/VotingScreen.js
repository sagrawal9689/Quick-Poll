import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import { Button, Container ,Spinner } from 'react-bootstrap'
import socket from '../socket'

const VotingScreen = ({ match ,history}) => {

    const [ loading, setLoading ]= useState(true)
    const [ question, setQuestion ]= useState("")
    const [ options, setOptions ]= useState([])
    const [ selectedOption, setSelectedOption ]= useState("")

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

      const handleOnchange=(e)=>{
        //   console.log(e.target.value);
        setSelectedOption(e.target.id);
      }
    
      const handleOptionSubmit=(e)=>{
          e.preventDefault();


        const body={ pollId: match.params.id, optionId: selectedOption }
        axios.patch('/api/poll/increase',body)
        .then(function (response) {
          // handle success
          socket.emit('increaseCount', { pollId: match.params.id,  optionId: selectedOption})
          history.push(`/results/${match.params.id}`)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })

      }

    return (
        loading ?(<Container style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <Spinner animation="border" style={{ width: '4rem', height: '4rem' }}/></Container>):(
        <div>
            <Container style={{ height: '50vh',width: '60%' ,display: 'flex',  flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
            <h2 className="my-3">{question}</h2>
            <form style={{width: '100%', textAlign:'center'}} onSubmit={ handleOptionSubmit }>
                {
                    options.map((opt)=>{
                    return <div style={{width: '100%'}} key={opt._id}><input style={{ width: '1rem', height: '1rem', marginRight:'5px'}} type="radio" name="option" value={`${opt.value}`} id={`${opt._id}`} onChange={handleOnchange}/>
                           <label style={{width: '70%'}} htmlFor={`${opt._id}`}><div style={{width: '100%'}} className="btn btn-primary btn-lg px-4 my-1">{`${opt.value}`}</div></label></div>
                    })
                }
                <Button className="btn-secondary my-2" type="submit">Submit</Button>
            </form>
            { selectedOption }
            </Container>
        </div>
        )
    )
}

export default VotingScreen
