import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import PopUpItem from './popUpItem'


var AddItem = inject('menu')(observer(class AddItem extends Component {
  render() {
    return (
      <div>
        <PopUpItem 
          popUpState={()=>{this.props.popUpState()}} 
          newOrEdit={(value)=>{this.props.menu.newItem(value)}}
        />
      </div>
    );
  }
}))

export default AddItem;