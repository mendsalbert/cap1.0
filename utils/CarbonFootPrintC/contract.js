import { ethers } from "ethers";
import CarboonFootprint from "./CarbonFootPrint.json";

export const CarboonFootPrintContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0x1316456Af510c9DECe0ca0BbFFeedaC2C1AE4a94";
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      contractAddress,
      CarboonFootprint.abi,
      signer
    );
    return contractReader;
  }
};
