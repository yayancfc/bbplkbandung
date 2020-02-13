import React, { Component } from 'react';
import sertifikatContract from '../service/Sertifikat';
import CryptoJS from 'crypto-js';
import ipfs from '../service/ipfs';
import web3 from '../service/web3';

class SertifikatController extends Component{

    constructor(props){
        super(props)
        this.state = {
            accounts : ''
        }
    }
    getPastEvents = () => {
        return sertifikatContract.getPastEvents(
            'HashAdded', 
            {
              fromBlock: 0, 
              toBlock : 'latest'
            })
    }

    upload = async (nomor, nama, nomorInduk, ttl, alamat, checksum, buffer, cb) => {

        const accounts = await web3.eth.getAccounts();
        
        console.log('accounts',accounts);        

        await ipfs.add(buffer, (err, ipfsHash) =>{
            
            return sertifikatContract.methods.tambahSertifikat(nomor, nama, nomorInduk, ttl, alamat, ipfsHash[0].hash, checksum ).send(
                {
                    from: accounts[0],
                    gasPrice: web3.utils.toWei("100000000", 'wei')
                }, cb)
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
//        if(!file) return
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
  
    getPendingBlock = () => {
        sertifikatContract.getPastEvents(
            'HashAdded', 
            {
              fromBlock: 0, 
              toBlock : 'latest'
            }).then((response) => {
            console.log(response);
            
        })
    }

    subscribeToTxs(address) {
        // return web3.eth.subscribe('pendingTransactions', (err, txHash) => {
        //     if (err) {
        //         throw('err', err);
        //     }
        //     console.log('tx', txHash);
            
        // })
        // .on("data", function(txHash){
        //     return web3.eth.getTransaction(txHash, (err, returnedValue) => {
        //         if (err) {
        //             // error handling
        //             console.log('eer', err);
                    
        //         }
        //         if (returnedValue && returnedValue.from === '0xe0d3502baB53337735864D512392bB78444dd4F7') {
        //             console.log('pending', returnedValue);
        //         }

        //         console.log('ret', returnedValue);
        //     })
        // });

        web3.utils.toAscii("0xc7d20ded00000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000000000034153580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000261730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002617300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000036173780000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003c4b702e204d616e616c616e6775204e6f2e30342052542032342f3038204b65632e2054616e6a756e677369616e672c204b61622e20537562616e672e00000000000000000000000000000000000000000000000000000000000000000000002e516d574d42636e3431313855744e4c4b34656363627944385865356a44784d754d717a34344d3638386a6d615764000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004031663064393631366166323435346634616263373532653036363666393761396433313430383566656230623438313161366365663331336535643338613465").then((response) => {
            console.log(response)
        })
            


    }
  

}

export default new SertifikatController()