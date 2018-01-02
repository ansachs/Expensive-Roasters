
import MenuStore from '../../stores/menuStore';
import {orderItem} from '../../stores/menuStore';
import { action, useStrict } from 'mobx';

describe('MenuStore', () => {
  useStrict(false)
  let menu = MenuStore;
  let validItem = {"category": "appetizers", "name": "shrimp lo mein", "description": "stir fried noodles with shrimp ", "price": "5.00" };
  let oldItem = {category: "beef", name: "Ginger Beef", description: "gingery beef", price: "1.00"}
  let newItemSameCat = {category: "beef", name: "orange Beef", description: "orange flavored beef", price: "1.00"}
  let newItemDiffCat = {category: "chicken", name: "orange Beef", description: "orange flavored beef", price: "1.00"}
  let newItemNewCat = {category: "drinks", name: "orange Beef", description: "orange flavored beef", price: "1.00"}



  // beforeEach(() => {
  //   todoStore = new TodoStore();
  // });
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
    it('it adds an item to the menu items list', () => {
      menu.newItem(validItem);
      let categoryItems = menu.menuItems.get('appetizers').slice();
      expect(categoryItems).toContainEqual(validItem);
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
    it('removes old item in same category replaces it with a new item', () => {
      menu.editItem(oldItem, newItemSameCat);
      expect(menu.menuItems.get(oldItem["category"])).toContainEqual(newItemSameCat);
    });
  });

  describe('editItem', () => {
    it('removes old item and adds it to new category', () => {
      menu.editItem(oldItem, newItemDiffCat);
      expect(menu.menuItems.get(newItemDiffCat["category"])).toContainEqual(newItemDiffCat);
    });
  });

  describe('editItem', () => {
    it('removes old item and creates a new category', () => {
      menu.editItem(oldItem, newItemNewCat);
      expect(menu.menuItems.get(newItemNewCat["category"])).toContainEqual(newItemNewCat);
    });
  });

  describe('deleteItem', () => {
    it('deletes a menu item', () => {
      menu.deleteItem(oldItem)
      
      expect(menu.menuItems.get(oldItem["category"])).not.toContainEqual(oldItem);
    });
  });

  describe('addOrderItem', () => {
    it('adds an item to the order list', () => {
      menu.addOrderItem(oldItem)
      let newOrderItem = new orderItem(oldItem)
      
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
      menu.addOrderItem(oldItem)
      menu.addOrderItem(oldItem)
      menu.addOrderItem(oldItem)

      let orderTotal = 3 * parseInt(oldItem["price"])
      
      expect(menu.calculateOrderTotal()).toEqual(expect.objectContaining({pretax: orderTotal,tax: expect.any(Number) }))
    });
  });
  



});
