import { BigNumber, ethers } from "ethers";
import { contract } from "./contract";
import { toEth, toWei, parseErrorMsg } from "./ether-utils";

export async function createCarbonFootPrintProject(
  name,
  country,
  description,
  latitude,
  longitude,
  targetCarbonOffset,
  deadline,
  imageCID
) {
  try {
    const contractObj = await contract(); // Make sure this is the correct contract object for CarbonFootPrint
    const unixTime = Math.floor(new Date(deadline).getTime() / 1000);

    const data = await contractObj.createProject(
      name,
      country,
      description,
      latitude,
      longitude,
      targetCarbonOffset,
      unixTime,
      imageCID
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function donateToCarbonFootPrintProject(projectId, amount) {
  try {
    const amountInWei = ethers.utils.parseEther(amount.toString());
    const contractObj = await contract(); // Make sure this is the correct contract object for CarbonFootPrint

    const data = await contractObj.donate(projectId, {
      value: amountInWei,
    });

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

// Reuse the existing utility functions from your queries.js or define them if not already available
function toWei(amount) {
  return ethers.utils.parseUnits(amount.toString(), "ether");
}

function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message || "An unknown error occurred";
}
