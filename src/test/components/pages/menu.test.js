import React from 'react';
import { observable, useStrict, extendObservable} from 'mobx';
import ReactTestUtils from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import Menu from '../../../pages/menu';
import {observer, Provider} from 'mobx-react';
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from "enzyme";
import { shallow } from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

describe('Menu', () => {
  let testmenu;
  let menuItems;
  let categories;

  let item1 = {"category": "appetizers", "name": "shrimp lo mein", "description": "stir fried noodles with shrimp ", "price": "5.00" };
  let item2 = {category: "beef", name: "Ginger Beef", description: "gingery beef", price: "1.00"}

  let item3 = {category: "noodles", name: "pasta", description: "spicy pasta", price: "2.00"}

  beforeEach(() => {
    //turn off strict mode when testing with mock store
    console.log(item1)
    useStrict(false);
     menuItems = observable.map({"beef": [item1, item2]})
     categories = observable(["beef"])

    testmenu = {
      menuItems: menuItems,
      categories: categories,
      removeTodo: jasmine.createSpy(),
      fetchTodos: jasmine.createSpy()
    };

    // extendObservable(testmenu, {
    //   menuItems: menuItems,
    //   categories: categories

    // })
    // console.log(menu)
    // menu.menuItems = {item1["category"]:[item1], item2["category"]:[item2], item3["category"]:[item3]}
    // menu.menuItems.set(item1["category"], [item1])
  });


  

  it('displays the list of categories', function(){
    console.log(testmenu.categories.slice())
    const component = shallow(
      <Menu.wrappedComponent menu={testmenu}/>
      );
    console.log(component.debug())
    // component.find('Row')
    // const domElement = findDOMNode(component);

    // const items = domElement.querySelectorAll('[data-test="item"]');
    // const itemText = _.map(items, (item) => {
    //   return item.textContent;
    // });
    // expect(itemText).toEqual(['first item', 'second item']);
    });

  // describe('on mount', () => {
  //   it('calls fetchTodos from its store prop', () => {
  //     const component = renderIntoDocument(<App store={store}/>);
  //     expect(store.fetchTodos).toHaveBeenCalled();
  //   });
  // });

  // describe('when add item is pressed', () => {
  //   it('calls addTodo on its store prop, passing in the input value', () => {
  //     const component = renderIntoDocument(<App store={store}/>);
  //     const domElement = findDOMNode(component);
  //     const inputField = domElement.querySelector('[data-test="item-field"]');

  //     inputField.value = 'Get rice';
  //     Simulate.change(inputField);
  //     Simulate.submit(domElement.querySelector('[data-test="item-form"]'));

  //     expect(store.addTodo).toHaveBeenCalledWith('Get rice');
  //   });
  // });

});