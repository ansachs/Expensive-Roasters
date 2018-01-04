import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col} from 'react-bootstrap'



var ItemView = inject('menu')(observer(class ItemView extends Component {



  render() {
    
    return (
      
      <li className="menu-items">
        <Row>
          <Col xs={2}></Col>
          <Col xs={6} className="text-right" data-test="user-add" onClick={()=>{this.props.menu.addOrderItem(this.props.item)}} >{this.props.item['name']} - {this.props.item['description']} - {this.props.item['price']}</Col>
          <Col xs={4}> </Col>
          
        </Row>

      </li>
    );
  }
}))

export default ItemView;