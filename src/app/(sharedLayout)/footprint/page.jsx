"use client";
import FootPrint from "@/component/footPrint/FootPrint";
import footprints from "@/data/footprint";
import { IconCirclePlus, IconX } from "@tabler/icons-react";
// import { GooglePlacesAutocomplete } from "react-google-autocomplete";
// import ReactGoogleAutocomplete from "react-google-autocomplete";
import { Web3Storage } from "web3.storage";
import { useState, useEffect, useRef } from "react";

function getAccessToken() {
  return "did:key:z4MXj1wBzi9jUstyPWF2NjYShu9qVQbKpWWbdT44ku9MHPu1izqPmgBY2Kscp6N2jrNVZ3yvUexQ7tazTxBDi2MphYbp1WjMHSfRskfmtRQRvev8ErPdj67sRWR1LdjtgBQX4uWEKhFRyoALUxPFBYbfMkDZSjUPHDkXrtEvDqdu8ds9JZccbdsWKHpmbcBQZeTtKybGas8Vt5dBzKMUk3HFKeZz9rZrur27HtGpjkBBiMTvHB6hXy5k8qq3An1aQ9h6XAtpc5JMoqwrp6yVFz94B7vsRz2RKPPhv2RpJT75RyAGFiRMw1hzVW2FKFYSEBfDo6MPpFn7WqmsGWJCUvr6iBCYgfKqtnEEruQid3qya8T6GHqjn
  ";
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

function FootPrintComponent() {
  const [supportimage1, setSupportImage1] = useState(``);
  const [supportimage2, setSupportImage2] = useState(``);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [location, setlocation] = useState({});

  const [name, setname] = useState("");
  const [country, setcountry] = useState("");
  const [description, setdescription] = useState("");
  const [amount, setamount] = useState("");
  const [deadline, setdeadline] = useState("");
  const [txPending, setTxPending] = useState(false);

  const handleSelect = (location) => {
    setSelectedLocation(location);
  };
  const hiddenFileSupport2 = useRef(null);

  const handleClick4 = () => {
    hiddenFileSupport2.current.click();
  };

  async function onsubmitHandler() {
    setTxPending(true);
    let value = await createProject(
      name,
      country,
      description,
      String(location.lat),
      String(location.lng),
      amount,
      deadline,
      supportimage2
    );
    console.log(value);
    setTxPending(false);
  }
  async function handleChange4(event) {
    const supportUploaded2 = event.target.files[0];
    setSupportImage2(URL.createObjectURL(event.target.files[0]));
    const client = makeStorageClient();
    const cid = await client.put([supportUploaded2]);
    console.log("stored files with cid:", cid);

    const res = await client.get(cid);
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    if (!res.ok) {
      throw new Error(
        `failed to get ${cid} - [${res.status}] ${res.statusText}`
      );
    }

    const supports2 = await res.files();
    setSupportImage2(`https://${cid}.ipfs.dweb.link/${supportUploaded2.name}`);
    console.log(supportimage1);
    console.log(supportUploaded2);
    for (const file of supports2) {
      console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
    }
    return cid;
  }

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
              className="input input-bordered input-md w-full dark:bg-darkblack-500"
            />
            <select className="select select-bordered w-full  dark:bg-darkblack-500">
              <option disabled selected>
                War
              </option>
              <option>Food</option>
              <option>Normal Orange</option>
              <option>Normal Tomato</option>
            </select>
          </div>
          {/* target amount - regioin using google map search */}
          <div className="space-x-4 py-2 flex flex-row">
            <input
              type="number"
              placeholder="eg 5TH"
              className="input input-bordered input-md w-full  dark:bg-darkblack-500"
            />
            <select className="select select-bordered w-full  dark:bg-darkblack-500">
              <option disabled selected>
                Isreal
              </option>
              <option>Gaza</option>
              <option>Palenstine</option>
              <option>Normal Tomato</option>
            </select>
          </div>
          {/* file input */}
          <div className="form-control w-full py-2">
            <input
              type="file"
              ref={hiddenFileSupport2}
              onChange={handleChange4}
              accept=".png,.jpg,.jpeg"
              className="file-input file-input-bordered w-full  dark:bg-darkblack-500"
            />
          </div>
          {supportimage2 && (
            <iframe
              className="relative m-auto mb-3"
              src={supportimage2}
              accept=".png,.jpg,.jpeg"
            ></iframe>
          )}
          {/* description */}
          <textarea
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
