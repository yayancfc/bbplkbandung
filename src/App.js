import React, { Component } from 'react';
import './App.css';
import Login from './view/LoginUI';
import Verifikasi from './view/VerifikasiUI';
import Sertifikat from './view/SertifikatUI';
import Upload from './view/UploadUI';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Verifikasi}/>
          <Route path="/admin" component={Login}/>
          <Route path="/sertifikat" component={Sertifikat}/>
          <Route path="/upload" component={Upload}/>
        </Switch>
      </Router>

  );
}

export default App;
