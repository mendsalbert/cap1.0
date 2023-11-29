const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function deployContract(name, constructorArgs = []) {
  const ContractFactory = await hre.ethers.getContractFactory(name);
  const contract = await ContractFactory.deploy(...constructorArgs);
  await contract.deployed();

  console.log(`${name} contract address:`, contract.address);

  // Copy ABI file
  const abiSourcePath = path.join(
    __dirname,
    `../artifacts/contracts/${name}.sol/${name}.json`
  );
  const abiDestinationPath = path.join(
    __dirname,
    `../utils/${name}C/${name}.json`
  );
  fs.copyFileSync(abiSourcePath, abiDestinationPath);
  console.log(`${name} ABI file copied!`);

  // Update contract address
  const contractJsPath = path.join(__dirname, `../utils/${name}C/contract.js`);
  let contractJsContent = fs.readFileSync(contractJsPath, { encoding: "utf8" });
  const regex = new RegExp(`(const contractAddress = ")(.*)(")`);
  contractJsContent = contractJsContent.replace(
    regex,
    `$1${contract.address}$3`
  );
  fs.writeFileSync(contractJsPath, contractJsContent);
  console.log(`${name} contract address updated in contract.js!`);

  return contract;
}

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Parameters for the Donation contract constructor
  const priceFeedAddress = "0x9326bfa02add2366b30bacb125260af641031331";
  const interval = 86400; // 24 hours in seconds
  const recipientAddress = "0x5b29f4a7c1715ef2f974f21216fffb1834a33f04";

  // Deploy contracts
  await deployContract("CarbonFootPrint");
  await deployContract("Donation", [
    priceFeedAddress,
    interval,
    recipientAddress,
  ]);
  // Uncomment if News contract is ready to be deployed
  // await deployContract("News");
  await deployContract("Product");
  await deployContract("RequestC"); // Assuming the contract name is RequestC
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// +++++++++++++++ TEST (DEPLOY) ++++++++++++++++++
// const hre = require("hardhat");

// async function main() {
//   const [deployer] = await hre.ethers.getSigners();

//   console.log("Deploying contracts with the account:", deployer.address);

//   let txHash, txReceipt;

//   const Schain = await hre.ethers.getContractFactory("News");
//   const schain = await Schain.deploy();
//   await schain.deployed();

//   txHash = schain.deployTransaction.hash;

//   txReceipt = await ethers.provider.waitForTransaction(txHash);
//   let schainAddress = txReceipt.contractAddress;

//   console.log("schain contract address", schainAddress);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
