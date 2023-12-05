import { ethers } from "ethers";
import Request from "./Request.json";

export const RequestContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0x71df7f100a343797dB465D9925a86C751Bd25736";
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      contractAddress,
      Request.abi,
      signer
    );
    return contractReader;
  }
};
