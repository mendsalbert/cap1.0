import { ethers } from "ethers";
import Donation from "./Donation.json";

export const DonationContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0x0aFDd95dCc4118d45fe97D7C1900da604f309D66";
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
