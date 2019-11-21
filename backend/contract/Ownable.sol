contract Ownable {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(isOwner(),"Access Denied");
        _;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner ;
    }
}
