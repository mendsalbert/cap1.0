import { ethers } from "ethers";
import Donation from "./Donation.json";

export const DonationContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0xB6ba321c8d557F98f9ca265Be13d6F5420f3d5be";
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
