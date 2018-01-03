import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';

import { observable, useStrict, extendObservable, toJS} from 'mobx';
import {observer, Provider} from 'mobx-react';

import ItemView from '../../../components/editmenu/itemView';

import Adapter from 'enzyme-adapter-react-16'
import Enzyme from "enzyme";
import { shallow, simulate, mount } from 'enzyme'
// import ReactDOMServer from 'react-dom/server';
// import _ from 'lodash';

Enzyme.configure({ adapter: new Adapter() })

describe('EditMenu', () => {
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
      addOrderItem: jasmine.createSpy(),
      editItem: jasmine.createSpy(),
      deleteItem: jasmine.createSpy()
    };

  });

  describe('edit functions', () => {
    it('when an item is double clicked it creates a popup form', () => {

      const domElement = shallow (
        <ItemView.wrappedComponent menu={testmenu} item={item1} />
        )

      domElement.setState({popUp: false})
 
      domElement.find('[data-test="order-item"]').first().simulate("doubleclick")

      console.log(domElement.state())

      expect(domElement.state("popUp")).toEqual(true);
    });
  });
});

