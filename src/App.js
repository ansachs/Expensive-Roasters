import React, { Component } from 'react';
import './App.css';
import Menu from './pages/Menu';
import Devtools from 'mobx-react-devtools'

class App extends Component {
  render() {
    console.log('asdfasdf')
    return (
      
      <div className="App">
        <Devtools />
        <Menu />
      </div>
    );
  }
}

export default App;

