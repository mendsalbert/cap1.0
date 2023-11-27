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
    }

    struct Donor {
        address donorAddress;
        uint256 amount;
    }

    Campaign public campaign;
    Donor[] public donors;

    constructor(
        string memory _name,
        string memory _category,
        uint256 _targetAmount,
        string memory _country,
        string memory _imageUrl,
        string memory _description,
        address payable _targetAddress
    ) {
        campaign = Campaign({
            name: _name,
            category: _category,
            targetAmount: _targetAmount,
            amountReceived: 0,
            country: _country,
            imageUrl: _imageUrl,
            description: _description,
            targetAddress: _targetAddress
        });
    }

    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        campaign.amountReceived += msg.value;
        donors.push(Donor({ donorAddress: msg.sender, amount: msg.value }));

        if (campaign.amountReceived >= campaign.targetAmount) {
            campaign.targetAddress.transfer(campaign.amountReceived);
            // Reset campaign or handle completion
        }
    }

    function getDonors() public view returns (Donor[] memory) {
        return donors;
    }


 function getSingleDonation(uint index) public view returns (Donor memory) {
        require(index < donors.length, "Donation index out of bounds");
        return donors[index];
    }

    
    // Additional functions like refund to donors if target not met, update campaign details, etc.
}
