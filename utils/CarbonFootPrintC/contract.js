import { ethers } from "ethers";
import CarboonFootprint from "./CarbonFootPrint.json";

export const CarboonFootPrintContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0xF35959B70A2E8f9FB458431C366533637e67d2eB";
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
