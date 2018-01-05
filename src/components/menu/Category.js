import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import ItemView from './itemView'

const Category = inject('menu')(observer(class Category extends Component {

  render() {

    return (
      <div>
        <li> 
          <h2 className="menu-categories">{this.props.category}</h2>
          <ul style={{'listStyle':'none'}}>
            {this.props.items.map((item, index)=>{
              return <ItemView 
                item={item} 
                count={index} 
                key={index} 
                category={this.props.category}/>
            })}
          </ul>
        </li>
      </div>
 
    );
  }
}))

export default Category;
