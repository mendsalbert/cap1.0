// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonFootPrint {
    struct Project {
        string name;
        string country;
        string description;
        string latitude;
        string longitude;
        uint256 targetCarbonOffset;
        uint256 carbonOffsetRemoved;
        uint256 deadline;
        uint256 totalDonationsReceived;
        bool exists;
        address[] doners;
        mapping(address => uint256) donations;
        string imageCID;
    }

    struct ProjectDetails {
        string name;
        string country;
        string description;
        string latitude;
        string longitude;
        uint256 targetCarbonOffset;
        uint256 carbonOffsetRemoved;
        uint256 deadline;
        uint256 totalDonationsReceived;
        string imageCID;
    }

    uint256 public totalProjectsCreated;
    mapping(uint256 => Project) public projects;
    mapping(bytes32 => uint256) public projectIdByName;

    event ProjectCreated(uint256 indexed projectId, string name, uint256 targetCarbonOffset, uint256 deadline);
    event CarbonOffsetRemoved(uint256 indexed projectId, uint256 carbonOffsetRemoved);
    event DonationReceived(uint256 indexed projectId, address indexed doner, uint256 amount);

    function createProject(string memory _name, string memory _country, string memory _description, string memory _latitude, string memory _longitude, uint256 _targetCarbonOffset, uint256 _deadline, string memory _imageCID) public {
        require(_targetCarbonOffset > 0, "Target carbon offset should be greater than zero.");
        require(_deadline > block.timestamp, "Deadline should be in future.");
        bytes32 nameHash = keccak256(abi.encodePacked(_name));
        require(projectIdByName[nameHash] == 0, "Project with the same name already exists.");

        uint256 projectId = totalProjectsCreated;
        projectIdByName[nameHash] = projectId;
        totalProjectsCreated++;

        Project storage newProject = projects[projectId];
        newProject.name = _name;
        newProject.country = _country;
        newProject.description = _description;
        newProject.latitude = _latitude;
        newProject.longitude = _longitude;
        newProject.targetCarbonOffset = _targetCarbonOffset;
        newProject.deadline = _deadline;
        newProject.exists = true;
        newProject.imageCID = _imageCID;

        emit ProjectCreated(projectId, _name, _targetCarbonOffset, _deadline);
    }

    function donate(uint256 _projectId) public payable {
        Project storage selectedProject = projects[_projectId];
        require(selectedProject.exists, "Project does not exist.");
        require(block.timestamp <= selectedProject.deadline, "Project deadline has passed.");
        require(selectedProject.carbonOffsetRemoved < selectedProject.targetCarbonOffset, "Target carbon offset has already been reached.");
        require(msg.value > 0, "Donation amount should be greater than zero.");

        uint256 remainingOffset = selectedProject.targetCarbonOffset - selectedProject.carbonOffsetRemoved;
        uint256 offsetRemoved = msg.value / 10000000000000000;

        uint256 adjustedValue = msg.value;

        if (offsetRemoved > remainingOffset) {
            offsetRemoved = remainingOffset;
            adjustedValue = offsetRemoved * 10000000000000000;
        }

        selectedProject.carbonOffsetRemoved += offsetRemoved;
        selectedProject.totalDonationsReceived += adjustedValue;

        if (selectedProject.donations[msg.sender] == 0) {
            selectedProject.doners.push(msg.sender);
        }

        selectedProject.donations[msg.sender] += adjustedValue;

        if (selectedProject.carbonOffsetRemoved == selectedProject.targetCarbonOffset) {
            emit CarbonOffsetRemoved(_projectId, selectedProject.carbonOffsetRemoved);
        }

        emit DonationReceived(_projectId, msg.sender, adjustedValue);
    }

    function getProjectById(uint256 _projectId) public view returns (string memory, string memory, string memory, string memory, string memory, uint256, uint256, bool, address[] memory, string memory) {
        Project storage selectedProject = projects[_projectId];
        require(selectedProject.exists, "Project does not exist.");

        return (selectedProject.name, selectedProject.country, selectedProject.description, selectedProject.latitude, selectedProject.longitude, selectedProject.targetCarbonOffset, selectedProject.carbonOffsetRemoved, selectedProject.exists, selectedProject.doners, selectedProject.imageCID);
    }

    function getAllProjects() public view returns(ProjectDetails[] memory) {
        ProjectDetails[] memory allProjects = new ProjectDetails[](totalProjectsCreated);
        uint counter = 0;
        for (uint i = 0; i < totalProjectsCreated; i++) {
            if (projects[i].exists) {
                Project storage project = projects[i];
                ProjectDetails memory projectDetails = ProjectDetails({
                    name: project.name,
                    country: project.country,
                    description: project.description,
                    latitude: project.latitude,
                    longitude: project.longitude,
                    targetCarbonOffset: project.targetCarbonOffset,
                    carbonOffsetRemoved: project.carbonOffsetRemoved,
                    deadline: project.deadline,
                    totalDonationsReceived: project.totalDonationsReceived,
                    imageCID: project.imageCID
                });
                allProjects[counter] = projectDetails;
                counter++;
            }
        }
        return allProjects;
    }

    function getProjectIdByName(string memory _name) public view returns (uint256) {
        bytes32 nameHash = keccak256(abi.encodePacked(_name));
        uint256 projectId = projectIdByName[nameHash];
        require(projectId != 0, "Project does not exist.");
        return projectId;
    }

    function carbonOffsetRemoved(uint256 _projectId) public view returns(uint256) {
        Project storage selectedProject = projects[_projectId];
        require(selectedProject.exists, "Project does not exist.");

        return selectedProject.carbonOffsetRemoved;
    }
}