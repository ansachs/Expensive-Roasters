import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import PopUpItem from './popUpItem'



var ItemView = inject('menu')(observer(class ItemView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popUp: false
    }
  }

  toggleEditItem() {
    // console.log("popUp")
    this.setState({popUp:!this.state.popUp})
  }

  editItem(values) {
      this.props.item['name'] = values['name'];
      this.props.item['description'] = values['description'];
      this.props.item['price'] = values['price'];
      // this.props.category = values['category'];
  }

  render() {
    const popUp = this.state.popUp ? <PopUpItem popUpState={()=>{this.toggleEditItem()}} item={this.props.item} category={this.props.category} newOrEdit={(values)=>{this.props.menu.editItem(this.props.item, this.props.category, values)}}/> : null

    return (
      
      <li>
        <p onDoubleClick={()=>{this.toggleEditItem()}}> {this.props.item['name']} - {this.props.item['description']} - {this.props.item['price']}</p>
        {popUp}
      </li>
    );
  }
}))

export default ItemView;