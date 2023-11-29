import { ethers } from "ethers";
import Product from "./Donation.json";

export const ProductContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "";
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
