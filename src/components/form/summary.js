import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Glyphicon, Table,} from 'react-bootstrap'



const Summary = inject('menu')(observer(class Tabulate extends Component {



  



  
  render() {
    const orderTotal = this.props.menu.calculateOrderTotal()
    const totalTax = (orderTotal.pretax * orderTotal.tax).toFixed(2)
    const total = (orderTotal.pretax * orderTotal.tax + orderTotal.pretax).toFixed(2)
    const form = (
  <Table striped bordered condensed hover>
    <thead style={{ 'border-bottom': '3'+'px', 'border-style':'solid'}}>
      <tr>
        <th> sub total </th>
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
    console.log(this.props.menu.order.slice().length )
    return(this.props.menu.order.slice().length > 0 ? form : null)

    // return (
    //   {orderSummary}
    // )
  }
}))


export default Summary;