import React, { Component } from 'react';

import {Button, Nav, Card, Table, Modal} from 'react-bootstrap';
import bbplk from '../image/bbplklogo.svg';
import sha256 from 'crypto-js/sha256';
import Loading from 'react-loading';
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

        
    web3.eth.getBlock(this.state.blockNumber).then((response) => {
            console.log('block', response)
            this.setState({
                blockHash: response.hash,
                nonce: response.nonce,
                timestamp: response.timestamp,
                miner: response.miner,
                gasLimit: response.gasLimit
            })
        })
      })
  }

  render(){ 
    return (
    
      <div className=" border-right ver" id="sidebar-wrapper">
            <Nav className="navbar navbar-expand-lg">                                              
          {/* <div className="sidebar-heading float-right">
            <a href={"/"}> <img src={bbplk} className="logo"/></a>
          </div>             */}
            </Nav>



            <div style={{backgroundColor:'#e6ecff'}} className="bg-ver">
            
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
                            <td>{this.state.blockNumber}</td>
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
                            <td>Timestamp</td>
                            <td>:</td>
                            <td>{this.state.timestamp}</td>
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
