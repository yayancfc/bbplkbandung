import React, {Component} from 'react';
import Sidebar from './SidebarUI';

class Dashboard extends Component{

    constructor(props){
      super(props)
            
    }

    render(){
      return (
        <div className="d-flex" id="wrapper">
            
        <Sidebar/>
        <h2 style={{margin: 'auto', height:'50vh', textAlign: 'center'}}>Selamat Datang di Website 
        <br/> Pengelolaan Sertifikat BBPLK Bandung
        </h2>
        
        </div>
      );
  }
 
}

export default Dashboard