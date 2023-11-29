import { ethers } from "ethers";
import CarboonFootprint from "./CarbonFootPrint.json";

export const CarboonFootPrintContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "";
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
