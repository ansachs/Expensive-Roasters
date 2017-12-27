import React, { Component } from 'react';
import ItemView from './itemView'
import {inject, observer} from 'mobx-react';

var Test = inject('color')(observer(class Test extends Component {

  render() {
    


    return (
      
      <div>
        {this.props.color}
      </div>
 
    );
  }
}))

export default Test;
