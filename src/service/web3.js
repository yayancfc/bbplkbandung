import Web3 from 'web3';

let web3;

// Logic to see which environment we are in (either server or client-side)
if (window.location.pathname === '/upload') {
  // We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
  console.log(web3)
}else if(window.location.pathname === '/pending'){
  web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/f6d020232988476c9df771c2686e71a1'));
} 
else {
  // We are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
      'https://ropsten.infura.io/v3/f6d020232988476c9df771c2686e71a1' 
    //'https://ropsten.infura.io/pBXAeKwWE9Y2B3y2sRnw' //tesnet rinkbey pengirim
    //'https://mainnet.infura.io/ukTTF6TIcLu8rqO10w98'
  );
  web3 = new Web3(provider);  // Reassign web3 to provider
}

export default web3;
