import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import ItemView from './itemView'

const Menu = inject('menu')(observer(class Menu extends Component {

  changeCategory(){
    const newCategory = prompt("rename category:", this.props.category)
    this.props.menu.renameCategory(this.props.category, newCategory)
  }

  render() {
    return (   
      <div>
        <li> 
          <h2 onDoubleClick={(event)=>{this.changeCategory()}} className="menu-categories">{this.props.category}</h2>
          <ul style={{'listStyle':'none'}}>
            {this.props.items.map((item, index)=>{
              return <ItemView 
                item={item} 
                count={index} 
                key={index} 
                category={this.props.category} />
            })}
          </ul>
        </li>
      </div>
 
    );
  }
}))

export default Menu;
