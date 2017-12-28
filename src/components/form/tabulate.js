import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Glyphicon} from 'react-bootstrap'



const Tabulate = inject('menu')(observer(class Tabulate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

render() {
  let summary;
    return (
      <Row>
        <ul>
          
        </ul>
        {summary}
      </Row>
    );
  }
}))


export default Tabulate;