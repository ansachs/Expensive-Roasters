import MenuStore from '../../stores/menuStore';
import StartMenu from "../../data/menu.json"
import {orderItem} from '../../stores/menuStore';
import { action, useStrict } from 'mobx';



describe('MenuStore', () => {
  let menu;
  let validItem = {"category": "appetizers", "name": "shrimp lo mein", "description": "stir fried noodles with shrimp ", "price": "5.00"};

  let invalidItem = {"category": "appetizers", "name": 123, "description": "stir fried noodles with shrimp ", "price": "bonkers"};

  let newItemSameCat = {category: "beef", name: "orange Beef", description: "orange flavored beef", price: "1.00"};

  let newItemDiffCat = {category: "chicken", name: "orange Beef", description: "orange flavored beef", price: "1.00"};

  let newItemNewCat = {category: "drinks", name: "orange Beef", description: "orange flavored beef", price: "1.00"};

  beforeEach(function(){
    menu = new MenuStore(StartMenu);
  })

  describe('checkInvalid', () => {
    it('return true for a non string or string of zero length', () => {

      expect(menu.checkInvalid("")).toEqual(true);
    });
  });

  describe('checkInvalid', () => {
    it('return false for a string greater than zero length', () => {

      expect(menu.checkInvalid("abc")).toEqual(false);
      
    });
  });

  describe('newItem', () => {
    beforeEach(function(){
    menu = new MenuStore(StartMenu);
   })
    it('it adds an item to the menu items list', () => {
      const newItem =  menu.newItem(validItem);
      let categoryItems = menu.menuItems.get('appetizers').slice();
      validItem.uniqueID = newItem.uniqueID
      expect(categoryItems).toContainEqual(validItem);
    });

    it('it will not add an invalid item', () => {
      menu.newItem(invalidItem);
      let categoryItems = menu.menuItems.get('appetizers').slice();
      expect(categoryItems).not.toContainEqual(invalidItem);
    });
  });

  describe('renameCategory', () => {
    it('it renames a category', () => {
      let oldName = "chicken";
      let newName = "lamb";

      menu.renameCategory(oldName, newName);
      expect(menu.categories).toContain(newName);
    });
  });

  describe('newCategory', () => {
    it('will create a new category if none exists', () => {
      menu.newCategory('drinks')
      let category = menu.menuItems.get('drinks').slice();
      expect(category).toHaveLength(0);
    });
  });

  describe('editItem', () => {
    beforeEach(function(){
    menu = new MenuStore(StartMenu);
   })
    it('removes old item in same category replaces it with a new item', () => {
      const oldItem = menu.menuItems.get("beef").slice()[0]
      menu.editItem(oldItem, newItemSameCat);
      newItemSameCat.uniqueID = expect.any(Number)
      expect(menu.menuItems.get(oldItem["category"])).toContainEqual(newItemSameCat);
    });

    it('removes old item and adds it to new category', () => {
      const oldItem = menu.menuItems.get("beef").slice()[0]
      menu.editItem(oldItem, newItemDiffCat);
      newItemDiffCat.uniqueID = expect.any(Number)
      expect(menu.menuItems.get(newItemDiffCat["category"])).toContainEqual(newItemDiffCat);
    });

    it('removes old item and creates a new category', () => {
      const oldItem = menu.menuItems.get("beef").slice()[0]
      menu.editItem(oldItem, newItemNewCat);
      newItemNewCat.uniqueID = expect.any(Number)
      expect(menu.menuItems.get(newItemNewCat["category"])).toContainEqual(newItemNewCat);
    });

    it('will not edit an item with new invalid data', () => {
      const oldItem = menu.menuItems.get("beef").slice()[0]
      menu.editItem(oldItem, invalidItem);
      invalidItem.uniqueID = expect.any(Number)
      expect(menu.menuItems.get(invalidItem["category"])).not.toContainEqual(invalidItem);
    });
  });

  describe('deleteItem', () => {
    it('deletes a menu item', () => {
      const oldItem = menu.menuItems.get("beef").slice()[0]
      menu.deleteItem(oldItem)
      expect(menu.menuItems.get(oldItem["category"])).not.toContainEqual(oldItem);
    });
  });

  describe('addOrderItem', () => {
    it('adds an item to the order list', () => {
      const oldItem = menu.menuItems.get("beef").slice()[0]
      menu.addOrderItem(oldItem)
      let newOrderItem = new orderItem(oldItem)
      newOrderItem.uniqueID = expect.any(Number)
      expect(menu.order).toContainEqual(newOrderItem);
    });
  });

  describe('deleteOrderItem', () => {
    it('removes and item from the order list', () => {
      let index = menu.order.findIndex((items) => {return (items['name'] === oldItem['name'])})
      menu.deleteOrderItem(index)
      
      expect(menu.order).toHaveLength(0);
    });
  });

  describe('calculateOrderTotal', () => {
    it('calculates the totals for an order', () => {
      const oldItem = menu.menuItems.get("beef").slice()[0]
      menu.addOrderItem(oldItem)
      menu.addOrderItem(oldItem)
      menu.addOrderItem(oldItem)

      let orderTotal = 3 * parseInt(oldItem["price"])
      
      expect(menu.calculateOrderTotal()).toEqual(expect.objectContaining({pretax: orderTotal,tax: expect.any(Number) }))
    });
  });
});
