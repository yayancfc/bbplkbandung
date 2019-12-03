import web3 from './web3';

const address = '0xf854098353883eb526A0DF618C340065c25Bb0E8';
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_nomorSertifikat",
				"type": "string"
			},
			{
				"name": "_nama",
				"type": "string"
			},
			{
				"name": "_nomorInduk",
				"type": "string"
			},
			{
				"name": "_ttl",
				"type": "string"
			},
			{
				"name": "_alamat",
				"type": "string"
			},
			{
				"name": "_ipfshash",
				"type": "string"
			},
			{
				"name": "_checksum",
				"type": "string"
			}
		],
		"name": "tambahSertifikat",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "nomorSertifikat",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "ipfshash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "checksum",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "nama",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "nomorInduk",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "ttl",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "alamat",
				"type": "string"
			}
		],
		"name": "HashAdded",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "getByChecksum",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_nomorSertifikat",
				"type": "string"
			}
		],
		"name": "getByNoSertifikat",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

export default new web3.eth.Contract(abi, address);