import {observable, computed, autorun, action, isObservableArray, extendObservable} from 'mobx';
import {observer} from 'mobx-react';
import StartMenu from "../data/menu.json"
import { sort } from 'lodash'

export const tax = .07;

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

  checkInvalid(name) {
    if (name === "" || typeof name !== 'string') {
      return true;
    } 
    return false;
  }

    // checkNaN(number) {
    //   if (isNaN(number)) {
    //     return true;
    //   } 
    //   return false;
    // }

  newItem(itemInfo){

    if (this.menuItems.has(itemInfo["name"])) {
      alert("please add an item with a unique name")
    } else if (this.checkInvalid(itemInfo["category"]) || this.checkInvalid(itemInfo["name"]) || this.checkInvalid(itemInfo["description"]) || isNaN(itemInfo["price"])) {
      alert("all values must be valid")
    } else {
      const newItem = new Item(itemInfo["category"], itemInfo["name"], itemInfo["description"], itemInfo["price"])
      if (!this.menuItems.has(itemInfo["category"])) {
        this.newCategory(itemInfo["category"])
      } 
      this.menuItems.get(itemInfo["category"]).push(newItem)
    }
  }

  renameCategory(oldName, newName){
    if (this.menuItems.has(newName)) {
      alert("cannot change name to existing category")
    } else if (this.checkInvalid(newName)) {
      alert("invalid name");
    } else if (oldName !== newName) {
      let index = this.categories.findIndex((name)=>name === oldName)
      this.categories[index] = newName;
      let items = this.menuItems.get(oldName);
      this.menuItems.delete(oldName);
      this.menuItems.set(newName, items);
    }
  }

  newCategory(category){
    if (this.checkInvalid(category)) {
      alert("invalid name")
    } else {
      this.categories.push(category)
      this.menuItems.set(category, []);
    }
  }

  editItem(oldItem, replaceItem) {

    if (this.checkInvalid(replaceItem["category"]) || this.checkInvalid(replaceItem["name"]) || this.checkInvalid(replaceItem["description"]) || isNaN(replaceItem["price"])) {
      alert("all values must be valid")
    } else {
      let newItem = new Item(replaceItem["category"], replaceItem["name"], replaceItem["description"], replaceItem["price"]);
      let index = this.menuItems.get(oldItem["category"]).find((item)=>item["name"] === oldItem["name"])
      if(!this.menuItems.has(newItem["category"])) {
          this.newCategory(newItem["category"]);
          this.categories.push(newItem["category"]);
          this.menuItems.get(newItem["category"]).push(newItem);

      } else if (oldItem["category"] !== newItem["category"]) {
          this.menuItems.get(newItem["category"]).push(newItem);
          let oldItems = this.menuItems.get(oldItem["category"]).slice()
          oldItems.splice(index, 1)
      } else {
        let oldItems = this.menuItems.get(oldItem["category"]).slice()
        oldItems.splice(index, 1, newItem)
        this.menuItems.set(oldItem["category"], oldItems)
      }
    }
  }

  deleteItem(item) {
    let index = this.findMenuItem(item);
    let modifiedItems = this.menuItems.get(item["category"]).slice().splice(index, 1);
    this.menuItems.set(item["category"], modifiedItems);
  }

  findMenuItem(item) {
    return this.menuItems.get(item["category"]).findIndex((menuItem)=>menuItem["name"] === item["name"]) - 1
  }

  findItem(item){
    return this.order.findIndex((items) => {return (items['name'] === item['name'])}) 
  }


  addOrderItem(item) {
    let index = this.findItem(item)
    if (index > -1) {
      this.order[index]['quantity'] = this.order[index]['quantity'] + 1;
    } else {
      let newOrderItem = new orderItem(item)
      this.order.push(newOrderItem)
    }
    // console.log(this.order.slice())
    // console.log(isObservableArray(this.order))
  }

  addOrderQuantity(index) {
    this.order[index]['quantity'] ++;
  }

  subtractOrderQuantity(index){
    if (this.order[index]['quantity'] > 1)
      this.order[index]['quantity'] --;
  }

  deleteOrderItem(index){
    this.order.splice(index, 1)
  }

  calculateOrderTotal(){
    // const tax = 0.07;
    const preTax = this.order.reduce((a, curr)=>{ return a + parseInt(curr['price']) * curr['quantity']},0)

    return {pretax: preTax, tax: tax}
  }

//   function orderItem({
//   quantity = observable(null);

//   constructor(item, quantity = 1){
//     this.category = item["category"];
//     this.name = item["name"];
//     this.price = item["price"];
//     this.quantity = quantity
//   }
// })

  
}



export class Item {
 
    constructor(category, name, description, price){
      this.category = category;
      this.name = name;
      this.description = description;
      this.price = price;
    }
}

export class orderItem{

  constructor(item, quantity = 1){
    extendObservable(this, {quantity: quantity})
    this.category = item["category"];
    this.name = item["name"];
    this.price = item["price"];
    this.quantity = quantity
  }
}


export default new MenuStore(StartMenu);