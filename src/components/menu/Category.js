import React, { Component } from 'react';
import ItemView from './itemView'
import {inject, observer} from 'mobx-react';

const Menu = inject('menu')(observer(class Menu extends Component {

  changeCategory(){
    const newCategory = prompt("rename category:", this.props.category)
    this.props.menu.renameCategory(this.props.category, newCategory, this.props.count)
  }

  render() {
    // console.log(this.props)
    // console.log(this.props.menu.menuItems) 
    // const test = =>{return(MenuStore)}))

    // console.log(this.props.items)
    return (
      
      <div>
        <li> 
          <h2 onDoubleClick={(event)=>{this.changeCategory()}}> {this.props.category} </h2>
          <ul style={{'list-style':'none'}}>
            {this.props.items.map((item)=>{
              return <ItemView item={item} category={this.props.category} />
            })}
          </ul>
        </li>
      </div>
 
    );
  }
}))

export default Menu;
