import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import bglogin from '../image/login.svg';
import controller from '../controller/LoginController';
class Admin extends Component{

    constructor(props){
      super(props)

      this.state = {
        username: '',
        password: ''
      }

      this.handleLogin = this.handleLogin.bind(this)

    }

    componentDidMount(){
      const token = controller.getCookie('bbplkbandung.token')
      if(token){
        window.location.href="/sertifikat"
      }
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

    handleLogin(e){
      e.preventDefault();
      
      const username = this.state.username
      const password = this.state.password
      const data = JSON.stringify({
        'use  rname': username,
        'password': password
      })

      controller.getLogin(data).then(function (response) {
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
              <Form onSubmit={this.handleLogin} method="post" className="form-container">
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