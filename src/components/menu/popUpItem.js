import React, { Component } from 'react';
import { modal, bootForm } from '../reusables/mixed'
import { Button, Modal, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import {Item} from '../../stores/menuStore'

class PopUpItem extends Component {
  render() {
    
    const body = (
      <form>
         {["category", "name", "description", "price"].map((key)=>{ return bootForm(key)})}
      </form>
    )

    const popUp = modal('Add a new Item', body, (values = this.state)=>{console.log(values)}, ()=>{this.props.popUpState()})

    return (
      
      <div>
        {popUp}
      </div>
    );
  }
}

export default PopUpItem;