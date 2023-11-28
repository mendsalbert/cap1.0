// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Request {
    struct Request {
        string requestType;
        uint256 timestamp;
        string location;
        string urgency;
        bool isFulfilled;
    }

    Request[] public requests;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function createRequest(string memory _type, string memory _location, string memory _urgency) public {
        requests.push(Request({
            requestType: _type,
            timestamp: block.timestamp,
            location: _location,
            urgency: _urgency,
            isFulfilled: false
        }));
        // Trigger notification to First Responders
    }

    function viewRequest(uint _index) public view returns (Request memory) {
        require(_index < requests.length, "Request does not exist");
        return requests[_index];
    }

    function updateRequestStatus(uint _index, bool _status) public onlyAdmin {
        require(_index < requests.length, "Request does not exist");
        Request storage request = requests[_index];
        request.isFulfilled = _status;
        // Additional logic for notification or follow-up actions
    }

    function totalRequests() public view returns (uint) {
        return requests.length;
    }

    // Function to change the admin if needed
    function changeAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }

    //fucntion to view all request
     function viewAllRequests() public view returns (Request[] memory) {
        return requests;
    }

    // Additional functions can include:
    // - Handling escalations for urgent requests
    // - Archiving completed requests
    // - Generating reports for NGO oversight
    // - Emergency broadcast to all First Responders
    // - Secure communication channels between users and First Responders
}
