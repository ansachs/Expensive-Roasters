import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/App.css';

import { Provider} from 'mobx-react';
import Devtools from 'mobx-react-devtools'

import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Menu from './pages/menu';
import EditMenu from './pages/editMenu'

import Login from './components/auth/Login';

import Navigation from './components/common/Navigation';
import MenuStore from './stores/menuStore'


function onAuthRequired({history}) {
  console.log(history)
  history.push('/login');
}

class App extends Component {
  render() {
    return (
      <Provider menu={MenuStore} > 
        <section className="App">
          <BrowserRouter>
            <div>
              {/*<Navigation />*/}
              <Security issuer='https://dev-329566.oktapreview.com/oauth2/default'
                      client_id='0oadfqpihgL4hq5qw0h7'
                      redirect_uri={window.location.origin + '/implicit/callback'}
                      onAuthRequired={onAuthRequired} >
                <Route path='/' component={Navigation} />     
                <Route path='/' exact={true} component={Menu} />
                <Route path='/login' render={() => <Login baseUrl='https://dev-329566.oktapreview.com' />} />
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

