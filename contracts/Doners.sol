pragma solidity ^0.8.0;

contract WarZoneDonation {
    struct Campaign {
        string name;
        string category;
        uint256 targetAmount;
        uint256 amountReceived;
        string country;
        string imageUrl;
        string description;
        address payable targetAddress;
        bool isActive;
    }

    struct Donor {
        address donorAddress;
        uint256 amount;
    }

    Campaign[] public campaigns;
    mapping(uint256 => Donor[]) public donorsByCampaign;

    function createCampaign(
        string memory _name,
        string memory _category,
        uint256 _targetAmount,
        string memory _country,
        string memory _imageUrl,
        string memory _description,
        address payable _targetAddress
    ) public {
        campaigns.push(Campaign({
            name: _name,
            category: _category,
            targetAmount: _targetAmount,
            amountReceived: 0,
            country: _country,
            imageUrl: _imageUrl,
            description: _description,
            targetAddress: _targetAddress,
            isActive: true
        }));
    }

    function donate(uint256 campaignIndex) public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        require(campaignIndex < campaigns.length, "Campaign does not exist");
        require(campaigns[campaignIndex].isActive, "Campaign is not active");

        Campaign storage campaign = campaigns[campaignIndex];
        campaign.amountReceived += msg.value;
        donorsByCampaign[campaignIndex].push(Donor({ donorAddress: msg.sender, amount: msg.value }));

        if (campaign.amountReceived >= campaign.targetAmount) {
            campaign.targetAddress.transfer(campaign.amountReceived);
            campaign.isActive = false;
            // Optionally reset campaign or handle completion
        }
    }

    function listAllCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    // Additional functions for viewing donations, handling campaign updates, etc.
}
