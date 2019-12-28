import React, {Component} from 'react';
import Sidebar from './SidebarUI';
import {Link} from 'react-router-dom';
import {Nav, Button} from 'react-bootstrap';
import controller from '../controller/SertifikatController';

class PendingUI extends Component{

    componentDidMount(){        
      controller.subscribeToTxs("0xe0d3502baB53337735864D512392bB78444dd4F7");
    }

    render(){
      return (
        <div className="d-flex" id="wrapper">
            
        </div>
      );
  }
 
}

export default PendingUI