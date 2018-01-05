import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/App.css';

import { Provider} from 'mobx-react';

import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Menu from './pages/menu';
import EditMenu from './pages/editMenu'

import Login from './components/auth/Login';

import Navigation from './components/common/Navigation';
import MenuStore from './stores/menuStore'
import StartMenu from "./data/menu.json"


function onAuthRequired({history}) {
  history.push('/login');
}

class App extends Component {

  render() {
    const store = new MenuStore(StartMenu)
    return (
      <Provider menu={store} > 
        <section className="App">
          <BrowserRouter>
            <div>
              <Security issuer={process.env.REACT_APP_SECURITY_ISSUER}
                      client_id={process.env.REACT_APP_CLIENT_ID}
                      redirect_uri={window.location.origin + '/implicit/callback'}
                      onAuthRequired={onAuthRequired} >
                <Route path='/' component={Navigation} />     
                <Route path='/' exact={true} component={Menu} />
                <Route path='/login' render={() => <Login baseUrl={process.env.REACT_APP_BASE_URL} />} />
                <SecureRoute path='/editmenu' component={EditMenu} />
                <Route path='/implicit/callback' component={ImplicitCallback} />
                <Route path='/menu' component={Menu} />
            </Security>
          </div>
        </BrowserRouter>
        </section>
      </Provider>
    );
  }
}

export default App;

