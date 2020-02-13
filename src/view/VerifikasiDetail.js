import React, { Component } from 'react';

import {Button, Nav, Table} from 'react-bootstrap';
import bbplk from '../image/bbplklogo.svg';
import controller from '../controller/VerifikasiController';
import web3 from '../service/web3';

class VerifikasiDetail extends Component {

  constructor(props){
    super(props)
    this.state = {
        nomorValid: '',
        nama: '',
        ipfsHash: '',
        nomorPeserta: '',
        ttl: '',
        alamat: '',
        blockNumber: '',
        miner: '',
        nonce: '',
        timestamp: '',
        gasLimit: '',
        gasUsed: '',
        blockHash: ''
    }
    
  }

  componentDidMount(){
      const nomor = decodeURIComponent(this.props.match.params.nomor)
      controller.verifyByNoSertifikat(nomor).then((response) => {
        console.log(response)
        this.setState({
            blockNumber: response[6],
            ipfsHash: response[1],
            nomorValid: response[0],
            nama: response[2],
            nomorPeserta: response[3],
            ttl: response[4],
            alamat: response[5]
        })
        
    web3.eth.getBlock(parseInt(this.state.blockNumber)).then((response) => {
            console.log('block', response)
            this.setState({
                blockHash: response.hash,
                nonce: response.nonce,
                timestamp: response.timestamp,
                miner: response.miner,
                gasLimit: response.gasLimit,
                gasUsed: response.gasUsed
            })
        })
      })
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

  handleLihatSertifikat = (e) => {
    e.preventDefault()
    const hash = this.state.ipfsHash
    console.log(hash)
    controller.lihatSertifikat(hash)
  }

  render(){ 
    return (
    
      <div className=" border-right ver" id="sidebar-wrapper">
            <Nav className="navbar navbar-expand-lg">                                              
          {/* <div className="sidebar-heading float-right">
            <a href={"/"}> <img src={bbplk} className="logo"/></a>
          </div>             */}
            </Nav>



            <div style={{backgroundColor:'#e6ecff'}} className="bg-ver-detail">
            
            <div className="form-row justify-content-md-center">
                    <a href={"/"}> <img src={bbplk} className="logo"/></a>
                </div>   
            <div className="form-row justify-content-md-center">
                <div className="my-3"><h1 id="bbplk">Verifikasi Sertfikat BBPLK Bandung</h1></div>
            </div>         

            <div className="form-row justify-content-md-center">
                <Table className="table-detail">
                    <tbody>
                        <tr>
                            <td>Nomor Sertifikat</td>
                            <td>:</td>
                            <td>{this.state.nomorValid}</td>
                        </tr>
                        
                        <tr>
                            <td>Nama</td>
                            <td>:</td>
                            <td>{this.state.nama}</td>
                        </tr>
                        
                        <tr>
                            <td>Nomor Induk Peserta</td>
                            <td>:</td>
                            <td>{this.state.nomorPeserta}</td>
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
                            <td>Block Number</td>
                            <td>:</td>
                            <td><a href={"https://ropsten.etherscan.io/block/"+ this.state.blockNumber}>{this.state.blockNumber}</a></td>
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
                            <td colSpan="3">
                            <Button variant="primary" onClick={this.handleLihatSertifikat} > 
                            Lihat Sertifikat
                            </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>

            </div>

        </div>
      </div>
    );
  }
}
export default VerifikasiDetail;
