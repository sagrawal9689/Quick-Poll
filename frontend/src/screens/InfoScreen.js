import React from 'react'
import { Alert, Container, FormControl, InputGroup, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const InfoScreen = ({match}) => {
    return (
        <Container>
            <Alert className="my-3" variant="success">
              Your Poll was created sucessfully.
            </Alert>
            <ListGroup variant="primary">
              <ListGroup.Item className="my-4 p-4"><InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Link for voting</InputGroup.Text>
                <FormControl
                  placeholder="Link"
                  aria-describedby="basic-addon1"
                  value={`${window.location.origin}/vote/${match.params.id}`}
                />
              </InputGroup>
              <div>Copy this link and send it to the voters</div>
              </ListGroup.Item>

              <ListGroup.Item className="my-4 p-4"><InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Link for Getting Realtime vote results</InputGroup.Text>
                <FormControl
                  placeholder="Link"
                  aria-describedby="basic-addon1"
                  value={`${window.location.origin}/results/${match.params.id}`}
                />
              </InputGroup>
              <Link to={`/results/${match.params.id}`} target="_blank">Show Results</Link>
              </ListGroup.Item>
            </ListGroup>
        </Container>
    )
}

export default InfoScreen
