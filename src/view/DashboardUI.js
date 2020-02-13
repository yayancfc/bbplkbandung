import React, {Component} from 'react';
import Sidebar from './SidebarUI';
import bbplk from '../image/bbplklogo.svg';
import undraw from '../image/undraw.svg';
import image from '../image/unnamed.jpg';

class Dashboard extends Component{

    render(){
      return (
        <div className="d-flex" id="wrapper">
            
        <Sidebar/>
        
          <div id="page-content-wrapper" style={{textAlign:'center'}}>
          {/* <div className="form-row justify-content-md-center">
            <img className="logo" src={bbplk} style={{display: 'block', margin:'0 auto'}}/>
          </div>    */}
          <h2 style={{margin: 'auto', padding:'2rem'}}>Selamat Datang di Website 
          <br/> Pengelolaan Sertifikat BBPLK Bandung
          </h2>

          <img className="logo" src={image} style={{width:'900px', height:'auto'}} />
  
          
          </div>
        </div>
      );
  }
 
}

export default Dashboard