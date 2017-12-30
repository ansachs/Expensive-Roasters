import React, { Component } from 'react';
import Category from '../components/menu/Category'
import MenuStore from '../stores/menuStore'
// import StartMenu from "../data/menu.json"
import {observer, Provider} from 'mobx-react';
import AddItem from '../components/menu/addItem'
import Tabulate from '../components/form/tabulate'

import Test from '../components/menu/test'
import {Row, Col} from 'react-bootstrap'


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
    // console.log(MenuStore.menuItems.entries())
    // const categories = MenuStore.menuItems.keys()
    const categoryView = MenuStore.categories.map((category, index)=>{
            // console.log(index)
            return (<Category category={category} count={index} items={MenuStore.menuItems.get(category)} />)

            })
    const addItemButton = (
      <button onClick={()=>{this.toggleAddItem()}}>click to add an item</button>
      )
    const popUp = this.state.popUp ? <AddItem popUpState={()=>{this.toggleAddItem()}}/> : null

    return (  
      <Provider menu={MenuStore} > 
        <Row>
          <Col xs={8}>
            {/*<Test />*/}
            <ul style={{'list-style':'none'}}>
              {categoryView}
            </ul>
            {addItemButton}
            {popUp}
          </Col>
          <Col xs={4}>
            <Tabulate />
          </Col>
        </Row>
      </Provider>
    );
  }
})

export default Menu;
