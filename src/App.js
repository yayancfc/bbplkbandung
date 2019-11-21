import React, { Component } from 'react';
import './App.css';
import Login from './view/Login';
import Verifikasi from './view/Verifikasi';
import Sertifikat from './view/Sertifikat';
import Upload from './view/Upload';
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
