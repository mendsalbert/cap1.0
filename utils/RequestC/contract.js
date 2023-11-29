import { ethers } from "ethers";
import Request from "./Request.json";

export const RequestContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const contractAddress = "0x83EAe8e31d2380bb1d03686CDD1B0c0a3309A44F";
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
