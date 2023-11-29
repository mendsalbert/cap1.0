import { ethers } from "ethers";
import Product from "./Product.json";

export const ProductContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "";
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      contractAddress,
      Product.abi,
      signer
    );
    return contractReader;
  }
};
