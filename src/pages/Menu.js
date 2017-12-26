import React, { Component } from 'react';
import Category from '../components/menu/Category'
import MenuStore from '../stores/menuStore'
// import StartMenu from "../data/menu.json"
import {observer} from 'mobx-react';
import AddItem from '../components/menu/addItem'


const Menu = observer(class Menu extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log('what teh hell')
    console.log(MenuStore)
    const categories = Object.keys(MenuStore.menuItems)
    console.log(categories)
    return (
      
      <div >
        test
        <ul>
          {categories.map((category)=>{
            return <Category category={category} items={MenuStore.menuItems[category]}/>
          })}
        </ul>
        <AddItem />
      </div>
    );
  }
})

export default Menu;
