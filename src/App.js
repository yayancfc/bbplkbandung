import React from 'react';
import './App.css';
import Admin from './admin/Admin';
import Verifikasi from './Verifikasi';
import Sertifikat from './admin/Sertifikat';
import Upload from './admin/Upload';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Verifikasi}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/sertifikat" component={Sertifikat}/>
          <Route path="/upload" component={Upload}/>
        </Switch>
      </Router>

  );
}

export default App;
