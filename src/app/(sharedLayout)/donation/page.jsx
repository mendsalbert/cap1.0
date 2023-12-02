"use client";
import Integration from "@/component/integration/Integration";
import integrations from "@/data/intigration";
import { IconCirclePlus, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import {
  createCampaign,
  getAllCampaigns,
} from "../../../../utils/DonationC/queries";

function MyWallet() {
  const [name, setname] = useState(null);
  const [country, setcountry] = useState(null);
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);
  const [targetAmount, settargetAmount] = useState(null);
  const [campaigns, setcampaigns] = useState([]);

  const [txPending, setTxPending] = useState(false);

  async function onsubmitHandler() {
    setTxPending(true);
    let value = await createCampaign(
      name,
      country,
      description,
      image,
      targetAmount
    );
    setname("");
    setcountry("");
    setdescription("");
    setimage("");
    settargetAmount("");

    console.log(value);
    setTxPending(false);
  }

  const allCampaigns = async () => {
    const allCamps = (await getAllCampaigns()) || [];
    setcampaigns(allCamps);
    // run asynchronous tasks here
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const allCamps = await getAllCampaigns();
        setcampaigns(allCamps);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <>
      <button
        onClick={() => document.getElementById("my_modal_4").showModal()}
        className="bg-darkblack-600 text-white py-1.5  flex flex-row items-center space-x-2 px-2 rounded-full mb-2"
      >
        <IconCirclePlus />
        <span>Add Donation</span>
      </button>
      {/* LIST OF DANTIONS */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        <Integration donations={campaigns} />
      </div>
      {/* LIST OF DONATIONS */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-6/12 max-w-5xl dark:bg-[#1d1e23] dark:text-white">
          <h3 className="font-bold text-lg my-3">
            Fill in the details to add a donation
          </h3>
          <div className="space-x-4 py-2 flex flex-row">
            <input
              type="text"
              placeholder="title"
              name={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              className="input input-bordered input-md w-full dark:bg-darkblack-500"
            />
            <input
              type="text"
              placeholder="country"
              name={country}
              onChange={(e) => {
                setcountry(e.target.value);
              }}
              className="input input-bordered input-md w-full dark:bg-darkblack-500"
            />
          </div>
          <div className="space-x-4 py-2 flex flex-row">
            <input
              type="number"
              placeholder="eg 5TH"
              name={targetAmount}
              onChange={(e) => {
                settargetAmount(e.target.value);
              }}
              className="input input-bordered input-md w-full  dark:bg-darkblack-500"
            />
          </div>
          <div className="form-control w-full py-2">
            <input
              type="text"
              name={image}
              onChange={(e) => {
                setimage(e.target.value);
              }}
              placeholder="Insert image url"
              accept=".png,.jpg,.jpeg"
              className="file-input file-input-bordered w-full  dark:bg-darkblack-500"
            />
          </div>
          <textarea
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            placeholder="Enter the description for this project"
            className="textarea textarea-bordered textarea-lg mt-2 w-full  dark:bg-darkblack-500 "
          ></textarea>
          <button
            onClick={() => {
              onsubmitHandler();
            }}
            className="bg-green-500 hover:bg-green-600 w-full my-2 p-3 rounded-full text-white "
          >
            Upload
          </button>
          <div className="modal-action absolute -top-3 right-4">
            <form method="dialog">
              <button className="">
                <IconX className="dark:text-white " />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default MyWallet;
