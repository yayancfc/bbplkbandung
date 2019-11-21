// This file creates a web3 instance for our app
// We refer to this web3 instance in other files
import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider)

export default web3;
