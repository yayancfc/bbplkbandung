import React, { Component } from 'react';

import {Button, Nav, Card, Table, Modal} from 'react-bootstrap';
import bbplk from '../image/bbplklogo.svg';
import sha256 from 'crypto-js/sha256';
import Loading from 'react-loading';
import controller from '../controller/VerifikasiController';
import web3 from '../service/web3';
import {Link} from 'react-router-dom';

class Verifikasi extends Component {

  constructor(props){
    super(props)
    this.state = {
      nomor: '',
      nomorValid: '',
      nama: '',
      bbplk: '',
      checksum: '',
      ipfsHash: '',
      nomorPeserta: '',
      ttl: '',
      alamat: '',
      validSertifikat: false,
      isLoading: false,
      isValid: false,
      isEmpty: true,
      blockNumber: ''
    }
  }

  handleOpenUpload = (e) => {
    controller.openUpload()
  }

  handleNomor = (e) => {
    this.setState({
      nomor: e.target.value
    })
  }

  handleVerifyByNoSertifikat = () => {
    const nomor = this.state.nomor.toUpperCase()
    const isi = controller.validate(nomor) 
    this.setState({
      isEmpty: isi,
      isValid: false
    })
    if(isi===false){
      console.log("kosong")
    }else{
      this.setState({
        isLoading: true
      })
      
      controller.verifyByNoSertifikat(nomor).then((response) => {
          console.log(response)
          this.setState({
            isLoading: false,
            isValid: true,
            blockNumber: response[6],
            ipfsHash: response[1],
            nomorValid: response[0],
            nama: response[2],
            nomorPeserta: response[3],
            ttl: response[4],
            alamat: response[5]
          })
          
      })
  
    }
    
  }

  handleVerifyBYChecksum = (e) => {
    e.stopPropagation();

    this.setState({
      isLoading: true,
      isValid: false
    })

    controller.generateChecksum(e, file => {
      this.convertToBuffer(file);
    })
  }

  convertToBuffer = async(reader) => {
    if (reader.result) {
      const bufferArray = await Buffer.from(reader.result);

      console.log(bufferArray,'zzz')

      this.setState({
          checksum: sha256(controller.arrayBufferToWordArray(bufferArray)).toString()
      })      
      
      const checksum = this.state.checksum
      controller.verifyByChecksum(checksum).then((response) =>{
        console.log(response)  
        this.setState({
          isLoading: false,
          isValid: true,
          nomorValid: response[0],
          nama: response[2],
          blockNumber: response[6],  
          ipfsHash: response[1],
          nomorPeserta: response[3],
          ttl: response[4],
          alamat: response[5]
          })
      })
    }
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



      <div style={{backgroundColor:'#e6ecff'}} className="bg-ver">
      
      <div className="form-row justify-content-md-center">
            <a href={"/"}> <img src={bbplk} className="logo"/></a>
          </div>            

        <div className="form-row justify-content-md-center">
            <div className="my-3"><h1 id="bbplk">Verifikasi Sertfikat BBPLK Bandung</h1></div>
        </div>
        <div className="container" style={{paddingLeft:'2rem',paddingRight:'2rem',paddingBottom:'0.7rem'}}>
          <form>    
            <div className="form-row justify-content-md-center">
              <div className="col-md-8">
                <input type="text" className="form-control form-no" placeholder="Masukan Nomor Sertifikat" onChange={this.handleNomor} value={this.state.nomor}/>
              </div>
              <div className="col-md-auto">
                <button type="button" className="btn btn-primary btn-ver" onClick={this.handleVerifyByNoSertifikat}>Verifikasi</button>
              </div>

            </div>
          </form>
          </div>
          {
            !this.state.isEmpty? <span className="isi">* Nomor Sertifikat Belum Diisi, Silahkan isi Terlebih dahulu</span> : null
          }


          <div className="container">
            <form>    
                  <input id="upload" type="file" onChange={this.handleVerifyBYChecksum}/>
                  <a href="#" id="upload_link" onClick={this.handleOpenUpload} style={{marginLeft:'2.5rem'}}>
                    <u>Upload File Sertifikat</u></a>​ ( Verifikasi Menggunakan File Sertifikat )
            </form>
          </div>
  
  
          {this.state.isLoading? 
          <div className="form-row justify-content-md-center valid-form-loading">
            <Loading className="asd"/>
          </div>
           : null} 

            <Modal 
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            show={this.state.isValid} onHide={() => this.setState({isValid: false})}>
              <Modal.Header closeButton style={{backgroundColor: 'rgb(40, 51, 84)', color: 'white'}}>
            <Modal.Title style={{textAlign: 'center'}}>Verifikasi Sertifikat Pelatihan Kerja</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{backgroundColor: 'rgb(179, 190, 202)'}}>
              <form>
            
            {!this.state.nama==""?
            <div className="valid-form ">
              <label className="valid ">Sertifikat Valid</label><i className="fa fa-check-circle fa-2x logo-ver"></i>
            <div className="form-group has-feedback row">
            <div className="input-group col-md-6">
              
              <i className="fa fa-id-card-o" style={{backgroundColor: 'grey', paddingTop:'0.6rem'}}></i>
              <input type="text" className="form-control" value={this.state.nomorValid} disabled></input>
            </div>

            <div className="input-group col-md-6">
              <i className="fa fa-user-circle-o" style={{backgroundColor: 'grey', paddingTop:'0.6rem'}}></i>
              <input type="text" className="form-control" value={this.state.nama} disabled></input>
            </div>
            </div>
            
            <div className="form-group has-feedback row">
            <div className="input-group col-md-6">
              <i className="fa fa-list-alt" style={{backgroundColor: 'grey', paddingTop:'0.6rem'}}></i>
              <input type="text" className="form-control" value={this.state.nomorPeserta} disabled></input>
            </div>

            <div className="input-group col-md-6">
              <i className="fa fa-calendar-o" style={{backgroundColor: 'grey', paddingTop:'0.6rem'}}></i>
              <input type="text" className="form-control" value={this.state.ttl} disabled></input>
            </div>

            </div>
            </div>
              : 
              <div className="form-row justify-content-md-center valid-form">
                <label className="valid">Sertifikat Tidak Valid</label><i className="fa fa-times-circle fa-2x logo-ver"></i>
              </div> }
              
          </form> 
              </Modal.Body>
              <Modal.Footer>
              {!this.state.nama==""? 
              <div>
                <Button variant="primary" onClick={this.handleLihatSertifikat} style={{marginRight:'0.5rem'}} className="btn-valid"> 
                  Lihat Sertifikat
                </Button>

                <Link 
                  to={`/verifikasi/${encodeURIComponent(this.state.nomorValid)}`}
                >
                <Button variant="primary" onClick={this.handleLihatDetail} className="btn-valid"> 
                  Lihat Detail
                </Button>
                </Link>

                </div>
                
                : null }
                <Button variant="secondary" onClick={() => this.setState({isValid: false})}>
                  Tutup
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
      </div>
    );
  }
}
export default Verifikasi;
