import React, { Component } from 'react';


class Item extends Component {
  render() {
    // console.log('this is crap')
    return (
      
      <li>
        <p> {this.props.item['name']} </p>
      </li>
    );
  }
}

export default Item;