import React, { Component } from 'react';
import Category from '../components/menu/Category'
import MenuStore from '../stores/menuStore'
// import StartMenu from "../data/menu.json"
import {observer, Provider} from 'mobx-react';
import AddItem from '../components/menu/addItem'

import Test from '../components/menu/test'


const Menu = observer(class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      popUp: false
    }
  }

  toggleAddItem() {
    this.setState({popUp:!this.state.popUp})
  }

  render() {
    console.log(MenuStore.menuItems.entries())
    const categories = MenuStore.menuItems.keys()
    const categoryView = categories.map((category)=>{
            return (<Category category={category} items={MenuStore.menuItems.get(category)} />)
            })
    const addItemButton = <button onClick={()=>{this.toggleAddItem()}}>click to add an item</button>
    const popUp = this.state.popUp ? <AddItem popUpState={()=>{this.toggleAddItem()}}/> : null

    return (  
      <Provider menu={MenuStore} > 
        <div >
          {/*<Test />*/}
          <ul>
            {categoryView}
          </ul>
          {addItemButton}
          {popUp}
        </div>
      </Provider>
    );
  }
})

export default Menu;
