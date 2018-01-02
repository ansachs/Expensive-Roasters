import React, { Component } from 'react';
import ItemView from './itemView'
import {inject, observer} from 'mobx-react';

const Category = inject('menu')(observer(class Category extends Component {

  

  render() {
    // console.log(this.props.items.slice())
    return (
      
      <div>
        <li> 
          <h2> {this.props.category} </h2>
          <ul style={{'listStyle':'none'}}>
            {this.props.items.map((item, index)=>{
              return <ItemView item={item} count={index} key={index} category={this.props.category} />
            })}
          </ul>
        </li>
      </div>
 
    );
  }
}))

export default Category;
