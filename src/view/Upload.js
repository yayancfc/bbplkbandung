import React, {Component} from 'react';
import Sidebar from './Sidebar';
import {Nav, Button, Form} from 'react-bootstrap';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
import web3 from '../service/web3';
import ipfs from '../service/ipfs';
import sertifikatContract from '../service/Sertifikat';


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

    back(e){
        console.log('asas')
        window.location.href="/sertifikat"
    }

    upload = async (e) => {
        e.preventDefault();
        const nomor = this.state.nomor.toUpperCase();
        const nama = this.state.nama;
        const bbplk = this.state.bbplk;
        const checksum = this.state.checksum;

        const accounts = await web3.eth.getAccounts();
        await ipfs.add(this.state.buffer, (err, ipfsHash) =>{
            console.log(err, ipfsHash)
            
            sertifikatContract.methods.tambahSertifikat(nomor, nama, bbplk, ipfsHash[0].hash, checksum).send(
                {
                    from: accounts[0],
                    gasPrice: web3.utils.toWei("100000000", 'wei')
                }, (err, txHash) => {
                    console.log(err, txHash)
                }
            )
        })
    }

    componentDidMount(){
        this.setState({
            bbplk: 'BBPLK Bandung'
        })

    }

    captureFile = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => this.convertToBuffer(reader);
    }

    arrayBufferToWordArray(ab) {
        var i8a = new Uint8Array(ab);
        var a = [];
        for (var i = 0; i < i8a.length; i += 4) {
          a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
        }
        return CryptoJS.lib.WordArray.create(a, i8a.length);
    }

    convertToBuffer = async(reader) => {
        const bufferArray = await Buffer.from(reader.result);
        this.setState({
            buffer: bufferArray,
            checksum: sha256(this.arrayBufferToWordArray(bufferArray)).toString()
        })        
    }

    reset(e){
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
                        <Button onClick={this.back} className="btn-back"><i className="fa fa-arrow-left fa-lg logo-back" aria-hidden="true" ></i> Kembali</Button>
                        
                    </div>
                    </Nav>

                    <div className="container-fluid form-upload">
                    <Form onSubmit={this.upload}>
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
                            <Button className="btn btn-primary" id="btnReset" onClick={this.reset}>Reset</Button>    
                        </Form.Group>
                        
                    </Form>
                    </div>
                </div>
            </div>
        );
    };
}

export default Upload;