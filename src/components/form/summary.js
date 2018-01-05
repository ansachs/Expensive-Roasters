import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Table, ButtonToolbar, Button} from 'react-bootstrap'

import '../../styles/summary.css'



const Summary = inject('menu')(observer(class Tabulate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tip: 1
    }
  }
  
  render() {
    const orderTotal = this.props.menu.calculateOrderTotal()
    const totalTax = (orderTotal.pretax * orderTotal.tax).toFixed(2)
    let addTip = function (tip) {
      return(
        <tr>
          <th> tip </th>
          <td>${(orderTotal.pretax * tip).toFixed(2) }</td>
        </tr>
    )}

    const total = (orderTotal.pretax * orderTotal.tax + orderTotal.pretax * (1 + this.state.tip)).toFixed(2)  

    const withTip = (this.state.tip === 1 ? null : addTip(this.state.tip))

    const form = (
    <div>
      <Table striped bordered condensed hover data-test="order-summary">
        <thead style={{ 'borderBottom': '3px', 'borderStyle':'solid'}}>
          <tr>
            <th>subtotal</th>
            <td>${orderTotal.pretax}</td>
          </tr>
               <tr>
            <th>tax</th>
            <td>${totalTax}</td>
          </tr>
          {withTip}
        </thead>
        <tbody>
          <tr>
            <th>total</th>
            <td>${total}</td>
          </tr>
        </tbody>
      </Table>
      <Row>
        <div>Optional tip: </div>
        <ButtonToolbar id="button-bar">
          <Button onClick={()=>{this.setState({tip: 0.10})}} bsSize="small">10%</Button>
          <Button onClick={()=>{this.setState({tip: 0.15})}} bsSize="small">15%</Button>
          <Button onClick={()=>{this.setState({tip: 0.20})}} bsSize="small">20%</Button>
        </ButtonToolbar>
      </Row>
    </div>
    )

    return(this.props.menu.order.slice().length > 0 ? form : null)
  }
}))

export default Summary;