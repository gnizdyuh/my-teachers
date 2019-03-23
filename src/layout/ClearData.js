import React, { Component } from 'react';
import passwordHash from 'password-hash';
import { Redirect } from 'react-router-dom';

export class ClearData extends Component {
  constructor(props){
    super(props);
    this.state = {
      password : ""
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const enteredPassword = passwordHash.generate(this.state.password);
    if(passwordHash.verify("4321", enteredPassword)) {
      localStorage.clear();
      this.props.clearData();
      this.setState({ redirectToReferrer:true })
    } else {
      document.querySelector('#password_message').innerHTML = "Incorrect password";
    }
  }

  onChange = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer === true) {
        return <Redirect to="/" />
    }

    return (
      <div className="container">
      <p className="mt-2 mb-3">Enter password if you want to clear all data</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="clearDataPassword">
              Password:
            </label>
            <input className="form-control" 
                   type="password" name="password" id="clearDataPassword" 
                   onChange={ this.onChange }/>
            <p id="password_message" className="alert-danger"></p>
            <input className="btn btn-primary mt-1" 
                   type="submit" value="Clear Data" />
          </div>
        </form>  
      </div>
    )
  }
}

export default ClearData;