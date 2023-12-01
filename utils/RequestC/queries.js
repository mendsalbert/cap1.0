import { ethers } from "ethers";
import { RequestContract } from "./contract"; // Update the import to match your Request contract

export async function createRequest(requestType, location, urgency) {
  try {
    const contractObj = await RequestContract(); // Ensure this is the correct contract object for Request

    const data = await contractObj.createRequest(
      requestType,
      location,
      urgency
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function viewRequest(index) {
  try {
    const contractObj = await RequestContract(); // Ensure this is the Request contract instance
    const data = await contractObj.viewRequest(index);
    return data;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function updateRequestStatus(index, status) {
  try {
    const contractObj = await RequestContract(); // Ensure this is the Request contract instance
    const data = await contractObj.updateRequestStatus(index, status);

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function viewAllRequests() {
  try {
    const contractObj = await RequestContract(); // Ensure this is the Request contract instance
    const data = await contractObj.viewAllRequests();
    return data;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function changeAdmin(newAdmin) {
  try {
    const contractObj = await RequestContract(); // Ensure this is the Request contract instance
    const data = await contractObj.changeAdmin(newAdmin);

    const receipt = await data.wait();
    return receipt;
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
