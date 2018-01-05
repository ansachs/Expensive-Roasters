import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Glyphicon} from 'react-bootstrap'

import PopUpItem from './popUpItem'


var ItemView = inject('menu')(observer(class ItemView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popUp: false
    }
  }

  toggleEditItem() {
    this.setState({popUp:!this.state.popUp})
  }

  render() {
    const popUp = this.state.popUp ? 
      <PopUpItem 
        popUpState={()=>{this.toggleEditItem()}}
        item={this.props.item} 
        category={this.props.category} 
        newOrEdit={(values)=>{this.props.menu.editItem(this.props.item, values)}}/> 
      : null

    return (
      <li className="menu-items">
        <Row>
          <Col xs={2}></Col>
          <Col xs={6} 
            className="text-right" 
            data-test="order-item" 
            onDoubleClick={()=>{this.toggleEditItem()}}>{this.props.item['name']} - {this.props.item['description']} - {this.props.item['price']}
          </Col>
          <Col xs={1} 
            bsSize="small" 
            onClick={()=>{this.props.menu.deleteItem(this.props.item)}}>
            <Glyphicon glyph="remove"/>
          </Col>
          <Col xs={3}> </Col>
        </Row>
        {popUp}
      </li>
    );
  }
}))

export default ItemView;