import { ethers } from "ethers";
import CarboonFootprint from "./CarbonFootPrint.json";

export const CarboonFootPrintContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0x30e59FcCbE7A2364a15D0e0F310A9E41d42348dC";
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
