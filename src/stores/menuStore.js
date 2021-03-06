import {observable, extendObservable} from 'mobx';

export const tax = .07;
export let keyCounter = 0;

class MenuStore {
  menuItems = observable.map({});
  categories = observable([]);
  order = observable([]);


  constructor(startMenu) {
      this.loadMenu(startMenu)
  }

  loadMenu(startMenu) {
    Object.keys(startMenu).forEach((category)=>{
      this.categories.push(category);
      let tempArray = [];
      startMenu[category].forEach((item)=>{
        let newItem = new Item(category, item['name'], item['description'], item['price']);
        tempArray.push(newItem);
      })
      this.menuItems.set(category, tempArray)
    })
  }

  checkInvalid(name) {
    if (name === "" || typeof name !== 'string') {
      return true;
    } 
    return false;
  }

  newItem(itemInfo){

    if (this.menuItems.has(itemInfo["name"])) {
      alert("please add an item with a unique name");
    } else if (this.checkInvalid(itemInfo["category"]) || this.checkInvalid(itemInfo["name"]) || this.checkInvalid(itemInfo["description"]) || isNaN(itemInfo["price"])) {
      alert("all values must be valid");
    } else {
      const newItem = new Item(itemInfo["category"], itemInfo["name"], itemInfo["description"], itemInfo["price"])
      if (!this.menuItems.has(itemInfo["category"])) {
        this.newCategory(itemInfo["category"])
      } 
      this.menuItems.get(itemInfo["category"]).push(newItem);
      return newItem;
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
      if (oldItem["category"] !== newItem["category"]) {
        if(!this.menuItems.has(newItem["category"])) {
          this.newCategory(newItem["category"]);
          this.categories.push(newItem["category"]);
          this.menuItems.get(newItem["category"]).push(newItem);
        } else {
          this.menuItems.get(newItem["category"]).push(newItem);
        }
          let oldItems = this.menuItems.get(oldItem["category"]).slice()
          oldItems.splice(index, 1)
          this.menuItems.set(oldItem["category"], oldItems)
      } else {
        let oldItems = this.menuItems.get(oldItem["category"]).slice()
        oldItems.splice(index, 1, newItem)
        this.menuItems.set(oldItem["category"], oldItems)
      }
    }
  }

  deleteItem(item) {
    let index = this.findMenuItem(item);
    let modifiedItems = this.menuItems.get(item["category"]).slice()
    modifiedItems.splice(index, 1);
    this.menuItems.set(item["category"], modifiedItems);
  }

  findMenuItem(item) {
    return this.menuItems.get(item["category"]).findIndex((menuItem) => menuItem["name"] === item["name"])
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
    const preTax = this.order.reduce((a, curr)=>{ return a + parseInt(curr['price'], 10) * curr['quantity']},0)

    return ({pretax: preTax, tax: tax})
  }

  
}



export class Item {
 
    constructor(category, name, description, price){
      this.category = category;
      this.name = name;
      this.description = description;
      this.price = price;
      this.uniqueID = keyCounter ++; 
    }
}

export class orderItem{

  constructor(item, quantity = 1){
    extendObservable(this, {quantity: quantity})
    this.category = item["category"];
    this.name = item["name"];
    this.price = item["price"];
    this.quantity = quantity
    this.uniqueID = keyCounter ++;
  }
}

export default MenuStore;