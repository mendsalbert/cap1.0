"use client";
import Files from "@/component/Files";
import FootPrint from "@/component/footPrint/FootPrint";
import footprints from "@/data/footprint";
import { IconCirclePlus, IconX } from "@tabler/icons-react";
// import { GooglePlacesAutocomplete } from "react-google-autocomplete";
// import ReactGoogleAutocomplete from "react-google-autocomplete";
import { useState, useEffect, useRef } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function FootPrintComponent() {
  const [value, setValue] = useState(null);
  const [title, settitle] = useState(null);
  const [country, setcountry] = useState(null);
  const [image, setimage] = useState(null);
  const [description, setdescription] = useState("");
  const [deadline, setdeadline] = useState("");
  const [amount, setamount] = useState("");

  // console.log("location", value.label);

  return (
    <>
      {/* TODO: this must be showend to the admin alone */}
      <button
        onClick={() => document.getElementById("my_modal_4").showModal()}
        className="bg-darkblack-600 text-white py-1.5  flex flex-row items-center space-x-2 px-2 rounded-full mb-2"
      >
        <IconCirclePlus />
        <span>Add Campaign</span>
      </button>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        {footprints?.map((footprint) => (
          <FootPrint key={footprint.id} footprint={footprint} />
        ))}
      </div>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-6/12 max-w-5xl dark:bg-[#1d1e23] dark:text-white">
          <h3 className="font-bold text-lg my-3">
            Fill in the details to add a campaign
          </h3>
          {/* name, category */}
          <div className="space-x-4 py-2 flex flex-row">
            <input
              type="text"
              placeholder="Name"
              name={title}
              onChange={(e) => {
                settitle(e.target.value);
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
          {/* target amount - regioin using google map search */}
          <div className="space-x-4 py-2 flex flex-row">
            <input
              type="number"
              name={amount}
              onChange={(e) => {
                setamount(e.target.value);
              }}
              placeholder="Targeted carbon offset 10 CO2e"
              className="input input-bordered input-md w-11/12  dark:bg-darkblack-500"
            />
            <div className="w-full">
              <GooglePlacesAutocomplete
                apiKey="AIzaSyBfkyKitodTym6Q7oMEWgHAEDP9FuLrP8k"
                selectProps={{
                  value,
                  onChange: setValue,
                }}
              />
            </div>
          </div>
          {/* file input */}
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
          <button className="bg-green-500 hover:bg-green-600 w-full my-2 p-3 rounded-full text-white ">
            Upload
          </button>
          {/* add */}
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

export default FootPrintComponent;
