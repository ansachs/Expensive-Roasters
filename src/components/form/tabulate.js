import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Glyphicon} from 'react-bootstrap'

import ItemView from './orderItemView'
import Summary from './summary'
import tabulate from '../../styles/tabulate.css'


const Tabulate = inject('menu')(observer(class Tabulate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }


render() {
  console.log('tabulate')
  const orderItems = (
    <ul style={{'listStyle':'none'}}>
              {this.props.menu.order.map((item, index)=>{
                return <ItemView item={item} key={index} count={index} category={this.props.category} />
              })}
    </ul>
  )
  
    return (
      <Row>
        <h2> Order Summary </h2>
        <div id="order-summary">
        {orderItems}
        </div>
        <Summary />
      </Row>
    );
  }
}))


export default Tabulate;