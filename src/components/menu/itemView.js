import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Glyphicon} from 'react-bootstrap'



var ItemView = inject('menu')(observer(class ItemView extends Component {



  render() {
    
    return (
      
      <li>
        <Row>
        
          <Col xs={10} className="text-right" onClick={()=>{this.props.menu.addOrderItem(this.props.item, this.props.category)}} > {this.props.item['name']} - {this.props.item['description']} - {this.props.item['price']}</Col>
          
          
        </Row>

      </li>
    );
  }
}))

export default ItemView;