import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Navigation extends Component{
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    // this.checkAuthentication = this.checkAuthentication.bind(this);
    // this.checkAuthentication();
  }
  // static contextTypes = {
  //   user: React.PropTypes.object
  // };
  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render(){

    const logged = this.state.authenticated ?
      <li><Link onClick={this.props.auth.logout} to="">Logout</Link></li>  :
      <li><Link to="login">Login</Link></li>;


    return (
      <div className="navbar navbar-inverse navbar-sticky navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">Alex's Restaurant</Link>
          </div>
          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right smooth-scroll">
              <li><Link to="/">Menu</Link></li>
              <li><Link to="editmenu">Edit</Link></li>
              <li><Link to="contact">Contact</Link></li>
              {logged}
              {/*<li><Link to="login">Login</Link></li>*/}
            </ul>
          </div>
        </div>
      </div>
    );
  }
})
