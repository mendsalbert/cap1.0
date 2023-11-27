// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract WarNewsFeed is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    // Chainlink parameters
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    // Store the response data
    string public warNews;

    // Event triggered when data is received
    event WarNewsUpdated(string news);

    /**
     * @notice Constructor to set up Chainlink oracle and job details.
     * @param _oracle The address of the Chainlink oracle.
     * @param _jobId The job ID for the oracle request.
     * @param _fee The LINK fee required for the oracle request.
     */
    constructor(address _oracle, bytes32 _jobId, uint256 _fee) {
        setPublicChainlinkToken();
        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
    }

    /**
     * @notice Requests war news data from an external API via Chainlink oracle.
     * @return requestId The request ID of the Chainlink request.
     */
    function requestWarNewsData() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        request.add("get", "https://api.news-service.com/war-news");

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * @notice Callback function for Chainlink oracle, receives the news data.
     * @param _requestId The request ID of the Chainlink request.
     * @param _warNews The news data received from the oracle.
     */
    function fulfill(bytes32 _requestId, string memory _warNews) public recordChainlinkFulfillment(_requestId) {
        warNews = _warNews;
        emit WarNewsUpdated(warNews);
    }

    // Additional functions as needed
}
