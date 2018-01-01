import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap'
import {observer, Provider, inject} from 'mobx-react';

import Category from '../components/menu/Category'
// import MenuStore from '../stores/menuStore'

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

  render() {
    // console.log(MenuStore.menuItems.entries())
    // const categories = MenuStore.menuItems.keys()
    const categoryView = this.props.menu.categories.map((category, index)=>{
            return (
              <Category category={category} count={index} key={index} items={this.props.menu.menuItems.get(category)} />
              )
            })

    return (  
      
        <Row>
          <Col xs={2}>
          </Col>
          <Col xs={5}>
            <ul style={{'listStyle':'none'}}>
            {categoryView}
            </ul>
          </Col>
          <Col xs={3}>
            <Tabulate />
          </Col>
          <Col xs={2}>
          </Col >
        </Row>
      
    );
  }
}))

export default Menu;
