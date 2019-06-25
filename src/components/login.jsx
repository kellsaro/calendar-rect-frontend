import React from 'react';
import $ from 'jquery';
import {Button} from 'primereact/button';

import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import './login.css';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3001/auth/sign_in',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .done((response, status, jqXHR) => {
    
      let obj = {};
      obj['access-token'] = jqXHR.getResponseHeader('access-token');
      obj['client'] = jqXHR.getResponseHeader('client');
      obj['uid'] = response.data.uid
      obj['Access-Control-Allow-Origin'] = jqXHR.getResponseHeader('Access-Control-Allow-Origin');

      sessionStorage.setItem('user', JSON.stringify(obj));

      this.props.history.push('/');
    });
  }

  render = () => {
    return (
      <div>
        <h1>Sign in</h1>
        <form>
          <div className="p-float-label">
            <InputText id="float-input" 
                       type="text" 
                       value={this.state.email} 
                       onChange={(e) => this.setState({email: e.target.value})} />
            <label htmlFor="float-input">Email</label>       
          </div>
          <div className="p-float-label">
            <Password id="float-password"
                      value={this.state.password} 
                      onChange={(e) => this.setState({password: e.target.value})}
                      feedback={false} />
            <label htmlFor="float-password">Password</label> 
          </div>
          <div>
            <Button label='Log In!' onClick={this.handleSubmit}/>          
          </div>
        </form>
      </div>
    );
  }
}