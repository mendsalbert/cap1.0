import { ethers } from "ethers";
import Product from "./Product.json";

export const ProductContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0x1f932feA25e37d9a6df1B58d4CB08C7df26BA544";
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
