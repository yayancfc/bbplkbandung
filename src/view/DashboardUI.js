import React, {Component} from 'react';
import Sidebar from './SidebarUI';
import bbplk from '../image/bbplklogo.svg';

class Dashboard extends Component{

    render(){
      return (
        <div className="d-flex" id="wrapper">
            
        <Sidebar/>
        {/* <div className="form-row justify-content-md-center">
           <a href={"#"}> <img className="logo" src={bbplk}/></a>
        </div>    */}
        <h2 style={{margin: 'auto', height:'50vh', textAlign: 'center'}}>Selamat Datang di Website 
        <br/> Pengelolaan Sertifikat BBPLK Bandung
        </h2>
        
        </div>
      );
  }
 
}

export default Dashboard