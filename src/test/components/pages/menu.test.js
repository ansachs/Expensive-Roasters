import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import { observable, useStrict, extendObservable, toJS} from 'mobx';
import {observer, Provider} from 'mobx-react';
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from "enzyme";
import { shallow, simulate, mount } from 'enzyme'

import Menu from '../../../pages/menu';




Enzyme.configure({ adapter: new Adapter() })

describe('Menu', () => {
  let testmenu;
  let component;
  let domElement;

  let item1 = {"category": "appetizers", "name": "shrimp lo mein", "description": "stir fried noodles with shrimp", "price": "5.00" };
  let item2 = {category: "beef", name: "Ginger Beef", description: "gingery beef", price: "1.00"}

  let item3 = {category: "beef", name: "pasta", description: "spicy pasta", price: "2.00"}

  let orderItem1 = {category: "appetizers", name: "shrimp lo mein", price: "5.00", quantity: 2 }

  let getItems = function() {
    const nonObsMenu = toJS(testmenu.menuItems);
    return Object.values(nonObsMenu).reduce((array, curr)=>{return array.concat(curr)},[]);
    }

  beforeEach(function(){

    testmenu = {
      menuItems: observable.map({"beef": [item2, item3], "appetizers":[item1]}),
      categories: observable(["beef", "appetizers"]),
      order: observable([orderItem1]),
      calculateOrderTotal: ()=>{return {pretax: 10, tax: 0.07}},
      fetchTodos: jasmine.createSpy(),
      addOrderItem: jasmine.createSpy()
    };

    domElement = mount(
        <Provider menu={testmenu} >
          <Menu />
        </Provider>
        )
  });

  describe('menu view', () => {
    it('displays the list of categories', function(){

      const items = domElement.find('.menu-categories')
      const itemText = items.map((item)=>{return item.text()})

      expect(itemText).toEqual(testmenu.categories.slice());
    });

    it('displays the list of items', function(){
    
      const itemText = domElement.find('.menu-items').map((item)=>{return item.text()})
      const expecteOutput = getItems().map((item)=>{return `${item["name"]} - ${item["description"]} - ${item["price"]}`})

      expect(itemText).toEqual(expecteOutput);
    });
  })

  describe('user menu order', () => {
    it('it adds an item to the order after it is clicked', () => {
 
      domElement.find('[data-test="user-add"]').first().simulate('click')

      expect(testmenu.addOrderItem).toHaveBeenCalledWith(item2);
    });

    it('it displays an order summary based on the order array', () => {

      const itemText = domElement.find('[data-test="order-summary"]').first().text()
 
      expect(itemText).toContain('subtotal$10tax$0.70total$10.70');
    });
  });
});