import React, {Component} from 'react';
import Sidebar from './SidebarUI';
import {Nav, Button, Card, Table} from 'react-bootstrap';
import controller from '../controller/SertifikatController';

class Sertifikat extends Component{

    constructor(props){
      super(props)
      this.state = {
        logEvents: []
      }
    }

    linkToUpload(e){
      window.location.href="/upload"
    }

     componentDidMount(){
      controller.getPastEvents().then((events)=> {
        console.log(events)
          this.setState({
            logEvents: events.reverse()
          })
             
        })
     }

    render(){
      return (
        <div className="d-flex" id="wrapper">
            
        <Sidebar/>
        <div id="page-content-wrapper">
            <Nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              {/* <Button className="btn btn-primary" id="menu-toggle">Menu</Button>
              <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </Button> */}
                <Button onClick={this.linkToUpload} className="btn-label-upload"><i className="fa fa-plus-circle fa-lg" aria-hidden="true"></i> Upload Sertifikat</Button>
                
            </Nav>

            <div className="row" style={{margin:'2rem'}}>
              
              {this.state.logEvents.map(data => {
                  return (
                    <div className="col-md-4" key={data.id}>
                    <Card border="primary" style={{ width: '21rem'}}>
                    <Card.Header>{data.returnValues.nomorSertifikat}</Card.Header>
                       <Table className="table-responsive">
                        <tbody>
                          <tr>
                            <td>Nama Peserta</td>
                            <td>:</td>
                            <td>{data.returnValues.nama}</td>
                          </tr>

                          <tr>
                            <td>Penerbit</td>
                            <td>:</td>
                            <td>{data.returnValues.penerbit}</td>
                          </tr>
                          
                          <tr>
                            <td >Tx.Hash</td>
                            <td >:</td>
                            <td ><a href={'http://ropsten.etherscan.io/tx/'+data.transactionHash}>{data.transactionHash.substr(0,18)}...</a></td>
                          </tr>

                          <tr>
                            <td >Block Number</td>
                            <td >:</td>
                            <td ><a href={'https://ropsten.etherscan.io/block/'+data.blockNumber}>{data.blockNumber}</a></td>
                          </tr>

                          <tr>
                            <td colSpan="3"><a href={'https://gateway.ipfs.io/ipfs/'+data.returnValues.ipfshash}><Button className="btn-lihat-admin">Lihat Sertifikat</Button></a></td>
                          </tr>


                        </tbody>
                        
                      </Table>
                    </Card>
                  </div>
                  );  
              })}         

            </div>

          </div>
        </div>
      );
  }
 
}

export default Sertifikat