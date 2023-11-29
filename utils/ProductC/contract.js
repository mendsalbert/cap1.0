import { ethers } from "ethers";
import Product from "./Product.json";

export const ProductContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0xBea351df76CC9b31528Fb6AC8492ad96105Ed3c5";
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
