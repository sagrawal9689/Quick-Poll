import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Alert, Button, Form } from 'react-bootstrap'

const HomeScreen = ({ history }) => {

    function handleChange(i, event) {
      const values = [...fields];
      values[i].value = event.target.value;
      setFields(values);
    }

    function handleAdd() {
      const values = [...fields];
      values.push({ value: null });
      setFields(values);

      // console.log(values)
    }

    function handleRemove(i) {
      const values = [...fields];
      values.splice(i, 1);
      setFields(values);
    }

    function handelQuestionChange(e) {
        setQuestion(e.target.value)
    }

    
    const [question, setQuestion]= useState(""); 
    const [fields, setFields] = useState([{ value: null }]);
    const [ alert, setAlert ]= useState(null);

    function submitPoll(e) {
  
          const createPoll=async ()=>{

            try{
              const {data}= await axios.post('/api/poll',{ question, options: fields })
              history.push(`/info/${data._id}`)
              
            }
            catch(e)
            {
              console.log(e)
            }
          }

          if(!question || question.trim()==="")
          {
            setAlert('please provide a question');
            return;
          }

          if(fields.length===0 || (fields.length===1 && fields[0].value===null))
          {
            setAlert('please provide an option');
            return;
          }

          createPoll();
    }
    
    return (
        <>
        
        <div style={{ textAlign: "center", fontSize: "57px" , color: "white"}} className="m-4">
          Quick Poll
        <div style={{ textAlign: "center", fontSize: "20px" }}>Create realtime Polls Quickly.</div>
        </div>

        <main>
        <Form className="formMain">
            <Form.Group>
              <Form.Label>Poll Question</Form.Label>
              <Form.Control as="textarea" rows={3} value={question} onChange={handelQuestionChange} placeholder="what is your favourite food?"/>
            </Form.Group>
            {fields.map((field, idx) => {
            return (
              <Form.Group key={`${field}-${idx}`} className="my-2">
                  
                <Form.Label>{`Option ${idx+1}`}</Form.Label>
                <div style={{display: "flex"}}>
                    <Form.Control
                      type="text"
                      placeholder={`Option ${idx+1}`}
                      onChange={e => handleChange(idx, e)}
                    />
                    <Button className="btn-danger mx-3" onClick={() => handleRemove(idx)}>
                      X
                    </Button>
                </div>
              </Form.Group>
            );
          })}
          {
            alert && <Alert className='my-3' variant='warning'>
            {alert}
            </Alert>
          }
          <Button type="button" onClick={() => handleAdd()} className="my-4 btn-lg">Add another Option</Button>
          <hr></hr>
          <Button className="btn-lg btn-info" onClick={submitPoll}>Create your Poll</Button>
        </Form>
        </main>
        </>
    )
}

export default HomeScreen
