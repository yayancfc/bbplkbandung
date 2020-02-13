import React, {Component} from 'react';
import Sidebar from './SidebarUI';
import {Link} from 'react-router-dom';
import {Nav, Button} from 'react-bootstrap';
import controller from '../controller/SertifikatController';
class Sertifikat extends Component{

    constructor(props){
      super(props)
      this.state = {
        logEvents: [],
        currentSlice: 0,
        totalPage: 0,
        itemPerPage: 10,
        isLoading: false
      }

      this.detail = this.detail.bind(this)
    }

    linkToUpload(e){
      window.location.href="/upload"
    }

     componentDidMount(){     

      this.setState({
        isLoading : true
      })
      if(localStorage.getItem('data')) localStorage.removeItem('data')
      controller.getPastEvents().then((events)=> {
        console.log(events)
        console.log(events.length, events.length/this.state.itemPerPage, 'asasas')
          this.setState({
            totalPage: Math.ceil(events.length/this.state.itemPerPage),
            // totalPage: events.length < this.state.itemPerPage? 1 : Math.ceil(events.length/this.state.itemPerPage),
            logEvents: events.reverse(),
            isLoading: false
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
          <>
            {this.state.isLoading &&
                <>
            <div className="backdrop"></div> 
            <aside className="loading">  <div className="loader"></div></aside>
            </>}
        
        <div className="d-flex" id="wrapper" style={{ filter: `blur(${this.state.isLoading ? '2px' : '0px'}`}}>
            
        <Sidebar/>
        
        <div id="page-content-wrapper">
            <Nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              {/* <Button className="btn btn-primary" id="menu-toggle">Menu</Button>
              <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </Button> */}
                <Button onClick={this.linkToUpload} className="btn-label-upload"><i className="fa fa-plus-circle fa-lg" aria-hidden="true"></i> Upload Sertifikat</Button>                
            </Nav>

            <div className="row table-wrapper" style={{margin:'1rem'}}>
            <div style={{textAlign:'right', width:'100%', marginBottom:'1rem'}}>
            {!this.state.isLoading && <span><strong>Jumlah Sertifikat yang sudah di upload : {this.state.logEvents.length}</strong></span>}
            </div>
            <div className="table-title">
                    <div className="row">
                      <div className="col-sm-6">
                        <h2><b>DATA SERTIFIKAT</b></h2>
                      </div>
                      <div className="col-sm-6">
                        {/* <a href="#tambahModal" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Tambah Unit Kerja</span></a> */}
                                    
                      </div>
                    </div>
                </div>
    
                <table className="table table-striped table-hover">
                    <thead>
                   
                        <tr>                          
                            <th>Nomor</th>
                            <th>Nomor Sertifikat</th>
                            <th>Nama</th>
                            <th>Nomor Peserta</th>
                            <th>Tempat, Tanggal Lahir</th>
                        </tr>
                    </thead>
                    <tbody>
                      
              {this.state.logEvents.length<1 &&
                 (
                <tr>
                  {!this.state.isLoading &&<td colSpan="5" align="center"><h1 className="kosong">Data Sertifikat Kosong</h1></td>}
                </tr>
                )
              }
            
              {this.state.logEvents.slice(this.state.currentSlice, this.state.currentSlice+this.state.itemPerPage).map((data, index) => {
                
              return (
                        <tr key={index}>
                          
                          <td>{index+1}</td>
                            <td>{data.returnValues.nomorSertifikat}</td>
                            <td>{data.returnValues.nama}</td>
                            <td>{data.returnValues.nomorInduk}</td>
                            <td>{data.returnValues.ttl}</td>
                            <td>
                            <Link to={{
                                 pathname: '/detail'
                               }} onClick={() => this.detail(data)}>
                             <i className="fa fa-external-link fa-lg" aria-hidden="true"></i>
                            </Link>
                            </td>
                        </tr>
                    
          
                  );  
                      
              })}
                     
                  </tbody>
                </table>
            </div>

            <div className="float-left toEnd">
            {Array(this.state.totalPage).fill().map((_, i) =>  {              
                return (
                <Button onClick={() => {
                  this.setState({
                    currentSlice: i * this.state.itemPerPage
                  })
                }} key={i}>{i === 0 ? 1 : i+1}</Button>
                
              )}
            )}
            </div>

            <div className="keterangan">
              <div style={{fontWeight:'bold', fontSize:'18px'}}>
              Keterangan Tombol : 
              </div>
              <div>
                <i className="fa fa-external-link fa-lg" aria-hidden="true" style={{marginTop:'1rem'}}> Lihat Detail</i>
              </div>
            </div>
            
          </div>
        </div>
        </>
      );
  }
 
}

export default Sertifikat