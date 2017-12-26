import {Modal, Button, Form, FormControl, FormGroup } from 'react-bootstrap';
import React from 'react';

export function modal(header, body, submit, close) { 
  return (
  <div className="static-modal">
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {body}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={()=>{submit(); close()}}>Close</Button>
      </Modal.Footer>

    </Modal.Dialog>
  </div>
)}

export function bootForm(item, value=null) {

  return(
        <FormGroup controlId={item}>
          <FormControl
            type="text"
            value={value}
            placeholder={item}
            onChange={(event)=>{console.log(event.target)}}
          />
        </FormGroup>
    )
}

