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
            bbplk: '',
            buffer: '',
            checksum: ''
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
        const bbplk = this.state.bbplk;
        const checksum = this.state.checksum;
        const buffer = this.state.buffer

        controller.upload(nomor, nama, bbplk, checksum, buffer).then((respone) => {
            console.log(respone)
        })

    }

    componentDidMount(){
        this.setState({
            bbplk: 'BBPLK Bandung'
        })

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

    handleReset(e){
        e.preventDefault()
        console.log('reset')
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
                            <Form.Control type="text" placeholder="Nomor Sertifikat" name="nomor" ref ="this.nomor" onChange={this.handleNomor}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Nama Peserta</Form.Label>
                            <Form.Control type="text" placeholder="Nama Peserta" name="nama" ref ="this.nama" onChange={this.handleNama}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>BBPLK</Form.Label>
                            <Form.Control type="text" disabled value={this.state.bbplk} name="bbplk" ref ="this.bbplk"/>
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