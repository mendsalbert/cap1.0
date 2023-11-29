// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Request {
    struct RequestC { // Renamed struct here
        string requestType;
        uint256 timestamp;
        string location;
        string urgency;
        bool isFulfilled;
    }

    RequestC[] public requests; // Updated the type of the array
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function createRequest(string memory _type, string memory _location, string memory _urgency) public {
        requests.push(RequestC({ // Updated struct name here
            requestType: _type,
            timestamp: block.timestamp,
            location: _location,
            urgency: _urgency,
            isFulfilled: false
        }));
        // Trigger notification to First Responders
    }

    function viewRequest(uint _index) public view returns (RequestC memory) { // Updated return type here
        require(_index < requests.length, "Request does not exist");
        return requests[_index];
    }

    function updateRequestStatus(uint _index, bool _status) public onlyAdmin {
        require(_index < requests.length, "Request does not exist");
        RequestC storage request = requests[_index]; // Updated struct name here
        request.isFulfilled = _status;
        // Additional logic for notification or follow-up actions
    }

    function totalRequests() public view returns (uint) {
        return requests.length;
    }

    function changeAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }

    function viewAllRequests() public view returns (RequestC[] memory) { // Updated return type here
        return requests;
    }

    // Additional functions as needed
}
