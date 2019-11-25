import { Component } from 'react';
import axios from 'axios';
import { isNull } from 'util';

class LoginController extends Component{
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

    getLogin = (data) => {
        return axios.post(
            'http://localhost/bbplkbandung/backend/api/LoginController.php',
            data,
            {
              withCredentials: true,
              crossdomain: true
            }
            
          );
    }

    validateUsername = (username) => {
      if(username==""){
        return false
      }else{
        return true
      }
    }

    validatePassword = (password) => {
      if(password==""){
        return false
      }else{
        return true
      }
    }
}

export default new LoginController()