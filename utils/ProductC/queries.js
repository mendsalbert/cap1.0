import { ethers } from "ethers";
import { ProductContract } from "./contract"; // Update the import to match your Product contract

export async function addProduct(name, quantity, description, imageUrl) {
  try {
    const contractObj = await ProductContract(); // Ensure this is the correct contract object for Product
    const quantityAsNumber = ethers.utils.parseUnits(
      quantity.toString(),
      "wei"
    );

    const data = await contractObj.addProduct(
      name,
      quantityAsNumber,
      description,
      imageUrl
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function getProduct(productId) {
  try {
    const contractObj = await ProductContract(); // Ensure this is the Product contract instance
    const data = await contractObj.getProductById(productId);
    return data;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function getAllProducts() {
  try {
    const contractObj = await ProductContract(); // Ensure this is the Product contract instance
    const data = await contractObj.getAllProducts();
    return data;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function supplyProduct(productId, quantity, supplyLocation) {
  try {
    const contractObj = await ProductContract(); // Ensure this is the correct contract object for Product
    const quantityAsNumber = ethers.utils.parseUnits(
      quantity.toString(),
      "wei"
    );

    const data = await contractObj.supply(
      productId,
      quantityAsNumber,
      supplyLocation
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    console.log(e);
    return parseErrorMsg(e);
  }
}

export async function getProductIdByName(name) {
  try {
    const contractObj = await ProductContract(); // Ensure this is the Product contract instance
    const productId = await contractObj.getProductIdByName(name);
    if (productId.toNumber() === 0) {
      throw new Error("Product does not exist.");
    }
    const data = await contractObj.getProductById(productId);
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
