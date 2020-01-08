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
        
        <div id="sidebar-wrapper" style={{backgroundColor: 'rgb(40, 51, 84)'}}>
          <div className="sidebar-heading" >
            <a href={"/home"}> <img src={bbplk} className="logo"/></a>
          </div>
          <div className="list-group list-group-flush">
            <Link to="/dashboard" className="list-group-item list-group-item-action" >Dashboard</Link>
            <Link to="/sertifikat" className="list-group-item list-group-item-action">Sertifikat</Link>
            <a href="#" onClick={this.logout} className="list-group-item list-group-item-action">Logout</a>
            <hr/>            
          </div>
        </div>

      
      
        );
    }

  
}

export default Sidebar;
