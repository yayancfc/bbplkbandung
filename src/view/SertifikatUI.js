import React, {Component} from 'react';
import Sidebar from './SidebarUI';
import {Link} from 'react-router-dom';
import {Nav, Button, Card, Table} from 'react-bootstrap';
import controller from '../controller/SertifikatController';

class Sertifikat extends Component{

    constructor(props){
      super(props)
      this.state = {
        logEvents: [],
        currentSlice: 0,
        totalPage: 0,
        itemPerPage: 9
      }

      this.detail = this.detail.bind(this)
    }

    linkToUpload(e){
      window.location.href="/upload"
    }

     componentDidMount(){
      if(localStorage.getItem('data')) localStorage.removeItem('data')
      controller.getPastEvents().then((events)=> {
        console.log(events)
        console.log(events.length, events.length/this.state.itemPerPage, 'asasas')
          this.setState({
            totalPage: Math.ceil(events.length/this.state.itemPerPage),
            // totalPage: events.length < this.state.itemPerPage? 1 : Math.ceil(events.length/this.state.itemPerPage),
            logEvents: events.reverse()
          })             
        })
     }

     detail = (data) => {
      //  window.location.href="/detail",
      //e.preventDefault()
      localStorage.setItem('data', JSON.stringify(data))
     }

    render(){
      return (
        <div className="d-flex" id="wrapper">
            
        <Sidebar/>
        
        <div id="page-content-wrapper">
            <Nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              {/* <Button className="btn btn-primary" id="menu-toggle">Menu</Button>
              <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </Button> */}
                <Button onClick={this.linkToUpload} className="btn-label-upload"><i className="fa fa-plus-circle fa-lg" aria-hidden="true"></i> Upload Sertifikat</Button>                
            </Nav>

            <div className="row" style={{margin:'1rem'}}>
              
              {this.state.logEvents.slice(this.state.currentSlice, this.state.currentSlice+this.state.itemPerPage).map((data, index) => {
              return (
                  <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4" key={index}>
                  <div className="thumbnail">
                      <div className="caption">
                        <div className='col-lg-12'>
                        </div>
                        <div className='col-lg-12 well well-add-card'>
                            <b>{data.returnValues.nomorSertifikat}</b>
                        </div>
                        <div className='col-lg-12' style={{height: '60px', position:'relative'}}>
                            <table>
                              <tbody>

                              
                            <tr>
                           <td className="labelIsi">Nama </td>
                             <td className="labelSep">:</td>
                             <td className="labelIsi">{data.returnValues.nama}</td>
                           </tr>

                           <tr>
                             <td className="labelIsi">Nomor Induk </td>
                             <td className="labelSep">:</td>
                             <td className="labelIsi">{data.returnValues.nomorInduk}</td>
                           </tr>
                           </tbody>
                            </table>
                        </div>
                        <Link to={{
                                 pathname: '/detail'
                               }} onClick={() => this.detail(data)}>
                        <button type="button"  className="btn btn-primary btn-xs" style={{position: 'absolute', bottom:40, right:30}}>Lihat Detail</button>
                        </Link>
                    </div>
                  </div>
                </div>
                  );  
              })}       

            </div>

            {Array(this.state.totalPage).fill().map((_, i) =>  {              
                return (
                <Button onClick={() => {
                  this.setState({
                    currentSlice: i * this.state.itemPerPage
                  })
                }} className="float-right toEnd" key={i}>{i === 0 ? 1 : i+1}</Button>
                
              )}
            )}
            
          </div>
        </div>
      );
  }
 
}

export default Sertifikat