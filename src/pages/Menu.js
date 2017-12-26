import React, { Component } from 'react';
import Category from '../components/menu/Category'
import MenuStore from '../stores/menuStore'
// import StartMenu from "../data/menu.json"
import {observer} from 'mobx-react';
import AddItem from '../components/menu/addItem'
import PopUpItem from '../components/menu/popUpItem'


const Menu = observer(class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      popUp: false
    }
  }

  toggleAddItem() {
    this.setState({popUp:!this.state.popUp})
    console.log('run popUp')
  }

  render() {
    const categories = Object.keys(MenuStore.menuItems)
    

    return (
      
      <div >
        test
        <ul>
          {categories.map((category)=>{
            return <Category category={category} items={MenuStore.menuItems[category]}/>
          })}
        </ul>
        <button onClick={()=>{this.toggleAddItem()}}>click to add an item</button>
        {this.state.popUp ? <PopUpItem popUpState={()=>{this.toggleAddItem()}}/> : null}
      </div>
    );
  }
})

export default Menu;
