import React, {Component} from 'react';
import bbplk from '../image/bbplklogo.svg';
import {Link} from 'react-router-dom'
import '../sidebar.css';

class Sidebar extends Component{

    constructor(props){
      super(props)  
      this.state = {
        isSidebarOpen : false
      }

      this.logout = this.logout.bind(this)
    }

    logout() {   
      document.cookie = 'bbplkbandung.token' + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=['/'];"        
      setTimeout(()=>{
        window.location.href="/admin"
      }, 100)
  }

    render(){
      return (      
        
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">
            <a href={"/home"}> <img src={bbplk} className="logo"/></a>
          </div>
          <div className="list-group list-group-flush">
            <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
            <Link to="/sertifikat" className="list-group-item list-group-item-action bg-light">Sertifikat</Link>
            <a href="#" onClick={this.logout} className="list-group-item list-group-item-action bg-light">Logout</a>
            <hr/>            
          </div>
        </div>

      
      
        );
    }

  
}

export default Sidebar;
