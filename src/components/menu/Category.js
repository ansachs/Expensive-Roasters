import React, { Component } from 'react';

import Item from './Item'




class Menu extends Component {

  render() {
    // console.log('adsgdfgf') 

    return (
      
      
        <li> 
          <h2> {this.props.category} </h2>
          <ul>
            {this.props.items.map((item)=>{
              return <Item item={item} />
            })}
          </ul>
        </li>
 
    );
  }
}

export default Menu;
