import {observable, computed, autorun} from 'mobx';
import StartMenu from "../data/menu.json"

class MenuStore {
  menuItems = observable({});

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
      // category.forEach((item)=>{
      //   
      // }) 
    }
  }

  newItem(category, name, description, price){
    let newItem = new Item(name, description, price)
    if (this.menuItems[category] === null) {
      this.newCategory(category)
    } 
    this.menuItems[category].push(newItem)
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