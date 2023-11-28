const hre = require("hardhat");

async function main() {
  // Compile all contracts
  await hre.run("compile");

  // Deploy the CarboonFootPrint contract
  const CarboonFootPrint = await hre.ethers.getContractFactory(
    "WarZoneCarbonFootPrint"
  );
  const carboonFootPrint = await CarboonFootPrint.deploy();
  await carboonFootPrint.deployed();
  console.log(`CarboonFootPrint deployed to: ${carboonFootPrint.address}`);

  // Deploy the Donation contract
  // Replace these parameters with your actual parameters
  const priceFeedAddress = "0x9326BFA02ADD2366b30bacB125260Af641031331"; // Chainlink Price Feed Oracle address
  const interval = 24 * 60 * 60; // 24 hours in seconds
  const recipientAddress = "0x5B29F4A7C1715ef2f974f21216FfFb1834a33F04"; // Recipient address
  const Donation = await hre.ethers.getContractFactory("WarZoneDonation");
  const donation = await Donation.deploy(
    priceFeedAddress,
    interval,
    recipientAddress
  );
  await donation.deployed();
  console.log(`Donation deployed to: ${donation.address}`);

  // Deploy the News contract
  const News = await hre.ethers.getContractFactory("WarNewsFeed");
  const news = await News.deploy();
  await news.deployed();
  console.log(`News deployed to: ${news.address}`);

  // Deploy the Product contract
  const Product = await hre.ethers.getContractFactory("ProductCatalog");
  const product = await Product.deploy();
  await product.deployed();
  console.log(`Product deployed to: ${product.address}`);

  // Deploy the Request contract
  const Request = await hre.ethers.getContractFactory(
    "WarZoneAssistanceRequest"
  );
  const request = await Request.deploy();
  await request.deployed();
  console.log(`Request deployed to: ${request.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
