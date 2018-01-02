import React, { Component } from 'react';
import {observer, Provider, inject} from 'mobx-react';
import {Row, Col} from 'react-bootstrap'

// import MenuStore from '../stores/menuStore'


import Category from '../components/editmenu/Category'
import AddItem from '../components/editmenu/addItem'
import Tabulate from '../components/form/tabulate'




const Menu = inject('menu')(observer(class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      popUp: false
    }
  }

  toggleAddItem() {
    this.setState({popUp:!this.state.popUp})
  }

  addCategory() {
    let category = prompt("enter a name for a new category")
    this.props.menu.newCategory(category) 
  }

  render() {

    const categoryView = this.props.menu.categories.map((category, index)=>{
            // console.log(index)
            return (<Category category={category} count={index} items={this.props.menu.menuItems.get(category)} />)

            })

    const addItemButton = (
      <button onClick={()=>{this.toggleAddItem()}}>click to add an item</button>
      )
    const addCategoryButton = (
      <button onClick={()=>{this.addCategory()}}>click to add a category</button>
      )
    
    const popUp = this.state.popUp ? <AddItem popUpState={()=>{this.toggleAddItem()}}/> : null

    return (  
      
        <Row>
          <Col xs={2} />
          <Col xs={5}>
            {/*<Test />*/}
            <ul style={{'listStyle':'none'}}>
              {categoryView}
            </ul>
            {addItemButton}
            {addCategoryButton}
          </Col>
            {popUp}
          
          <Col xs={5}>
          </Col>
        </Row>
      
    );
  }
}))

export default Menu;