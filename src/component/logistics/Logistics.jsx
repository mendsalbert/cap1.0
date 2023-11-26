"use client";
import {
  IconAtom,
  IconAtom2,
  IconAtom2Filled,
  IconCash,
  IconCheckupList,
  IconCircleCheck,
  IconClock,
  IconShip,
  IconTargetArrow,
  IconTruckDelivery,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import ProtoTypes from "prop-types";

function Logistics({ logistic }) {
  const { img, title, category, text, status } = logistic;
  return (
    <>
      <div className=" bg-white dark:bg-darkblack-600 rounded-lg p-6 relative">
        <div className="shrink-0 rounded-full relative">
          <img
            priority={true}
            src={img.src}
            className="w-full rounded-md h-48"
            alt="Stack Overflow"
          />
        </div>
        <div className="flex space-x-5">
          <div>
            <h3 className="text-2xl text-bgray-900 dark:text-white font-bold">
              {title}
            </h3>
            <div className="flex flex-row space-x-1 cursor-pointer">
              <span className="text-md py-1 bg-blue-500 rounded-full text-white  px-2 dark:text-bgray-50">
                {category}
              </span>
              <span
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
                className="text-md space-x-1  py-1  flex bg-green-500 rounded-full text-white  px-2 dark:text-bgray-50"
              >
                <IconShip size={20} />
                Track
              </span>
            </div>
          </div>
        </div>
        <p className="pt-5 pb-8 text-lg text-bgray-600 dark:text-bgray-50 ">
          {text}
        </p>

        <button
          aria-label="none"
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="text-base w-full text-success-300 font-medium h-12 rounded-md border border-success-300 hover:text-white hover:bg-success-300 transition duration-300 ease-in-out"
        >
          Supply
        </button>
      </div>

      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box w-11/12 max-w-5xl dark:bg-[#1d1e23]">
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          {/* <p className="py-4">
            Press ESC key or click the button below to close
          </p> */}
          <div className="flex p-2 space-x-5">
            <img src="/blood.jpeg" width={500} className="rounded-lg" />
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div>
                  <h3 className="text-2xl text-bgray-900 dark:text-white font-bold">
                    {title}
                  </h3>
                  <span className="text-lg text-bgray-600 dark:text-bgray-50">
                    {category}
                  </span>
                </div>
              </div>
              <p className="pt-5 pb-8 text-lg text-bgray-600 dark:text-bgray-50 ">
                {text}
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
                placeholder="Or Enter quantity to supply"
                className="rounded-full input input-bordered input-md w-full "
              />
              <select className="select mt-3 rounded-full w-full">
                <option disabled selected>
                  Location to deliver supply
                </option>
                <option>Ghana</option>
                <option>Isreal</option>
                <option>Gaza</option>
                <option>Ukraine</option>
              </select>
              <button className="bg-[#21c55d] mt-4 hover:bg-green-600 text-white rounded-full px-10  py-2 text-lg">
                Supply
              </button>
            </div>
          </div>
          <div className="modal-action absolute -top-3 right-4">
            <form method="dialog">
              <button className="">
                <IconX />
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex flex-row justify-center w-9/12 max-w-3xl">
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
        </div>
      </dialog>
    </>
  );
}

Logistics.propTypes = {
  logistics: ProtoTypes.object,
};

export default Logistics;
