import { ethers } from "ethers";
import Donation from "./Donation.json";

export const DonationContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0x7D53cBB0FD1A8D5d9ccC643546b1C5eE84232611";
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
