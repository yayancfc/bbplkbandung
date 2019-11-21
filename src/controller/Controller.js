import React, { Component } from 'react';
import sertifikatContract from '../service/Sertifikat';
import CryptoJS from 'crypto-js';

class Controller extends Component{
    
    openUpload = () => {
        const id = document.getElementById('upload')
        id.click()    
      }

      verifyByNoSertifikat = (nomor) => {        
        return sertifikatContract.methods.getByNoSertifikat(nomor).call();
      }

      verifyByChecksum = (checksum) => {
          return sertifikatContract.methods.getByChecksum(checksum).call();
      }

      arrayBufferToWordArray(ab) {
        var i8a = new Uint8Array(ab);
        var a = [];
        for (var i = 0; i < i8a.length; i += 4) {
          a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
        }
        return CryptoJS.lib.WordArray.create(a, i8a.length);
    }

    getnerateChecksum = (e, cb) => {
        const file = e.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => cb(reader)
    }
    

}

export default new Controller()