import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Glyphicon, Table,} from 'react-bootstrap'



const Summary = inject('menu')(observer(class Tabulate extends Component {



  



  
  render() {
    const orderTotal = this.props.menu.calculateOrderTotal()
    const totalTax = (orderTotal.pretax * orderTotal.tax).toFixed(2)
    const total = (orderTotal.pretax * orderTotal.tax + orderTotal.pretax).toFixed(2)
    const form = (
  <Table striped bordered condensed hover data-test="order-summary">
    <thead style={{ 'borderBottom': '3'+'px', 'borderStyle':'solid'}}>
      <tr>
        <th> subtotal </th>
        <td>{orderTotal.pretax}</td>
      </tr>
           <tr>
        <th> tax </th>
        <td>{totalTax}</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th> total </th>
        <td>{total}</td>
      </tr>
    </tbody>
  </Table>
    )
    return(this.props.menu.order.slice().length > 0 ? form : null)

    // return (
    //   {orderSummary}
    // )
  }
}))


export default Summary;