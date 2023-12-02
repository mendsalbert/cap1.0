"use client";
import { IconShip, IconX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import ProtoTypes from "prop-types";
import { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { supplyProduct } from "../../../utils/ProductC/queries";

function Logistics({ products }) {
  const [amount, setAmount] = useState();
  const [name, setname] = useState(null);
  const [quantity, setquantity] = useState(null);
  const [description, setdescription] = useState(null);
  const [imageCID, setimageCID] = useState(null);
  const [id, setid] = useState(null);
  const [dateAdded, setdateAdded] = useState(null);
  const [exist, setexist] = useState(null);
  const [txPending, setTxPending] = useState(false);
  const [value, setValue] = useState(null);

  const setCurrentState = (
    name,
    quantity,
    description,
    imageCID,
    index,
    dateAdded,
    exists
  ) => {
    setname(name);
    setquantity(quantity);
    setdescription(description);
    setimageCID(imageCID);
    setid(index);
    setdateAdded(dateAdded);
    setexist(exists);
    console.log("id", id);
  };

  async function onsupplyproduct() {
    setTxPending(true);
    document?.getElementById("my_modal_9")?.showModal();
    await supplyProduct(id, amount, value);
    setTxPending(false);
  }

  return (
    <>
      {products.map((product, index) => (
        <div className=" bg-white dark:bg-darkblack-600 rounded-lg p-6 relative">
          <div className="shrink-0 rounded-full relative">
            <img
              priority={true}
              src={product.imageUrl}
              className="w-full rounded-md h-48"
              alt="Stack Overflow"
            />
          </div>
          <div className="flex space-x-5">
            <div>
              <h3 className="text-2xl text-bgray-900 dark:text-white font-bold">
                {product.name}
              </h3>
              <div className="flex flex-row space-x-1 cursor-pointer">
                <span className="text-md py-1 bg-blue-500 rounded-full text-white  px-2 dark:text-bgray-50">
                  In stock{" "}
                </span>
                {product?.quantity?.toString() > 1 ? (
                  <span></span>
                ) : (
                  <span
                    onClick={() =>
                      document.getElementById("my_modal_2").showModal()
                    }
                    className="text-md space-x-1 py-1 flex bg-green-500 rounded-full text-white px-2 dark:text-bgray-50"
                  >
                    <IconShip size={20} />
                    Track
                  </span>
                )}
              </div>
            </div>
          </div>
          <p className="pt-5 pb-8 text-lg text-bgray-600 dark:text-bgray-50 ">
            {product.description}
          </p>

          <button
            aria-label="none"
            onClick={() => {
              setCurrentState(
                product.name,
                product.quantity,
                product.description,
                product?.imageCID,
                index,
                product.dateAdded,
                product.exists
              );
              document.getElementById("my_modal_1").showModal();
            }}
            className="text-base w-full text-success-300 font-medium h-12 rounded-md border border-success-300 hover:text-white hover:bg-success-300 transition duration-300 ease-in-out"
          >
            Supply
          </button>
        </div>
      ))}

      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box w-11/12 max-w-5xl dark:bg-[#1d1e23]">
          <div className="flex p-2 space-x-5">
            <img src="/blood.jpeg" width={500} className="rounded-lg" />
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div>
                  <h3 className="text-2xl text-bgray-900 dark:text-white font-bold">
                    {name}
                  </h3>
                  <span className="text-lg text-bgray-600 dark:text-bgray-50">
                    {quantity + "Product in stock"}
                  </span>
                </div>
              </div>
              <p className="pt-5 pb-8 text-lg text-bgray-600 dark:text-bgray-50 ">
                {description}
              </p>

              <div className="flex flex-row justify-between space-x-3 my-3">
                <button className="rounded-full btn btn-outline btn-info">
                  50 Quant
                </button>
                <button className="rounded-full btn btn-outline btn-success">
                  100 Quant
                </button>
                <button className=" rounded-full btn btn-outline btn-warning">
                  200 Quant
                </button>
                <button className=" rounded-full btn btn-outline btn-error">
                  500 Quant
                </button>
              </div>
              <input
                type="text"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Or Enter quantity to supply"
                className="rounded-full dark:bg-darkblack-500 dark:text-white input input-bordered input-md w-full"
              />
              <div className="w-full mt-4">
                <GooglePlacesAutocomplete
                  apiKey="AIzaSyBfkyKitodTym6Q7oMEWgHAEDP9FuLrP8k"
                  selectProps={{
                    value,
                    onChange: (selection) => {
                      const label = selection ? selection.label : "";
                      setValue(label);
                    },
                    styles: {
                      control: (base) => ({
                        ...base,
                        border: "2px solid #e5e7eb", // Tailwind gray-300
                        // boxShadow: "inset 0 2px 2px rgba(203, 204, 209, 0.5)", // Similar to Tailwind coolGray-300 with an inset shadow
                        borderRadius: "9999px", // Fully rounded corners like Tailwind rounded-full
                        padding: "0.5rem", // Similar to Tailwind p-2
                        height: "3.3rem", // Similar to Tailwind h-12
                      }),
                      input: (base) => ({
                        ...base,
                        margin: 0,
                        padding: 0,
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "rgba(55, 65, 81, 0.6)", // Tailwind gray-700 at 60% opacity
                      }),
                    },
                  }}
                />
              </div>
              <button
                onClick={() => {
                  onsupplyproduct();
                }}
                className="bg-[#21c55d] mt-4 hover:bg-green-600 text-white rounded-full px-10  py-2 text-lg"
              >
                Supply
              </button>
            </div>
          </div>
          <div className="modal-action absolute -top-3 right-4">
            <form method="dialog">
              <button className="">
                <IconX className="dark:text-white" />
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* 
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-row justify-center w-9/12 max-w-3xl ">
          <ul className="timeline mt-10">
            <li>
              <div className="timeline-start flex flex-col items-center timeline-box">
                <IconCheckupList size={33} />
                Order Sent
                <span className="text-sm flex flex-row items-center space-x-1">
                  <IconClock size={17} />
                  <span>12-04-23 5:20:34</span>
                </span>
              </div>
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-start flex flex-col items-center timeline-box">
                <IconCircleCheck size={33} />
                Approved
                <span className="text-sm flex flex-row items-center space-x-1">
                  <IconClock size={17} />
                  <span>12-04-23 5:20:34</span>
                </span>
              </div>{" "}
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <hr />
            </li>
            <li>
              <hr />
              <div className="timeline-start flex flex-col items-center timeline-box">
                <IconTruckDelivery size={33} />
                Shippingg
                <span className="text-sm flex flex-row items-center space-x-1">
                  <IconClock size={17} />
                  <span>12-04-23 5:28</span>
                </span>
              </div>{" "}
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <hr />
            </li>
          </ul>
          <div className="modal-action absolute -top-3 right-4">
            <form method="dialog">
              <button className="">
                <IconX className="dark:text-white " />
              </button>
            </form>
          </div>
        </div>
      </dialog> */}

      <dialog id="my_modal_9" className="modal">
        <div className="modal-box dark:bg-[#1d1e23] dark:text-white">
          <h3 className="font-bold text-lg">Transaction Processing!</h3>
          <p className="py-4">
            {txPending ? (
              <div className="flex flex-col items-start">
                <span className="loading loading-spinner text-accent"></span>
                Confirm transaction
              </div>
            ) : (
              "Transaction completed"
            )}
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

Logistics.propTypes = {
  logistics: ProtoTypes.object,
};

export default Logistics;
