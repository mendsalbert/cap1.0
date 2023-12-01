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
function FootPrint({ footprints }) {
  console.log(footprints);
  // const dateString = "";

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
    setimage(imageCID);
    setdeadline(deadline);
    setid(id);
    setcarbonOffsetRemoved(carbonOffsetRemoved);
    settargetCarbonOffset(targetCarbonOffset);
    settotalDonationsReceived(totalDonationsReceived);
  };
  // const { img, title, category, text, status } = footprint;
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
                document.getElementById("my_modal_1").showModal();
                setCurrentState(
                  footprint.name,
                  footprint.country,
                  footprint.description,
                  footprint?.imageCID,
                  footprint.deadline,
                  i + 1,
                  footprint.carbonOffsetRemoved,
                  footprint.targetCarbonOffset,
                  footprint.totalDonationsReceived
                );
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
            <img src="/for.jpeg" width={500} className="rounded-lg" />
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
                  {/* <p>{footprint?.deadline?.toString()}</p> */}
                </span>
                <span className="flex flex-col items-center ">
                  <span>
                    <IconTargetArrow />
                  </span>
                  <p>
                    4,000 CO<sub>2</sub>e
                  </p>
                </span>
                <span className="flex flex-col items-center ">
                  <IconAtom2Filled />
                  <p>
                    {" "}
                    3,000 CO<sub>2</sub>e
                  </p>
                </span>
                <span className="flex flex-col items-center ">
                  <IconAtom2 />
                  <p>
                    {" "}
                    1,000 CO<sub>2</sub>e{" "}
                  </p>
                </span>
              </div>
              <div className="flex flex-row justify-between space-x-3 my-3">
                <button className="rounded-full btn btn-outline btn-info">
                  50 units
                </button>
                <button className="rounded-full btn btn-outline btn-success">
                  100 units
                </button>
                <button className=" rounded-full btn btn-outline btn-warning">
                  200 units
                </button>
                <button className=" rounded-full btn btn-outline btn-error">
                  500 units
                </button>
              </div>
              <input
                type="text"
                placeholder="Or Enter amount of units "
                className="rounded-full dark:bg-darkblack-500 dark:text-white input input-bordered input-md w-full"
              />
              <button className="bg-[#21c55d] mt-4 hover:bg-green-600 text-white rounded-full px-10  py-2 text-lg">
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
    </>
  );
}

FootPrint.propTypes = {
  footprint: ProtoTypes.object,
};

export default FootPrint;
