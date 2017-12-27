import React, { Component } from 'react';
import ItemView from './itemView'
import {inject, observer} from 'mobx-react';

const Menu = observer(class Menu extends Component {

  render() {
    // console.log(this.props.menu.menuItems) 
    // const test = =>{return(MenuStore)}))


    return (
      
      <div>
        {}
        <li> 
          <h2> {this.props.category} </h2>
          <ul>
            {/*this.props.items.map((item)=>{
              return <ItemView item={item} category={this.props.category} />
            })*/}
          </ul>
        </li>
      </div>
 
    );
  }
})

export default Menu;
