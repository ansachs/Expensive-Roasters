import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import { observable, useStrict, extendObservable, toJS} from 'mobx';
import {observer, Provider} from 'mobx-react';
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from "enzyme";
import { shallow, simulate, mount } from 'enzyme'

import Summary from '../../../components/form/summary';



Enzyme.configure({ adapter: new Adapter() })

describe('Summary', () => {
  let testmenu;
  let component;
  let domElement;

  let item1 = {"category": "appetizers", "name": "shrimp lo mein", "description": "stir fried noodles with shrimp", "price": "5.00", uniqueID: 1 };
  let item2 = {category: "beef", name: "Ginger Beef", description: "gingery beef", price: "1.00", uniqueID: 2}

  let item3 = {category: "beef", name: "pasta", description: "spicy pasta", price: "2.00", uniqueID: 3}

  let orderItem1 = {category: "appetizers", name: "shrimp lo mein", price: "5.00", quantity: 2, uniqueID: 4 }

  let orderItem2 = {category: "beef", name: "beef stir-fry", price: "2.00", quantity: 3, uniqueID: 5 }

  let getItems = function() {
    const nonObsMenu = toJS(testmenu.menuItems);
    return Object.values(nonObsMenu).reduce((array, curr)=>{return array.concat(curr)},[]);
    }

  beforeEach(function(){

    testmenu = {
      menuItems: observable.map({"beef": [item2, item3], "appetizers":[item1]}),
      categories: observable(["beef", "appetizers"]),
      order: observable([orderItem1, orderItem2]),
      calculateOrderTotal: ()=>{return {pretax: 10, tax: 0.07}},
      fetchTodos: jasmine.createSpy(),
      addOrderItem: jasmine.createSpy(),
      editItem: jasmine.createSpy(),
      deleteItem: jasmine.createSpy(),
      renameCategory: jasmine.createSpy(),
      deleteOrderItem: jasmine.createSpy(),
      addOrderQuantity: jasmine.createSpy()
    };

  });

  describe('Summary', () => {
    it('allows you select a tip, for instance 10%', () => {

      const domElement = shallow (
        <Summary.wrappedComponent menu={testmenu} item={item1} />
        )
      domElement.setState({tip: 1})
 
      domElement.find('Button').first().simulate('click') 

      expect(domElement.state("tip")).toEqual(1.1);
    });
  });
});



