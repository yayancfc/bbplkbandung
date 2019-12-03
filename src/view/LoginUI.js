import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import bglogin from '../image/login.svg';
import controller from '../controller/LoginController';
class Admin extends Component{

    constructor(props){
      super(props)

      this.state = {
        username: '',
        password: '',
        isEmptyUsername: true,
        isEmptyPassword: true,
        message: ''
      }

      this.handleLogin = this.handleLogin.bind(this)

    }

    componentDidMount(){
      const token = controller.getCookie('bbplkbandung.token')
      if(token){
        window.location.href="/dashboard"
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
      const $this = this
      const username = this.state.username
      const password = this.state.password
      const isiUsername = controller.validateUsername(username)
      const isiPassword = controller.validatePassword(password)
      this.setState({
        isEmptyUsername: isiUsername,
        isEmptyPassword: isiPassword,
        message: ""
      })
      if(isiUsername===false || isiPassword===false){
        console.log("kosong")
      }else{      
        const data = JSON.stringify({
          'username': username,
          'password': password
        })

        controller.getLogin(data).then(function (response) {
          console.log(response)
              if(!response.data.token==""){
                document.cookie = `bbplkbandung.token=${response.data.token}`
                window.location.href='/dashboard'
              }else{
                $this.setState({
                  message: response.data.message
                })
              }

        }).then(function(error){
              console.log('error',error)
        })
      }
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
                {this.state.message? <Form.Label className="errorLogin"> * Username atau Password Tidak Ditemukan</Form.Label> : null}
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.handleUsername}/>
                  {!this.state.isEmptyUsername? <Form.Label className="isiForm">* Username Belum Diisi</Form.Label> : null}
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handlePassword}/>
                  {!this.state.isEmptyPassword? <Form.Label className="isiForm">* Password Belum Diisi</Form.Label> : null}
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