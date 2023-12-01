import { ethers } from "ethers";
import { DonationContract } from "./contract"; // Update the import to match your contract

export async function createCampaign(
  name,
  country,
  description,
  imageCID,
  targetAmount
) {
  try {
    const contractObj = await DonationContract(); // Make sure this is the correct contract object for Donation
    const targetAmountInWei = ethers.utils.parseEther(targetAmount.toString());

    const data = await contractObj.createCampaign(
      name,
      country,
      description,
      imageCID,
      targetAmountInWei
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function donateToCampaign(campaignId, amount) {
  try {
    const amountInWei = ethers.utils.parseEther(amount.toString());
    const contractObj = await DonationContract(); // Make sure this is the correct contract object for Donation

    const data = await contractObj.donate(campaignId, {
      value: amountInWei,
    });

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getCampaign(campaignId) {
  try {
    const contractObj = await DonationContract(); // Ensure this is the Donation contract instance
    const data = await contractObj.getCampaignById(campaignId);
    return data;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function getAllCampaigns() {
  try {
    const contractObj = await DonationContract(); // Ensure this is the Donation contract instance
    const data = await contractObj.getAllCampaigns();
    return data;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function getCampaignByName(name) {
  try {
    const contractObj = await DonationContract(); // Ensure this is the Donation contract instance
    const campaignId = await contractObj.getCampaignIdByName(name);
    if (campaignId.toNumber() === 0) {
      throw new Error("Campaign does not exist.");
    }
    const data = await contractObj.getCampaignById(campaignId);
    return data;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

// Reuse the existing utility functions from your queries.js or define them if not already available
function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message || "An unknown error occurred";
}
