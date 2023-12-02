import { ethers } from "ethers";
import Product from "./Product.json";

export const ProductContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0x6d18Dd52Bf0Ee75aEc2c39310e5f83BCAcd65a04";
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
