/*import React, { Component } from 'react';
import * as OktaSignIn from '@okta/okta-signin-widget';

export default class LoginPage extends Component{
  constructor(){
    super();
    this.state = { user: null };
    this.widget = new OktaSignIn({
      baseUrl: 'https://dev-329566.oktapreview.com',
      clientId: '0oadfqpihgL4hq5qw0h7',
      redirectUri: 'http://localhost:3000',
      authParams: {
        responseType: 'id_token',
        display: 'page'
      }
    });

    this.showLogin = this.showLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    console.log('mounted')
    this.widget.session.get((response) => {
      console.log(response)
      if(response.status !== 'INACTIVE'){
        this.setState({user:response.login});
      }else{
        console.log('run login')
        this.showLogin();
      }
    });
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  showLogin(){
    // Backbone.history.stop();
    console.log('rendering')
    // this.widget.renderEl({el:"#test"},
    //   (response) => {
    //     console.log(response)
    //     this.setState({user: response.claims.email});
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
    // console.log(this.loginContainer)
  this.widget.renderEl({el: this.loginContainer},

  function success(res) {
    console.log(res)
    if (res.status === 'FORGOT_PASSWORD_EMAIL_SENT') {
      // Any followup action you want to take
      return;
    }

    if (res.status === 'UNLOCK_ACCOUNT_EMAIL_SENT') {
      // Any followup action you want to take
      return;
    }

    if (res.status === 'SUCCESS') {


      if (res.type === 'SESSION_STEP_UP') {
        // Session step up response
        // If the widget is not configured for OIDC and the authentication type is SESSION_STEP_UP,
        // the response will contain user metadata and a stepUp object with the url of the resource
        // and a 'finish' function to navigate to that url
        console.log(res.user);
        console.log('Target resource url: ' + res.stepUp.url);
        res.stepUp.finish();
        return;
      } else {
        
        console.log(res.user);
        res.session.setCookieAndRedirect('https://acme.com/app');
        return;
      }


      console.log(res.claims);
      this.widget.tokenManager.add('my_id_token', res);

      // If the widget is configured for OIDC with multiple responseTypes, the
      // response will be an array of tokens:
      // i.e. authParams.responseType = ['id_token', 'token']
      this.widget.tokenManager.add('my_id_token', res[0]);
      this.widget.tokenManager.add('my_access_token', res[1]);

      return;
    }

  },

  function error(err) {
   console.log(err)
  }
);
  }

  logout(){
    this.widget.signOut(() => {
      this.setState({user: null});
      this.showLogin();
    });
  }

  render(){
    // console.log(this.state.user)
    return(
      <div id="test">
        {this.state.user ? (
          <div className="container">
            <div>Welcome, {this.state.user}!</div>
            <button onClick={this.logout}>Logout</button>
          </div>
        ) : null}
        { this.state.user ? null : (
          <div ref={(div) => {this.loginContainer = div; }} />
        )}
      </div>
    );
  }
}*/