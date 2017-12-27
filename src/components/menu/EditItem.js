import React, { Component } from 'react';
import PopUpItem from './popUpItem'
import {inject, observer} from 'mobx-react';
import {Item} from '../../stores/menuStore'

var AddItem = inject('menu')(observer(class AddItem extends Component {
  render() {
    console.log('this is crap')
    return (
      
      <div>
        <PopUpItem popUpState={()=>{this.props.popUpState()}} newOrEdit={(value)=>{this.props.menu.newItem(value)}}/>
      </div>
    );
  }
}))

export default AddItem;