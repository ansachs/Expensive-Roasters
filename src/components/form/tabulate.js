import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Glyphicon} from 'react-bootstrap'
import ItemView from './orderItemView'
import Summary from './summary'


const Tabulate = inject('menu')(observer(class Tabulate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }


render() {
  console.log('tabulate')
  const orderItems = (
    <ul style={{'list-style':'none'}}>
              {this.props.menu.order.map((item, index)=>{
                return <ItemView item={item} key={index} count={index} category={this.props.category} />
              })}
    </ul>
  )
  // const orderTotal = this.props.menu.calculateOrderTotal()
  // const totalTax = orderTotal.pretax * orderTotal.tax
  // const total = orderTotal.pretax * orderTotal.tax + orderTotal.pretax

  
  // const summary = this.props.menu.order.slice.length > 0 ? summary : null;
    return (
      <Row>
        {orderItems}
        <Summary />
      </Row>
    );
  }
}))


export default Tabulate;