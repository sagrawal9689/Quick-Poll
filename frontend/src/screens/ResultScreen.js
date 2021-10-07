import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import { Container ,Spinner } from 'react-bootstrap'
import socket from '../socket'

const ResultScreen = ({ match ,history}) => {

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

        console.log(options)
        
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
        }

        socket.on('increaseCountDone', incrementCount)

        // ( { pollId, optionId } )=>{
            
        //     const newOptions= [ ...options ]

        //     const idx= newOptions.findIndex((ele)=>
        //     {
        //         console.log(ele._id,optionId)
        //         return ele._id.equals(optionId)
        //     } )
        // })
        
      }, [match.params.id]);


    return (
        loading ?(<Container style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
            <Spinner animation="border" style={{ width: '4rem', height: '4rem' }}/></Container>):(
        <div>
            <Container style={{ height: '50vh',width: '60%' ,display: 'flex',  flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
            <h2 className="my-3">{question}</h2>
            <form style={{width: '100%', textAlign:'center'}}>
                {
                    options.map((opt)=>{
                    return <div key={opt._id} style={{width: '100%'}} className="btn btn-primary btn-lg px-4 my-1">{`${opt.value} ${opt.count}`}</div>
                    })
                }
            </form>
            </Container>
        </div>
        )
    )
}

export default ResultScreen
