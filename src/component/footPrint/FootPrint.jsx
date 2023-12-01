"use client";
import {
  IconAtom,
  IconAtom2,
  IconAtom2Filled,
  IconCash,
  IconClock,
  IconTargetArrow,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import ProtoTypes from "prop-types";
import date from "date-and-time";
import { useState } from "react";
import { donateToCarbonFootPrintProject } from "../../../utils/CarbonFootPrintC/queries";
function FootPrint({ footprints }) {
  console.log(footprints);
  // const dateString = "";

  const [amount, setAmount] = useState();
  const [txPending, setTxPending] = useState(false);

  const [name, setname] = useState(null);
  const [country, setcountry] = useState(null);
  const [description, setdescription] = useState(null);
  const [imageCID, setimageCID] = useState(null);
  const [deadline, setdeadline] = useState(null);
  const [id, setid] = useState(null);
  const [carbonOffsetRemoved, setcarbonOffsetRemoved] = useState(null);
  const [targetCarbonOffset, settargetCarbonOffset] = useState(null);
  const [totalDonationsReceived, settotalDonationsReceived] = useState(null);
  const setCurrentState = (
    name,
    country,
    description,
    imageCID,
    deadline,
    id,
    carbonOffsetRemoved,
    targetCarbonOffset,
    totalDonationsReceived
  ) => {
    setname(name);
    setcountry(country);
    setdescription(description);
    setimageCID(imageCID);
    setdeadline(deadline);
    setid(id);
    setcarbonOffsetRemoved(carbonOffsetRemoved);
    settargetCarbonOffset(targetCarbonOffset);
    settotalDonationsReceived(totalDonationsReceived);

    console.log("id", id);
  };
  const dateString = new Date(deadline?.toString() * 1000).toLocaleDateString(
    "en-GB"
  );

  async function onaddDonation() {
    setTxPending(true);
    document?.getElementById("my_modal_9")?.showModal();

    let value = await donateToCarbonFootPrintProject(id, amount);
    console.log(value);
    setTxPending(false);
  }

  //pending transaction modal

  return (
    <>
      {footprints?.map((footprint, i) => {
        return (
          <div className=" bg-white dark:bg-darkblack-600 rounded-lg p-6 relative">
            <div className="shrink-0 rounded-full relative ">
              <img
                priority={true}
                src={footprint?.imageCID}
                className="w-full rounded-md h-56"
                alt="Stack Overflow"
              />
            </div>
            <div className="flex space-x-5">
              <div>
                <h3 className="text-2xl text-bgray-900 dark:text-white font-bold">
                  {footprint.name}
                </h3>
                <span className="text-lg text-bgray-600 dark:text-bgray-50">
                  {footprint.country}
                </span>
              </div>
            </div>
            <p className="pt-5 pb-8 text-lg text-bgray-600 dark:text-bgray-50 ">
              {footprint.description}
            </p>

            <button
              aria-label="none"
              onClick={() => {
                setCurrentState(
                  footprint.name,
                  footprint.country,
                  footprint.description,
                  footprint?.imageCID,
                  footprint.deadline,
                  i,
                  footprint.carbonOffsetRemoved,
                  footprint.targetCarbonOffset,
                  footprint.totalDonationsReceived
                );
                document.getElementById("my_modal_1").showModal();
              }}
              className="text-base w-full text-success-300 font-medium h-12 rounded-md border border-success-300 hover:text-white hover:bg-success-300 transition duration-300 ease-in-out"
            >
              Support
            </button>
          </div>
        );
      })}
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box w-11/12 max-w-5xl dark:bg-[#1d1e23]">
          <div className="flex p-2 space-x-5">
            <img src={imageCID} width={500} className="rounded-lg" />
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div>
                  <h3 className="text-2xl text-bgray-900 dark:text-white font-bold">
                    {name}
                  </h3>
                  <span className="text-lg text-bgray-600 dark:text-bgray-50">
                    {description}
                  </span>
                </div>
                <div
                  className="radial-progress dark:text-white"
                  style={{ "--value": 80 }}
                  role="progressbar"
                >
                  80%
                </div>
              </div>
              <p className="pt-5 pb-8 text-lg text-bgray-600 dark:text-bgray-50 ">
                {/* {text} */}
              </p>

              <div className="flex dark:text-white flex-row space-x-7 text-center items-center">
                <span className="flex flex-col items-center ">
                  <span>
                    <IconClock />
                  </span>
                  <p>{dateString}</p>
                  {/* <p>{deadline?.toString()}</p> */}
                </span>
                <span className="flex flex-col items-center ">
                  <span>
                    <IconTargetArrow />
                  </span>
                  <p>
                    {targetCarbonOffset?.toString()} CO<sub>2</sub>e
                  </p>
                </span>
                <span className="flex flex-col items-center ">
                  <IconAtom2Filled />
                  <p>
                    {" "}
                    {totalDonationsReceived?.toString()} CO<sub>2</sub>e
                  </p>
                </span>
                <span className="flex flex-col items-center ">
                  <IconAtom2 />
                  <p>
                    {" "}
                    {Number(targetCarbonOffset?.toString()) -
                      Number(carbonOffsetRemoved?.toString())}{" "}
                    CO<sub>2</sub>e{" "}
                  </p>
                </span>
              </div>
              <div className="flex flex-row justify-between space-x-3 my-3">
                <button
                  onClick={async () => {
                    let value = await donateToCarbonFootPrintProject(id, 1);
                    console.log(value);
                  }}
                  className="rounded-full btn btn-outline btn-info"
                >
                  1 ETH
                </button>
                <button
                  onClick={async () => {
                    let value = await donateToCarbonFootPrintProject(id, 2);
                    console.log(value);
                  }}
                  className="rounded-full btn btn-outline btn-success"
                >
                  2 ETH
                </button>
                <button
                  onClick={async () => {
                    let value = await donateToCarbonFootPrintProject(id, 5);
                  }}
                  className=" rounded-full btn btn-outline btn-warning"
                >
                  5 ETH
                </button>
                <button
                  onClick={async () => {
                    let value = await donateToCarbonFootPrintProject(id, 10);
                    console.log(value);
                  }}
                  className=" rounded-full btn btn-outline btn-error"
                >
                  10 ETH
                </button>
              </div>
              <input
                type="text"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Or Enter amount of units "
                className="rounded-full dark:bg-darkblack-500 dark:text-white input input-bordered input-md w-full"
              />
              <button
                onClick={() => {
                  onaddDonation();
                }}
                className=" btn bg-[#21c55d] mt-4 hover:bg-green-600 text-white rounded-full px-10  py-2 text-lg"
              >
                Support
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
      <dialog id="my_modal_9" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      ;
    </>
  );
}

FootPrint.propTypes = {
  footprint: ProtoTypes.object,
};

export default FootPrint;
