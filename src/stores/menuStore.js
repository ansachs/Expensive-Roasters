import {observable, computed, autorun, action} from 'mobx';
import {observer} from 'mobx-react';
import StartMenu from "../data/menu.json"

class MenuStore {
  menuItems = observable.map({});

  constructor(startMenu) {
      this.loadMenu(StartMenu)
      // console.log(this.menuItems);
  }

  loadMenu(startMenu) {
    for (let category in startMenu) {
      this.menuItems[category] = startMenu[category].map((item)=>{
        let newItem = new Item(item['name'], item['description'], item['price'])
        return newItem;
      })
    }
  }

  newItem(itemInfo){
    
    const newItem = new Item(itemInfo["name"], itemInfo["description"], itemInfo["price"])
    
    if (this.menuItems[itemInfo["category"]] == undefined) {
      this.newCategory(itemInfo["category"])
    } 
    
    this.menuItems[itemInfo["category"]].push(newItem)
    console.log(this.menuItems)
  }

  editItem(item, category, values) {
    console.log(category)
    // const newMenu = this.menuItems
    this.menuItems[category] = this.menuItems[category].filter((oldItem)=>{oldItem['name'] !== item['name']})
    // this.menuItems = newMenu
    console.log(this.menuItems[category])
    if (this.menuItems[values["category"]] == undefined) {
      this.newCategory(values["category"])
    } 
    const newItem = new Item(values["name"], values["description"], values["price"])
    console.log(newItem)
    this.menuItems[values["category"]].push(newItem)
    Object.assign(this.menuItems, this.menuItems)
    console.log(this.menuItems)
  }

  newCategory(category){
    this.menuItems[category] =[];
  }
}


export class Item {

    name = observable(null);
    description = observable(null);
    price = observable(null);
 
    constructor(name, description, price){
      this.name = name;
      this.description = description;
      this.price = price;
    }
}

export default new MenuStore(StartMenu);