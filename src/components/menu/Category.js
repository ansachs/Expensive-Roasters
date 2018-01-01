import React, { Component } from 'react';
import ItemView from './itemView'
import {inject, observer} from 'mobx-react';

const Menu = inject('menu')(observer(class Menu extends Component {

  

  render() {
 
    return (
      
      <div>
        <li> 
          <h2> {this.props.category} </h2>
          <ul style={{'listStyle':'none'}}>
            {this.props.items.map((item, index)=>{
              return <ItemView item={item} count={index} key={index} category={this.props.category} />
            })}
          </ul>
        </li>
      </div>
 
    );
  }
}))

export default Menu;
