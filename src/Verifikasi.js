import React, { Component } from 'react';
import './App.css';
import {Button} from 'react-bootstrap';
import bbplk from './image/bbplklogo.svg';
import sha256 from 'crypto-js/sha256';
import Loading from 'react-loading';
import controller from './controller/Controller'

class Verifikasi extends Component {

  constructor(props){
    super(props)
    this.state = {
      nomor: '',
      checksum: '',
      ipfsHash: '',
      validSertifikat: false,
      isLoading: false,
      isValid: false,
    }

  }

  openUpload = (e) => {
    controller.openUpload()
  }

  handleNomor = (e) => {
    this.setState({
      nomor: e.target.value
    })
  }

  verifyByNoSertifikat = () => {
    const nomor = this.state.nomor.toUpperCase()
    
    this.setState({
      isLoading: true
    })
    
    controller.verifyByNoSertifikat(nomor).then((response) => {
        console.log(response)
        this.setState({
          isLoading: false,
          isValid: true,
          validSertifikat: response[4],
          ipfsHash: response[1]
        })
        
    })
  }

  verifyBYChecksum = (e) => {
    e.stopPropagation();

    this.setState({
      isLoading: true
    })

    controller.getnerateChecksum(e, file => {
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
          validSertifikat: response[4]
        })
    })
  }
}

  lihatSertifikat = (e) => {
    e.preventDefault()
    const hash = this.state.ipfsHash
    window.location.href = 'https://gateway.ipfs.io/ipfs/'+hash
  }

  render(){
    return (
    
      <div className=" border-right ver" id="sidebar-wrapper">
      
        <div className="sidebar-heading">
          <a href={"/"}> <img src={bbplk} className="logo"/></a>
        </div>

      <div style={{backgroundColor:'#e6ecff'}} className="bg-ver">
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
                <button type="button" className="btn btn-primary btn-ver" onClick={this.verifyByNoSertifikat}>Verifikasi</button>
              </div>
            </div>
          </form>
          </div>

          <div className="container">
            <form>    
                  <input id="upload" type="file" onChange={this.verifyBYChecksum}/>
                  <a href="#" id="upload_link" onClick={this.openUpload} style={{marginLeft:'2.5rem'}}>
                    Upload Sertifikat</a>​ ( Alternatif Verifikasi Menggunakan File Sertifikat )
            </form>
          </div>
          {this.state.isLoading? 
          <div className="form-row justify-content-md-center valid-form">
            <Loading/>
          </div>
          : null}

          {this.state.isValid? 
            <div className="container">
            <div className="form-row justify-content-md-center valid-form">
            <label className="valid">{this.state.validSertifikat? 'Sertifikat Valid' : 'Sertifikat Tidak Valid'}</label>
            <i className={this.state.validSertifikat? 'fa fa-check-circle fa-2x logo-ver' : 'fa fa-times-circle fa-2x logo-ver'} aria-hidden="true"></i>
            {this.state.validSertifikat? <Button className="btn-lihat" style={{marginLeft:'1rem'}} onClick={this.lihatSertifikat}>Lihat Sertifikat</Button> : null }
              </div>
            </div>
          :null}
          
        </div>
      </div>
    );
  }
}
export default Verifikasi;
