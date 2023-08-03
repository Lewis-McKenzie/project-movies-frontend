import React from 'react'
import { Form, Button } from 'react-bootstrap';

const ReviewForm = ({handleSubmit, revText, labelText, defaultValue}: any) => {
  return (
    <Form>
        <Form.Group className='mb-3' controlId='exampleform.ControlTextarea1'>
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as='textarea' rows={3} defaultValue={defaultValue}/>
        </Form.Group>
        <Button variant='outline-info' onClick={handleSubmit}>Submit</Button>
    </Form>
  )
}

export default ReviewForm