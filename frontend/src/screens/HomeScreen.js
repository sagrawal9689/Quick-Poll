import React from 'react'
import { Container, Form } from 'react-bootstrap'

const HomeScreen = () => {
    return (
        <>
        
        <div style={{ textAlign: "center", fontSize: "57px"}} className="m-5">
          Quick Poll
        <div style={{ textAlign: "center", fontSize: "20px" }}>Create Polls Quickly.</div>
        </div>

        <main>
        <Form style={{backgroundColor: "#F2F2F2"}} className="formMain">
            <h1>Create Poll</h1>
            <Form.Group>
              <Form.Label>Poll Question</Form.Label>
              <Form.Control as="textarea" rows={3}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Option 1</Form.Label> 
              <Form.Control type="text" placeholder="Option 1"/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Option 2</Form.Label>
              <Form.Control type="text" placeholder="Option 2"/>
            </Form.Group>
            
        </Form>
        </main>
        </>
    )
}

export default HomeScreen
