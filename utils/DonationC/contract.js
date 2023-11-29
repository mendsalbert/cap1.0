import { ethers } from "ethers";
import Donation from "./Donation.json";

export const DonationContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0x545b3f46778FA9eE60052036cC8Eb6c4d1add8CA";
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      contractAddress,
      Donation.abi,
      signer
    );
    return contractReader;
  }
};
