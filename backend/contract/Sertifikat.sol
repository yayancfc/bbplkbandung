import "./Ownable.sol";

contract Sertifikat is Ownable{
    
    mapping (string => SertifikatInfo) collection;

    struct SertifikatInfo {
        string nomorSertifikat;
        string ipfshash;
        string nama;
        string nomorInduk;
        string ttl;
        string alamat;
        bool exist; 
    }
    

    event HashAdded(string nomorSertifikat, string ipfshash, string checksum, string nama, string nomorInduk, string ttl, string alamat);

    constructor () public {
        owner = msg.sender;
    }

    function tambahSertifikat(string _nomorSertifikat, string _nama, string _nomorInduk, string _ttl, string _alamat,
    string _ipfshash, string _checksum) public onlyOwner {
        require(collection[_checksum].exist == false, "this hash already exists in contract");
        SertifikatInfo memory docInfo = SertifikatInfo(_nomorSertifikat, _ipfshash, _nama, _nomorInduk, _ttl, _alamat, true);
        collection[_checksum] = docInfo; 
        collection[_nomorSertifikat] = docInfo;
        emit HashAdded(_nomorSertifikat, _ipfshash, _checksum, _nama, _nomorInduk, _ttl, _alamat);
    }

    function getByChecksum(string _hash) public view returns (string, string, string, string, string, string, bool) {
        return (
            collection[_hash].nomorSertifikat,
            collection[_hash].ipfshash,
            collection[_hash].nama,
            collection[_hash].nomorInduk,
            collection[_hash].ttl,
            collection[_hash].alamat,
            collection[_hash].exist
        );
    }
    
    function getByNoSertifikat(string _nomorSertifikat) public view returns (string, string, string, string, string, string, bool) {
        return (
            _nomorSertifikat, 
            collection[_nomorSertifikat].ipfshash,
            collection[_nomorSertifikat].nama,
            collection[_nomorSertifikat].nomorInduk,
            collection[_nomorSertifikat].ttl,
            collection[_nomorSertifikat].alamat,
            collection[_nomorSertifikat].exist
        );
    }
    
}