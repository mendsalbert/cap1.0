import { ethers } from "ethers";
import Donation from "./Donation.json";

export const DonationContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0x02Ba7aEBeC9054FAbe5a065826F86DEe4d789F31";
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
