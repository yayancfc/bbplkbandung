import React, { Component } from 'react';
import sertifikatContract from '../service/Sertifikat';
import CryptoJS from 'crypto-js';
import web3 from '../service/web3';
import ipfs from '../service/ipfs';

class SertifikatController extends Component{
    getPastEvents = () => {
        return sertifikatContract.getPastEvents(
            'HashAdded', 
            {
              fromBlock: 0, 
              toBlock : 'latest'
            })
    }

    upload = async (nomor, nama, nomorInduk, ttl, alamat, checksum, buffer) => {
        const accounts = await web3.eth.getAccounts();
        await ipfs.add(buffer, (err, ipfsHash) =>{
            
            sertifikatContract.methods.tambahSertifikat(nomor, nama, nomorInduk, ttl, alamat, ipfsHash[0].hash, checksum ).send(
                {
                    from: accounts[0],
                    gasPrice: web3.utils.toWei("100000000", 'wei')
                })
        })
    }

    arrayBufferToWordArray(ab) {
        var i8a = new Uint8Array(ab);
        var a = [];
        for (var i = 0; i < i8a.length; i += 4) {
          a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
        }
        return CryptoJS.lib.WordArray.create(a, i8a.length);
    }

    generateChecksum = (e, cb) => {
        const file = e.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => cb(reader)
    }

    lihatSertifikat = (hash) => {
        window.location.href = 'https://gateway.ipfs.io/ipfs/'+hash
    }

    lihatTransaksi = (txHash) => {
        window.location.href = 'http://ropsten.etherscan.io/tx/'+txHash
    }

    lihatBlock = (block) => {
        window.location.href = 'http://ropsten.etherscan.io/block/'+block
    }

    cekNama = (nama) => {
        if(nama===""){
          return false
        }else{
          return true
        }
      }

    cekNomorPeserta = (nomorPeserta) => {
    if(nomorPeserta===""){
        return false
    }else{
        return true
    }
    }
  
  

}

export default new SertifikatController()