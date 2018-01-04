import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import ItemView from './itemView'

const Menu = inject('menu')(observer(class Menu extends Component {

  changeCategory(){
    const newCategory = prompt("rename category:", this.props.category)
    this.props.menu.renameCategory(this.props.category, newCategory)
  }

  render() {
    // console.log(this.props)
    // console.log(this.props.menu.menuItems) 
    // const test = =>{return(MenuStore)}))

    // console.log(this.props.items)
    return (
      
      <div>
        <li> 
          <h2 onDoubleClick={(event)=>{this.changeCategory()}} className="menu-categories">{this.props.category}</h2>
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
