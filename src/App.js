import React from 'react';
import './App.css';
import Login from './view/LoginUI';
import Verifikasi from './view/VerifikasiUI';
import Sertifikat from './view/SertifikatUI';
import Detail from './view/DetailSertifikatUI';
import Upload from './view/UploadUI';
import Dashboard from './view/DashboardUI';
import VerifikasiDetail from './view/VerifikasiDetail';
import Pending from './view/PendingUI';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Verifikasi}/>
          <Route path="/admin" component={Login}/>
          <Route path="/sertifikat" component={Sertifikat}/>
          <Route path="/upload" component={Upload}/>
          <Route path="/detail" component={Detail}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/verifikasi/:nomor" component={VerifikasiDetail}/>          
          <Route path="/pending" component={Pending}/>
        </Switch>
      </Router>

  );
}

export default App;
