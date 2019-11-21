import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';
import bglogin from '../image/login.svg';

class Admin extends Component{

    constructor(props){
      super(props)

      this.state = {
        username: '',
        password: ''
      }

      this.login = this.login.bind(this)

    }

    componentDidMount(){
      const token = this.getCookie('bbplkbandung.token')
      if(token){
        window.location.href="/sertifikat"
      }
    }

    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    handleUsername = (e) => {
      e.preventDefault()
      this.setState({
        username: e.target.value
      })
    }

    handlePassword = (e) => {
      e.preventDefault()
      this.setState({
        password: e.target.value
      })
    }

    login(e){
      e.preventDefault();
      
      const username = this.state.username
      const password = this.state.password
      const data = JSON.stringify({
        'username': username,
        'password': password
      })

      axios.post(
        'http://localhost/bbplkbandung/backend/api/LoginController.php',
        data,
        {
          withCredentials: true,
          crossdomain: true
        }
        
      ).then(function (response) {
            if(response){
              document.cookie = `bbplkbandung.token=${response.data.token}`
              window.location.href='/sertifikat'
            }
            console.log('data', response)
      }).then(function(error){
            console.log('error',error)
      })

    }

    render(){
      return (
        <div className="container-fluid bg">
          <div className="row">
          <div className="col-md-4 col-sm-3 col-xs-1"></div>
          <div className="col-md-4 col-sm-6 col-xs-10">
          <div className="image">
              <img src={bglogin} alt="" className="bgLogin"/>
          </div>
              <Form onSubmit={this.login} method="post" className="form-container">
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleUsername}/>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handlePassword}/>
                </Form.Group>

                <Form.Group>
                  <Button className="btn btn-primary" type="submit" id="btnLogin">Login</Button>    
                </Form.Group>
                
              </Form>
            </div>
            <div className="col-md-4 col-sm-3 col-xs-1"></div>
            </div>
        </div>
      );
  }

  
}

export default Admin;