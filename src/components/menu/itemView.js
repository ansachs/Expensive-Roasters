import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import PopUpItem from './popUpItem'
import {Row, Col, Glyphicon} from 'react-bootstrap'



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

  // editItem(values) {
  //     this.props.item['name'] = values['name'];
  //     this.props.item['description'] = values['description'];
  //     this.props.item['price'] = values['price'];
  //     // this.props.category = values['category'];
  // }

  render() {
    const popUp = this.state.popUp ? <PopUpItem popUpState={()=>{this.toggleEditItem()}} item={this.props.item} category={this.props.category} newOrEdit={(values)=>{this.props.menu.editItem(this.props.item, this.props.category, values, this.props.count)}}/> : null

    return (
      
      <li>
        <Row>
          <Col xs={2}></Col>
          <Col xs={6} className="text-right" onClick={()=>{this.props.menu.addOrderItem(this.props.item, this.props.category)}} onDoubleClick={()=>{this.toggleEditItem()}}> {this.props.item['name']} - {this.props.item['description']} - {this.props.item['price']}</Col>
          <Col xs={1} bsSize="small" onClick={()=>{this.props.menu.deleteItem(this.props.category, this.props.count)}}><Glyphicon glyph="remove" /></Col>
          <Col xs={3}> </Col>
        </Row>
        {popUp}
      </li>
    );
  }
}))

export default ItemView;