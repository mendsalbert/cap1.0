// const hre = require("hardhat");

// async function main() {
//   const [deployer] = await hre.ethers.getSigners();

//   console.log("Deploying contracts with the account:", deployer.address);

//   // Parameters for the Donation contract constructor
//   const priceFeedAddress = 0x9326bfa02add2366b30bacb125260af641031331; // The address of the Chainlink Price Feed contract
//   const interval = 86400; // 24 hours in seconds
//   const recipientAddress = 0x5b29f4a7c1715ef2f974f21216fffb1834a33f04; // The recipient address

//   // Deploy CarbonFootPrint
//   const CarbonFootPrint = await hre.ethers.getContractFactory(
//     "CarbonFootPrint"
//   );
//   const carbonFootPrint = await CarbonFootPrint.deploy();
//   await carbonFootPrint.deployed();
//   console.log("CarbonFootPrint contract address:", carbonFootPrint.address);

//   // Deploy Donation
//   const Donation = await hre.ethers.getContractFactory("Donation");
//   const donation = await Donation.deploy(
//     priceFeedAddress,
//     interval,
//     recipientAddress
//   );
//   await donation.deployed();
//   console.log("Donation contract address:", donation.address);

//   // Deploy News
//   const News = await hre.ethers.getContractFactory("News");
//   const news = await News.deploy();
//   await news.deployed();
//   console.log("News contract address:", news.address);

//   // Deploy Product
//   const Product = await hre.ethers.getContractFactory("Product");
//   const product = await Product.deploy();
//   await product.deployed();
//   console.log("Product contract address:", product.address);

//   // Deploy Request
//   const Request = await hre.ethers.getContractFactory("Request");
//   const request = await Request.deploy();
//   await request.deployed();
//   console.log("Request contract address:", request.address);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
