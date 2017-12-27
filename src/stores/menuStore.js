import {observable, computed, autorun, action} from 'mobx';
import {observer} from 'mobx-react';
import StartMenu from "../data/menu.json"
import _ from 'lodash'

class MenuStore {
  menuItems = observable.map({});
  categories = observable([]);

  constructor(startMenu) {
      this.loadMenu(StartMenu)
      // console.log(this.menuItems);
  }

  loadMenu(startMenu) {
    for (let category in startMenu) {
      this.categories.push(category)
      let tempArray = []
      startMenu[category].forEach((item)=>{
        let newItem = new Item(category, item['name'], item['description'], item['price'])
        tempArray.push(newItem)
      })
      this.menuItems.set(category, tempArray)
    }
  }

  newItem(itemInfo){
    const newItem = new Item(itemInfo["name"], itemInfo["description"], itemInfo["price"])
    
    if (!this.menuItems.has(itemInfo["category"])) {
      this.newCategory(itemInfo["category"])
    } 
    this.menuItems.get(itemInfo["category"]).push(newItem)
  }

  renameCategory(oldName, newName, index){
    if (oldName !== newName) {
      console.log(oldName, newName, index)
      this.categories[index] = newName;
      let items = this.menuItems.get(oldName);
      this.menuItems.delete(oldName);
      this.menuItems.set(newName, items);
    }
    console.log(this.categories.slice())
  }

  newCategory(category){
    this.menuItems.set(category, []);
  }

  editItem(oldItem, category, newItem) {
    const oldCategoryItems = this.menuItems.get(category).filter((item)=>{item['name']!== oldItem['name']})
    this.menuItems.set(category,oldCategoryItems)
    if (!this.menuItems.has(newItem["category"])) {
      this.newCategory(newItem["category"])
    }
    const newCategoryItems = this.menuItems.get(newItem["category"])
    const addItem = new Item(newItem["name"], newItem["description"], newItem["price"])
    newCategoryItems.push(addItem)
  }
}


export class Item {
    category = observable(null);
    name = observable(null);
    description = observable(null);
    price = observable(null);
 
    constructor(category, name, description, price){
      this.category = category;
      this.name = name;
      this.description = description;
      this.price = price;
    }
}

export default new MenuStore(StartMenu);