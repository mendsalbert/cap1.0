"use client";
import FootPrint from "@/component/footPrint/FootPrint";
import footprints from "@/data/footprint";
import { IconCirclePlus, IconX } from "@tabler/icons-react";
// import { GooglePlacesAutocomplete } from "react-google-autocomplete";
// import ReactGoogleAutocomplete from "react-google-autocomplete";
import { useState, useEffect, useRef } from "react";

import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_PROJECT_KEY;
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

function FootPrintComponent() {
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });

  async function handleChange4(event) {
    console.log("====", event);
    event.preventDefault();
    const form = event.target;
    const files = form[0].files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await ipfs.add(file);

    setUploadedImages([
      ...uploadedImages,
      {
        cid: result.cid,
        path: result.path,
      },
    ]);

    form.reset();
  }
  const [uploadedImages, setUploadedImages] = useState([]);
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
          {uploadedImages.map((image, index) => (
            <>
              <img
                className="image"
                alt={`Uploaded #${index + 1}`}
                src={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}
                style={{ maxWidth: "400px", margin: "15px" }}
                key={image.cid.toString() + index}
              />
              <h4>Link to IPFS:</h4>
              <a href={"https://skywalker.infura-ipfs.io/ipfs/" + image.path}>
                <h3>{"https://skywalker.infura-ipfs.io/ipfs/" + image.path}</h3>
              </a>
            </>
          ))}
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
