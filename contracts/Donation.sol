// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.8/automation/KeeperCompatible.sol";

contract Donation {

    // Chainlink Price Feed
    AggregatorV3Interface internal priceFeed;

    // Last time the funds were transferred
    uint256 public lastTransferTime;
    // Interval for fund transfer (24 hours)
    uint256 public interval;
    // Recipient address for the funds
    address payable public recipient;

    // Constructor to set the address of the Chainlink Price Feed
    constructor(address _priceFeed, uint256 _interval, address payable _recipient) {
        priceFeed = AggregatorV3Interface(_priceFeed);
        interval = _interval;
        recipient = _recipient;
        lastTransferTime = block.timestamp;
    }

    struct Campaign {
        string name;
        string country;
        string description;
        string imageCID;
        uint256 targetAmount;
        uint256 totalDonationsReceived;
        bool exists;
        address[] donors;
        mapping(address => uint256) donations;
    }

    struct CampaignDetails {
        string name;
        string country;
        string description;
        string imageCID;
        uint256 targetAmount;
        uint256 totalDonationsReceived;
    }

    uint256 public totalCampaignsCreated;
    mapping(uint256 => Campaign) public campaigns;
    mapping(bytes32 => uint256) public campaignIdByName;

    event CampaignCreated(uint256 indexed campaignId, string name, uint256 targetAmount);
    event DonationReceived(uint256 indexed campaignId, address indexed donor, uint256 amount);

    //chainlink keepers
    function checkUpkeep(bytes calldata /* checkData */) external view returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp - lastTransferTime) > interval;
    }
    
    function performUpkeep(bytes calldata /* performData */) external  {
        if ((block.timestamp - lastTransferTime) > interval) {
            // Transfer logic, example: transfer all funds to the recipient
            lastTransferTime = block.timestamp;
            uint256 contractBalance = address(this).balance;
            if (contractBalance > 0) {
                recipient.transfer(contractBalance);
            }
        }
    }
     // Function to get the latest price of ETH in USDT (example)
    function getLatestPrice() public view returns (int) {
        (
            , 
            int price,
            ,
            ,
            
        ) = priceFeed.latestRoundData();
        return price; // Price of 1 ETH in terms of USDT
    }

    function createCampaign(string memory _name, string memory _country, string memory _description, string memory _imageCID, uint256 _targetAmount) public {
        require(_targetAmount > 0, "Target amount should be greater than zero.");
        bytes32 nameHash = keccak256(abi.encodePacked(_name));
        require(campaignIdByName[nameHash] == 0, "Campaign with the same name already exists.");

        uint256 campaignId = totalCampaignsCreated;
        campaignIdByName[nameHash] = campaignId;
        totalCampaignsCreated++;

        Campaign storage newCampaign = campaigns[campaignId];
        newCampaign.name = _name;
        newCampaign.country = _country;
        newCampaign.description = _description;
        newCampaign.imageCID = _imageCID;
        newCampaign.targetAmount = _targetAmount;
        newCampaign.exists = true;

        emit CampaignCreated(campaignId, _name, _targetAmount);
    }

    function donate(uint256 _campaignId) public payable {
        Campaign storage selectedCampaign = campaigns[_campaignId];
        require(selectedCampaign.exists, "Campaign does not exist.");
        require(msg.value > 0, "Donation amount should be greater than zero.");

        selectedCampaign.totalDonationsReceived += msg.value;

        if (selectedCampaign.donations[msg.sender] == 0) {
            selectedCampaign.donors.push(msg.sender);
        }

        selectedCampaign.donations[msg.sender] += msg.value;

        emit DonationReceived(_campaignId, msg.sender, msg.value);
    }
 
    function getCampaignByIdUSD(uint256 _campaignId) public view returns (CampaignDetails memory) {
        Campaign storage selectedCampaign = campaigns[_campaignId];
        require(selectedCampaign.exists, "Campaign does not exist.");

        return CampaignDetails({
            name: selectedCampaign.name,
            country: selectedCampaign.country,
            description: selectedCampaign.description,
            imageCID: selectedCampaign.imageCID,
            targetAmount: selectedCampaign.targetAmount,
            totalDonationsReceived: selectedCampaign.totalDonationsReceived
        });
    }
     // Modify the donate function or add a new function to handle conversion
    function getCampaignById(uint256 _campaignId) public view returns (CampaignDetails memory, uint256) {
        Campaign storage selectedCampaign = campaigns[_campaignId];
        require(selectedCampaign.exists, "Campaign does not exist.");

        int price = getLatestPrice();
        uint256 usdValue = uint256(price) * selectedCampaign.totalDonationsReceived / 1e18;

        return (CampaignDetails({
            name: selectedCampaign.name,
            country: selectedCampaign.country,
            description: selectedCampaign.description,
            imageCID: selectedCampaign.imageCID,
            targetAmount: selectedCampaign.targetAmount,
            totalDonationsReceived: selectedCampaign.totalDonationsReceived
        }), usdValue);
    }


    function getAllCampaigns() public view returns (CampaignDetails[] memory) {
        CampaignDetails[] memory allCampaigns = new CampaignDetails[](totalCampaignsCreated);
        for (uint i = 0; i < totalCampaignsCreated; i++) {
            if (campaigns[i].exists) {
                Campaign storage campaign = campaigns[i];
                allCampaigns[i] = CampaignDetails({
                    name: campaign.name,
                    country: campaign.country,
                    description: campaign.description,
                    imageCID: campaign.imageCID,
                    targetAmount: campaign.targetAmount,
                    totalDonationsReceived: campaign.totalDonationsReceived
                });
            }
        }
        return allCampaigns;
    }

    function getCampaignIdByName(string memory _name) public view returns (uint256) {
        bytes32 nameHash = keccak256(abi.encodePacked(_name));
        uint256 campaignId = campaignIdByName[nameHash];
        require(campaignId != 0, "Campaign does not exist.");
        return campaignId;
    }
}
