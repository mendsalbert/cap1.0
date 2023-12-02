"use client";
import {
  IconCash,
  IconTargetArrow,
  IconUser,
  IconWorld,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import ProtoTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  getCampaign,
  donateToCampaign,
} from "../../../utils/DonationC/queries";
import axios from "axios";

function Integration({ donations }) {
  const [name, setname] = useState(null);
  const [country, setcountry] = useState(null);
  const [description, setdescription] = useState(null);
  const [imageCID, setimageCID] = useState(null);
  const [id, setid] = useState(null);
  const [target, settarget] = useState(null);
  const [amountRecieved, setamountRecieved] = useState(null);
  const [txPending, setTxPending] = useState(false);
  const [amount, setAmount] = useState();

  const [ethToUsdRate, setEthToUsdRate] = useState(null);
  useEffect(() => {
    const fetchEthToUsdRate = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );
        setEthToUsdRate(response.data.ethereum.usd);
      } catch (error) {
        console.error("Error fetching ETH to USD rate: ", error);
      }
    };

    fetchEthToUsdRate();
  }, []);
  console.log("ethToUsdRate", ethToUsdRate);

  const weiToUsd = (wei) => {
    console.log("ethToUsdRate", ethToUsdRate);
    if (!ethToUsdRate) return 0;
    const ether = wei / 1e18;
    return (ether * ethToUsdRate).toFixed(2);
  };

  const setCurrentState = (
    name,
    country,
    description,
    imageCID,
    id,
    target,
    recieved
  ) => {
    setname(name);
    setcountry(country);
    setdescription(description);
    setimageCID(imageCID);
    setid(id);
    settarget(target);
    setamountRecieved(recieved);
    console.log("id", id);
  };

  useEffect(async () => {
    const donation = await getCampaign(0);
    // setcampaigns(allCamps);
    console.log("donation", donation);
  }, []);

  async function onaddDonation() {
    setTxPending(true);
    document?.getElementById("my_modal_9")?.showModal();
    let value = await donateToCampaign(id, amount);
    console.log(value);
    setTxPending(false);
  }

  console.log(amountRecieved?.toString());
  return (
    <>
      {donations?.map((donation, index) => {
        return (
          <div className=" bg-white dark:bg-darkblack-600 rounded-lg p-6 relative">
            <div className="shrink-0 rounded-full relative">
              <span className="bg-white bottom-3 left-2 text-sm absolute rounded-xl py-[1px] px-3 shadow-md">
                <span className="flex flex-row items-center">
                  <IconWorld size={18} />
                  {donation?.country}
                </span>
              </span>
              <img
                priority={true}
                src={donation?.imageCID}
                className="w-full rounded-md"
                alt="Stack Overflow"
              />
            </div>
            <div className="flex space-x-5">
              <div>
                <h3 className="text-2xl text-bgray-900 dark:text-white font-bold">
                  {donation.name}
                </h3>
                <span className="text-lg text-bgray-600 dark:text-bgray-50">
                  {donation.country}
                </span>
              </div>
            </div>
            <p className="pt-5 pb-8 text-lg text-bgray-600 dark:text-bgray-50 ">
              {donation.description}
            </p>

            <button
              aria-label="none"
              onClick={() => {
                setCurrentState(
                  donation.name,
                  donation.country,
                  donation.description,
                  donation?.imageCID,
                  index,
                  donation.targetAmount,
                  donation.totalDonationsReceived
                );
                document.getElementById("my_modal_1").showModal();
              }}
              className="text-base w-full text-success-300 font-medium h-12 rounded-md border border-success-300 hover:text-white hover:bg-success-300 transition duration-300 ease-in-out"
            >
              Donate
            </button>
          </div>
        );
      })}

      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box w-11/12 max-w-5xl dark:bg-[#1d1e23] relative">
          <div className="flex p-2 space-x-5">
            <img src={imageCID} width={500} className="rounded-lg" />
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div>
                  <h3 className="text-2xl text-bgray-900 dark:text-white font-bold">
                    {name}
                  </h3>
                  <span className="text-lg text-bgray-600 dark:text-bgray-50">
                    {country}
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
                {description}
              </p>

              <div className="flex dark:text-white flex-row space-x-7 text-center items-center">
                {/* <span className="text-center">
                  <span>
                    <IconUser />
                  </span>
                  <p>102K</p>
                </span> */}
                <span className="flex flex-col items-center ">
                  <span>
                    <IconTargetArrow />
                  </span>
                  {/* <p>${target?.toString()}</p> */}
                  <p>${weiToUsd(target?.toString())}</p>
                </span>
                <span className="flex flex-col items-center ">
                  <IconCash />
                  <p>${weiToUsd(amountRecieved?.toString())}</p>
                </span>
                <span className="flex flex-col items-center ">
                  <IconCash />
                  <p>
                    {" "}
                    $
                    {weiToUsd(target?.toString()) -
                      weiToUsd(amountRecieved?.toString())}
                  </p>
                </span>
              </div>
              <div className="flex flex-row justify-between space-x-3 my-3">
                <button className="rounded-full btn btn-outline btn-info">
                  $5.00
                </button>
                <button className="rounded-full btn btn-outline btn-success">
                  $15.00
                </button>
                <button className=" rounded-full btn btn-outline btn-warning">
                  $20.00
                </button>
                <button className=" rounded-full btn btn-outline btn-error">
                  $50.00
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter amount to donate"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="rounded-full dark:bg-darkblack-500 dark:text-white input input-bordered input-md w-full"
              />
              <button
                onClick={() => {
                  onaddDonation();
                }}
                className="bg-[#21c55d] mt-4 hover:bg-green-600 text-white rounded-full px-10  py-2 text-lg"
              >
                Donate
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

Integration.propTypes = {
  integration: ProtoTypes.object,
};

export default Integration;
