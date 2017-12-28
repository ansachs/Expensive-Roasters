import {observable, computed, autorun, action} from 'mobx';
import {observer} from 'mobx-react';
import StartMenu from "../data/menu.json"
import { sort } from 'lodash'

class MenuStore {
  menuItems = observable.map({});
  categories = observable([]);
  order = observable([]);

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
    // console.log(itemInfo)
    if (this.menuItems.has(itemInfo["name"])) {
      alert("please add an item with a unique name")
    } else {
      const newItem = new Item(itemInfo["category"], itemInfo["name"], itemInfo["description"], itemInfo["price"])
      if (!this.menuItems.has(itemInfo["category"])) {
        this.newCategory(itemInfo["category"])
        this.categories.push(itemInfo["category"])
      } 
      this.menuItems.get(itemInfo["category"]).push(newItem)
    }
  }

  renameCategory(oldName, newName, index){
    if (this.menuItems.has(newName)) {
      alert("cannot change name to existing category")
    } else if (oldName !== newName) {
      // console.log(oldName, newName, index)
      this.categories[index] = newName;
      let items = this.menuItems.get(oldName);
      this.menuItems.delete(oldName);
      this.menuItems.set(newName, items);
    }
    // console.log(this.categories.slice())
  }

  newCategory(category){
    this.menuItems.set(category, []);
  }

  editItem(oldItem, category, replaceItem, index) {
    console.log(this.menuItems.get(category).slice(), category, replaceItem, index)
    const newItem = new Item(replaceItem["category"], replaceItem["name"], replaceItem["description"], replaceItem["price"]);

    if (!this.menuItems.has(newItem["category"])) {
      console.log('new cat')
        this.newCategory(newItem["category"]);
        this.categories.push(newItem["category"]);
    } else if (category !== newItem["category"]) {
      console.log('moved cat')
        this.menuItems.get(newItem["category"]).push(newItem);
        this.menuItems.get(category).splice(index,1)
    } else {
      console.log('splice ran')
      let values = this.menuItems.get(category).slice()
      values.splice(index, 1, newItem)
      this.menuItems.set(category, values)
    }
    
  }

  deleteItem(category, index) {
    const modifiedItems = this.menuItems.get(category).slice();
    modifiedItems.splice(index, 1);
    this.menuItems.set(category, modifiedItems);
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