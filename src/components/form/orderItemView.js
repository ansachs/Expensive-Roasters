import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Glyphicon} from 'react-bootstrap'



var ItemView = inject('menu')(observer(class ItemView extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }




  render() {

    return (
      
      <li>
        <Row>
         {/* <Col xs={2}></Col>*/}
          <Col xs={6} className="text-right" > {this.props.item['name']} - {this.props.item['price']} -- {this.props.item['quantity']}</Col>
          <Col xs={1} bsSize="small" onClick={()=>{this.props.menu.deleteOrderItem(this.props.count)}}><Glyphicon glyph="remove" /></Col>
          <Col xs={1} bsSize="small" >
            <Row>
              <Glyphicon onClick={()=>this.props.menu.addOrderQuantity(this.props.count)} glyph="chevron-up" />
            </Row>
            <Row>
              <Glyphicon onClick={()=>this.props.menu.subtractOrderQuantity(this.props.count)} glyph="chevron-down" />
            </Row>
          </Col>
          {/*<Col xs={3}> </Col>*/}
        </Row>
      </li>
    );
  }
}))

export default ItemView;