import React, {Component} from 'react';
import Sidebar from './SidebarUI';
import {Nav, Button, Form} from 'react-bootstrap';
import sha256 from 'crypto-js/sha256';
import controller from '../controller/SertifikatController';
import verify from '../controller/VerifikasiController';


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
            isFormatNomor: true,
            isValidFile: true,
            isEmptyChecksum: true,
            isLoading: false,
            isFile: false
        }

        this.handleNama = this.handleNama.bind(this)
        this.handleNomor = this.handleNomor.bind(this)
        this.handleAlamat = this.handleAlamat.bind(this)
        this.handleNomorInduk = this.handleNomorInduk.bind(this)
        this.handleTtl = this.handleTtl.bind(this)
        this.handle = this.handleAlamat.bind(this)        
        this.captureFile = this.captureFile.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.cekSertifikat = this.cekSertifikat.bind(this)


    }

    handleBack(e){
        window.location.href="/sertifikat"
    }

    
    cekSertifikat = (checksum) => {
        verify.verifyByChecksum(checksum).then((response) => {
            console.log(response[6], response[6]==0);
            
                response[6]!=0 &&
                    this.setState({
                    isFile: true
                }) 
            
        })
        
    }

    handleUpload = async (e) => {
        e.preventDefault();
        console.log(this.state.isFile);
        
        
        const nomor = this.state.nomor.toUpperCase();
        const nama = this.state.nama;
        const nomorInduk = this.state.nomorInduk;
        const alamat = this.state.alamat;
        const ttl = this.state.ttl;
        const checksum = this.state.checksum;
        const buffer = this.state.buffer
        const subStrNomor = nomor.substr(0, 3)

        const isiNomor = nomor=='' ? false : true
        const isiNama = nama=='' ? false : true
        const isiNomorInduk = nomorInduk=='' ? false : true
        const isiAlamat = alamat=='' ? false : true
        const isiTtl = ttl=='' ? false : true
        const isiChecksum = checksum=='' ? false : true
         
        this.setState({
            isEmptyNomor: isiNomor,
            isEmptyNama: isiNama,
            isEmptyAlamat: isiAlamat,
            isEmptyNomorInduk: isiNomorInduk,
            isEmptyTtl: isiTtl,
            isEmptyChecksum: isiChecksum,
            isFormatNomor: true
        })
        if(isiNomorInduk===false || isiNama===false || isiNomor===false || isiAlamat=== false || isiTtl===false || isiChecksum===false){
            // this.setState({
            //     isFormatNomor: false
            // })
            
            console.log('kosong')
        }else if(isiNomor===true && subStrNomor!='STF'){
            this.setState({
                isFormatNomor: false
            })
            
            console.log("nomor Tidak Valid", this.state.isFormatNomor)
        }else{
            
            this.setState({
                isLoading: true
            })
            this.cekSertifikat(checksum)            
            if(!this.state.isFile){
                
                        this.setState({
                    isLoading: false
                })    
            }else{
                    
                console.log("nomor Tidak Valid 2", this.state.isFormatNomor, this.state.isValidFile)
                controller.upload(nomor, nama, nomorInduk, ttl, alamat, checksum, buffer, (error, transactionHash) => {            
                    if(transactionHash){    
                    setTimeout(() => {
                            window.location.href = "/sertifikat"
                        }, 1500);
                    console.log(transactionHash)
                    }else{
                        this.setState({
                            isLoading: false
                        })
                        console.log(error)
                    }
                })

            }

        }
        
        
    }

    validate = () => {
        var _validFileExtensions = [".pdf"]; 
        var arrInputs = document.getElementsByTagName("input");
        for (var i = 0; i < arrInputs.length; i++) {
            var oInput = arrInputs[i];
            if (oInput.type == "file") {
                var sFileName = oInput.value;
                if (sFileName.length > 0) {
                    var blnValid = false;
                    for (var j = 0; j < _validFileExtensions.length; j++) {
                        var sCurExtension = _validFileExtensions[j];
                        if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                            blnValid = true;
                            break;
                        }
                    }
                    
                    if (!blnValid) {
                        return false;
                    }
                }
            }
        }
      
        return true;
    }

    captureFile = (e) => {
        e.stopPropagation();
        const file = this.validate()
        this.setState({
            isValidFile: file
        })
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
                    <div id="navbarSupportedContent" className="justify-content-end">
                        <Button onClick={this.handleBack} className="btn-back"><i className="fa fa-arrow-left fa-lg logo-back" aria-hidden="true" ></i> Kembali</Button>
                        
                    </div>
                    </Nav>

                    <div className="container-fluid form-upload">
                    <Form onSubmit={this.handleUpload}>
                        <Form.Group>
                            <Form.Label>Nomor Sertifikat</Form.Label>
                            <Form.Control type="text" placeholder="Nomor Sertifikat" name="nomor" onChange={this.handleNomor} value={this.state.nomor}/>
                            {!this.state.isEmptyNomor&& <Form.Label className="isiForm">* Nomor Sertifikat Harus Diisi</Form.Label> }
                            {!this.state.isFormatNomor&& <Form.Label className="isiForm">* Format Nomor Sertifikat Tidak Sesuai</Form.Label> 
                            }
                            
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Nama Peserta</Form.Label>
                            <Form.Control type="text" placeholder="Nama Peserta" name="nama" onChange={this.handleNama} value={this.state.nama}/>
                            {!this.state.isEmptyNama && <Form.Label className="isiForm">* Nama Peserta Harus Diisi</Form.Label>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Nomor Induk Peserta</Form.Label>
                            <Form.Control type="text" placeholder="Nomor Induk Peserta" name="nomorInduk" onChange={this.handleNomorInduk} value={this.state.nomorInduk}/>
                            {!this.state.isEmptyNomorInduk && <Form.Label className="isiForm">* Nomor Induk Peserta Harus Diisi</Form.Label> }
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Tempat/Tanggal Lahir</Form.Label>
                            <Form.Control type="text" placeholder="Tempat, Tanggal Lahir" onChange={this.handleTtl} value={this.state.ttl}/>
                            {!this.state.isEmptyTtl && <Form.Label className="isiForm">* Tempat,Tanggal Lahir Harus Diisi</Form.Label>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control type="text" name="bbplk" onChange={this.handleAlamat} value={this.state.alamat} style={{height: '12vh'}}/>
                            {!this.state.isEmptyAlamat && <Form.Label className="isiForm">* Alamat Harus Diisi</Form.Label>}
                        </Form.Group>

                        <Form.Group>
                            <input type="file" accept=".pdf" onChange={this.captureFile}/>
                            {!this.state.isEmptyChecksum&& <Form.Label className="isiForm">* File PDF Harus Diisi</Form.Label>}
                            {!this.state.isValidFile && <Form.Label className="isiForm">* Format File Harus Pdf</Form.Label>}
                            {this.state.isFile && <Form.Label className="isiForm">* Sertifikat Sudah Pernah Di Upload</Form.Label>}
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" style={{marginRight:'1rem'}} className="btn btn-primary" >Upload</Button>   
                            <Button className="btn btn-primary" id="btnReset" onClick={this.handleReset}>Reset</Button>    
                        </Form.Group>
                        
                    </Form>
                    </div>
                </div>
            </div>
            </>
        );
    };
}

export default Upload;