import React, {Component} from 'react';
import Sidebar from './SidebarUI';
import {Nav, Button, Card, Table} from 'react-bootstrap';
class DetailSertifikat extends Component{

    constructor(props){
      super(props)
      this.state = {
        nomorSertifikat: '',
        nama: '',
        alamat:'',
        nomorInduk: '',
        ttl: '',
        tx: '',
        block: '',
        ipfs: ''
      }
            
    }

     componentDidMount(){
       if(!localStorage.getItem('data')){
         this.props.history.push("/sertifikat");
         
       } else {
         const data = JSON.parse(localStorage.getItem('data'))
        this.setState({
          nomorSertifikat: data.returnValues.nomorSertifikat,
          nomorInduk: data.returnValues.nomorInduk,
          nama: data.returnValues.nama,
          ttl: data.returnValues.ttl,
          alamat: data.returnValues.alamat,
          tx: data.transactionHash,
          block: data.blockNumber,
          ipfs: data.returnValues.ipfshash
        }) 
       }
       
       
     }
    
     handleBack = () =>{
      this.props.history.push("/sertifikat");
     }

    render(){
      return (
        <div className="d-flex" id="wrapper">
            
        <Sidebar/>
        <div id="page-content-wrapper">
                    <Nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div id="navbarSupportedContent" className="justify-content-end">
                        <Button onClick={this.handleBack} className="btn-back"><i className="fa fa-arrow-left fa-lg logo-back" aria-hidden="true" ></i> Kembali</Button>
                        
                    </div>
                    </Nav>

                <div className="form-row justify-content-md-center col-md-12">
                    <Card border="primary">
                    <Card.Header>{this.state.nomorSertifikat}</Card.Header>
                       <Table className="">
                        <tbody>
                          <tr>
                            <td>Nama Peserta</td>
                            <td>:</td>
                            <td>{this.state.nama}</td>
                          </tr>

                          <tr>
                            <td>Nomor Induk</td>
                            <td>:</td>
                            <td>{this.state.nomorInduk}</td>
                          </tr>

                          <tr>
                            <td>Tempat/Tanggal Lahir</td>
                            <td>:</td>
                            <td>{this.state.ttl}</td>
                          </tr>

                          <tr>
                            <td>Alamat</td>
                            <td>:</td>
                            <td>{this.state.alamat}</td>
                          </tr>
                          
                          <tr>
                            <td >Tx.Hash</td>
                            <td >:</td>
                            <td ><a href={'http://ropsten.etherscan.io/tx/'+this.state.tx}>{this.state.tx.substr(0,18)}...</a></td>
                          </tr>

                          <tr>
                            <td >Block Number</td>
                            <td >:</td>
                            <td ><a href={'https://ropsten.etherscan.io/block/'+this.state.block}>{this.state.block}</a></td>
                          </tr>

                          <tr>
                            <td colSpan="3"><a href={'https://gateway.ipfs.io/ipfs/'+this.state.ipfs}><Button className="btn-lihat-admin">Lihat Sertifikat</Button></a></td>
                          </tr>


                        </tbody>
                        
                      </Table>
                    </Card>
                    </div>

        </div>
        
        </div>
      );
  }
 
}

export default DetailSertifikat