import React from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap'

const HomeScreen = () => {

    function handleChange(i, event) {
      const values = [...fields];
      values[i].value = event.target.value;
      setFields(values);
    }

    function handleAdd() {
      const values = [...fields];
      values.push({ value: null });
      setFields(values);

      console.log(values)
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

    return (
        <>
        
        <div style={{ textAlign: "center", fontSize: "57px" , color: "white"}} className="m-5">
          Quick Poll
        <div style={{ textAlign: "center", fontSize: "20px" }}>Create Polls Quickly.</div>
        </div>

        <main>
        <Form className="formMain">
            <Form.Group>
              <Form.Label>Poll Question</Form.Label>
              <Form.Control as="textarea" rows={3} value={question} onChange={handelQuestionChange}/>
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
          <Button type="button" onClick={() => handleAdd()} className="my-4">Add another Option</Button>
        </Form>

        </main>
        </>
    )
}

export default HomeScreen
