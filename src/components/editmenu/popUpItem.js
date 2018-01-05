import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import { modal, bootForm } from '../reusables/mixed'

var PopUpItem = inject('menu')(observer(class PopUpItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: this.props.item? this.props.item["category"] : "",
      name: this.props.item ? this.props.item["name"] : "",
      description: this.props.item ? this.props.item["description"] : "",
      price: this.props.item ? this.props.item["price"] : ""
    }
  }

  handleEvent(event){
    switch (event.target.id){
      case 'category':
        this.setState({category: event.target.value})
        break;
      case 'name':
        this.setState({name: event.target.value})
        break;
      case 'description':
        this.setState({description: event.target.value})
        break;
      case 'price':
        this.setState({price: event.target.value})
        break;
      default:
        break;
    }
  }

  render() {
    const body = (
      <form>
         {["category", "name", "description", "price"].map((key)=>{ return bootForm(key, this.state[key], (event)=>{this.handleEvent(event)})})}
      </form>
    )
    const popUp = modal('Add a new Item', body, (values = this.state)=>{this.props.newOrEdit(values)}, ()=>{this.props.popUpState()})
    return (
      <div>
        {popUp}
      </div>
    );
  }
}))

export default PopUpItem;