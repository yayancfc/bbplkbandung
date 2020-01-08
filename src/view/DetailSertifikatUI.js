import React, {Component} from 'react';
import Sidebar from './SidebarUI';
import {Nav, Button, Card, Table} from 'react-bootstrap';
import web3 from '../service/web3';

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
        ipfs: '',
        miner: '',
        nonce: '',
        timestamp: '',
        gasLimit: '',
        gasUsed: '',
        blockHash: ''

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
        
        this.getBlock(data.blockNumber)
       
     }

    }

     getBlock = (block) => {
      web3.eth.getBlock(block).then((response) => {
        console.log(response)
        this.setState({
          blockHash: response.hash,
          nonce: response.nonce,
          timestamp: response.timestamp,
          miner: response.miner,
          gasLimit: response.gasLimit,
          gasUsed: response.gasUsed
        })
      })
     }
    
     handleBack = () =>{
      this.props.history.push("/sertifikat");
     }

     timeConverter = (UNIX_timestamp) => {
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    }

    render(){
      return (
        <div className="d-flex" id="wrapper" >
            
        <Sidebar/>
        <div id="page-content-wrapper" >
                    <Nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div id="navbarSupportedContent" className="justify-content-end">
                        <Button onClick={this.handleBack} className="btn-back"><i className="fa fa-arrow-left fa-lg logo-back" aria-hidden="true" ></i> Kembali</Button>
                        
                    </div>
                    </Nav>
                    <div className="form-row justify-content-md-center bg-ver-detail" style={{backgroundColor:'#e6ecff'}}>
                      
                      <div className="form-row justify-content-md-center">
                      {/* <a href={"#"}> <img className="logo" src={bbplk}/></a> */}
                      </div>   
                      <div className="form-row justify-content-md-center">
                        <div className="my-3"><h1 id="bbplk">{this.state.nomorSertifikat}</h1></div>
                      </div>         
                    {/* <Card border="primary">
                    <Card.Header>{this.state.nomorSertifikat}</Card.Header> */}
                       <Table className="table-detail">
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
                            <td ><a href={'http://ropsten.etherscan.io/tx/'+this.state.tx}>{this.state.tx}</a></td>
                          </tr>

                          <tr>
                            <td >Block Number</td>
                            <td >:</td>
                            <td ><a href={'https://ropsten.etherscan.io/block/'+this.state.block}>{this.state.block}</a></td>
                          </tr>

                          <tr>
                            <td>Block Hash</td>
                            <td>:</td>
                            <td>{this.state.blockHash}</td>
                        </tr>

                        <tr>
                            <td>Miner</td>
                            <td>:</td>
                            <td>{this.state.miner}</td>
                        </tr>
                        
                        <tr>
                            <td>Nonce</td>
                            <td>:</td>
                            <td>{this.state.nonce}</td>
                        </tr>

                        <tr>
                            <td>Gas Limit</td>
                            <td>:</td>
                            <td>{this.state.gasLimit}</td>
                        </tr>

                        <tr>
                            <td>Gas Used</td>
                            <td>:</td>
                            <td>{this.state.gasUsed}</td>
                        </tr>

                        <tr>
                            <td>Timestamp</td>
                            <td>:</td>
                            <td>{this.timeConverter(this.state.timestamp)}</td>
                        </tr>

                          <tr>
                            <td colSpan="3"><a href={'https://gateway.ipfs.io/ipfs/'+this.state.ipfs}><Button className="btn-lihat-admin">Lihat Sertifikat</Button></a></td>
                          </tr>


                        </tbody>
                        
                      </Table>
                    {/* </Card> */}
                    </div>

        </div>
        
        </div>
      );
  }
 
}

export default DetailSertifikat