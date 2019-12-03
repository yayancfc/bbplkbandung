import React, {Component} from 'react';
import Sidebar from './SidebarUI';
import {Nav, Button, Form} from 'react-bootstrap';
import sha256 from 'crypto-js/sha256';
import controller from '../controller/SertifikatController';


class Upload extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            nomor: '',
            nama: '',
            nomorInduk: '',
            ttl: '',
            alamat: '',
            buffer: '',
            checksum: '',
            isEmptyNomor: true,
            isEmptyNama: true,
            isEmptyNomorInduk: true,
            isEmptyTtl: true,
            isEmptyAlamat: true,
        }

        this.handleNama = this.handleNama.bind(this)
        this.handleNomor = this.handleNomor.bind(this)
        this.captureFile = this.captureFile.bind(this)


    }

    handleBack(e){
        window.location.href="/sertifikat"
    }

    handleUpload = async (e) => {
        e.preventDefault();
        
        const nomor = this.state.nomor.toUpperCase();
        const nama = this.state.nama;
        const nomorInduk = this.state.nomorInduk;
        const alamat = this.state.alamat;
        const ttl = this.state.ttl;
        const checksum = this.state.checksum;
        const buffer = this.state.buffer

        const isiNomor = nomor=='' ? false : true
        const isiNama = nama=='' ? false : true
        const isiNomorInduk = nomorInduk=='' ? false : true
        const isiAlamat = alamat=='' ? false : true
        const isiTtl = ttl=='' ? false : true
        
        this.setState({
            isEmptyNomor: isiNomor,
            isEmptyNama: isiNama,
            isEmptyAlamat: isiAlamat,
            isEmptyNomorInduk: isiNomorInduk,
            isEmptyTtl: isiTtl 
        })
        if(isiNomorInduk===false || isiNama===false || isiNomor===false || isiAlamat=== false || isiTtl===false){
            console.log('kosong')
        }else{
            
        controller.upload(nomor, nama, nomorInduk, ttl, alamat, checksum, buffer).then((error, transactionHash) => {            
            if(transactionHash!=='undefined'){    
            // setTimeout(() => {
            //         window.location.href = "/sertifikat"
            //     }, 1500);
            console.log(transactionHash)
             }else{
                 console.log(error)
             }
        })

        }
        

    }


    captureFile = (e) => {
        e.stopPropagation();
        controller.generateChecksum(e, file => {
            this.convertToBuffer(file);
          })
    }

    convertToBuffer = async(reader) => {
        const bufferArray = await Buffer.from(reader.result);
        this.setState({
            buffer: bufferArray,
            checksum: sha256(controller.arrayBufferToWordArray(bufferArray)).toString()
        })        
    }

    handleReset = (e) =>{
        e.preventDefault()
        this.setState({
            nomor: '',
            nama: '',
            nomorInduk: '',
            ttl: '',
            alamat: '',
            buffer: '',
            checksum: '',
        })
    }

    handleNomor = (e) => {
        this.setState({
            nomor: e.target.value
        })
    }

    handleNama = (e) => {
        this.setState({
            nama: e.target.value
        })
    }

    handleNomorInduk = (e) => {
        this.setState({
            nomorInduk: e.target.value
        })
    }

    handleAlamat = (e) => {
        this.setState({
            alamat: e.target.value
        })
    }

    handleTtl = (e) => {
        this.setState({
            ttl: e.target.value
        })
    }   

    render(){
        return(
            <div className="d-flex" id="wrapper">        
                <Sidebar/>

                <div id="page-content-wrapper">
                    <Nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div id="navbarSupportedContent" className="justify-content-end">
                        <Button onClick={this.handleBack} className="btn-back"><i className="fa fa-arrow-left fa-lg logo-back" aria-hidden="true" ></i> Kembali</Button>
                        
                    </div>
                    </Nav>

                    <div className="container-fluid form-upload">
                    <Form onSubmit={this.handleUpload}>
                        <Form.Group>
                            <Form.Label>Nomor Sertifikat</Form.Label>
                            <Form.Control type="text" placeholder="Nomor Sertifikat" name="nomor" onChange={this.handleNomor} value={this.state.nomor}/>
                            {!this.state.isEmptyNomor? <Form.Label className="isiForm">* Nomor Sertifikat Belum Diisi</Form.Label> : null}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Nama Peserta</Form.Label>
                            <Form.Control type="text" placeholder="Nama Peserta" name="nama" onChange={this.handleNama} value={this.state.nama}/>
                            {!this.state.isEmptyNama? <Form.Label className="isiForm">* Nama Peserta Belum Diisi</Form.Label> : null}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Nomor Induk Peserta</Form.Label>
                            <Form.Control type="text" placeholder="Nomor Induk Peserta" name="nomorInduk" onChange={this.handleNomorInduk} value={this.state.nomorInduk}/>
                            {!this.state.isEmptyNomorInduk? <Form.Label className="isiForm">* Nomor Induk Peserta Belum Diisi</Form.Label> : null}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Tempat/Tanggal Lahir</Form.Label>
                            <Form.Control type="text" placeholder="Tempat/Tanggal Lahir" onChange={this.handleTtl} value={this.state.ttl}/>
                            {!this.state.isEmptyTtl? <Form.Label className="isiForm">* Tempat,Tanggal Lahir Belum Diisi</Form.Label> : null}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control type="text" name="bbplk" onChange={this.handleAlamat} value={this.state.alamat} style={{height: '12vh'}}/>
                            {!this.state.isEmptyAlamat? <Form.Label className="isiForm">* Alamat Belum Diisi</Form.Label> : null}
                        </Form.Group>

                        <Form.Group>
                            <input type="file" onChange={this.captureFile}/>
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" style={{marginRight:'1rem'}} className="btn btn-primary" >Upload</Button>   
                            <Button className="btn btn-primary" id="btnReset" onClick={this.handleReset}>Reset</Button>    
                        </Form.Group>
                        
                    </Form>
                    </div>
                </div>
            </div>
        );
    };
}

export default Upload;