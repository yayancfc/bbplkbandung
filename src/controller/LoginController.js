import { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../Utils';

class LoginController extends Component{
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    getLogin = (data) => {
        return axios.post(
            API_URL + '/bbplkbandung/backend/api/LoginController.php',
            data,
            {
              withCredentials: true,
              crossdomain: true
            }
            
          );
    }

    validateUsername = (username) => {
      if(username===""){
        return false
      }else{
        return true
      }
    }

    validatePassword = (password) => {
      if(password===""){
        return false
      }else{
        return true
      }
    }

    login = () => {
      window.location.href = "/admin"
    }
}

export default new LoginController()