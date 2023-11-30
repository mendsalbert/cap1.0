import { BigNumber, ethers } from "ethers";
import { CarboonFootPrintContract } from "./contract";
// import { , toWei, parseErrorMsg } from "./ether-utils";

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
    const contractObj = await CarboonFootPrintContract(); // Make sure this is the correct contract object for CarbonFootPrint
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
    const contractObj = await CarboonFootPrintContract(); // Make sure this is the correct contract object for CarbonFootPrint

    const data = await contractObj.donate(projectId, {
      value: amountInWei,
    });

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getCampaign(projectId) {
  try {
    const contractObj = await CarboonFootPrintContract(); // Ensure this is the CarbonFootPrint contract instance
    const data = await contractObj.getProjectById(projectId);
    return data;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function getCampaigns() {
  try {
    const contractObj = await CarboonFootPrintContract(); // Ensure this is the CarbonFootPrint contract instance
    const data = await contractObj.getAllProjects();
    return data;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function getCampaignByName(name) {
  try {
    const contractObj = await CarboonFootPrintContract(); // Ensure this is the CarbonFootPrint contract instance
    const projectId = await contractObj.getProjectIdByName(name);
    if (projectId.toNumber() === 0) {
      throw new Error("Project does not exist.");
    }
    const data = await contractObj.getProjectById(projectId);
    return data;
  } catch (e) {
    console.log(e);
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
