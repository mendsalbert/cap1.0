"use client";
import FootPrint from "@/component/footPrint/FootPrint";
import footprints from "@/data/footprint";
import { IconCirclePlus, IconX } from "@tabler/icons-react";
// import { GooglePlacesAutocomplete } from "react-google-autocomplete";
// import ReactGoogleAutocomplete from "react-google-autocomplete";
import { Web3Storage } from "web3.storage";
import { useState, useEffect, useRef } from "react";
import { create } from "@web3-storage/w3up-client";

async function setupWeb3Storage() {
  try {
    const client = await create();
    const space = await client.createSpace("cap");
    const myAccount = await client.login("mendsalbert@gmail.com");

    let res;
    do {
      res = await myAccount.plan.get();
      if (!res.ok) {
        console.log("Waiting for payment plan to be selected...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    } while (!res.ok);

    await myAccount.provision(space.did());
    await space.createRecovery(myAccount.did());
    await space.save();
    await client.setCurrentSpace(space.did());
    console.log("Web3.Storage setup complete.");

    return { client, space, myAccount }; // Return these if you need to use them after setup
  } catch (error) {
    console.error("Error setting up Web3.Storage:", error);
    throw error;
  }
}

function getAccessToken() {
  return "Y6Jlcm9vdHOC2CpYJQABcRIgsQ8uLnlxCE7wwIPywgaasa2l8bvRlMxZW2eorsuSRI_YKlglAAFxEiB2ReFC1egJIwmcfuXX8L9UxIbGwmiuB7MnES01g3Bdm2d2ZXJzaW9uAaYFAXESILEPLi55cQhO8MCD8sIGmrGtpfG70ZTMWVtnqK7LkkSPqGFzRICgAwBhdmUwLjkuMWNhdHSHomNjYW5nc3BhY2UvKmR3aXRoZnVjYW46KqJjY2FuZ3N0b3JlLypkd2l0aGZ1Y2FuOiqiY2Nhbmxwcm92aWRlci9hZGRkd2l0aGZ1Y2FuOiqiY2Nhbmh1cGxvYWQvKmR3aXRoZnVjYW46KqJjY2FuZnVjYW4vKmR3aXRoZnVjYW46KqJjY2FuZnBsYW4vKmR3aXRoZnVjYW46KqJjY2FuZnczdXAvKmR3aXRoZnVjYW46KmNhdWRZARCFJDCCAQoCggEBALhPb8dTggBjWaaZHuQtkkzm4Vn2Y8aWZCUrHTjjw8AkGO1Pbi8CpUMpOPWVlhoZsJ-5rt0H_sd6WL_HJ5GwstVn657ZBQSNvznRDjJY34Mw6urWVsBrRUQs-Zbd9-Ikz1VOYVHyYcqrm4yVuBuk1UuSqzReXckJq0ZCQz2hJF0-R1GwgrhqOkc6-oeM7cDnUKBsqzXBWXeAAR3_sCnHj9oSouvCUHlrVSwHMnLF3VIRoQly9ZDSOOY8Ie7xP7alpOCpfJQfXyPtZIhW0kK9KtulhHb8BvDvuXTpd34AJ2sCcYZlkseOLRLEoLCvmY_-VEtlXhRNxhnuEbPJ9fVtQsECAwEAAWNleHD2Y2ZjdIGibmFjY2Vzcy9jb25maXJt2CpYJQABcRIgkUSAnJ2VJ6wh60x6j8FITkEosrmqOXXTq8soeN0a51NuYWNjZXNzL3JlcXVlc3TYKlglAAFxEiD1TC0Ns20jRVLDISXtk63LuOQCCMbEaKtkUxbxVLHTNGNpc3NYHp0abWFpbHRvOmdtYWlsLmNvbTptZW5kc2FsYmVydGNwcmaAhgUBcRIgdkXhQtXoCSMJnH7l1_C_VMSGxsJorgezJxEtNYNwXZuoYXNYRO2hA0B0Pk9kdBxExW06zVSsVy2LiA86cFgGCjfZi9Q6RNQf-SSnSQk5sY3l0fKy0jDXxQYlWotLQLIgw2B55S7dzG4MYXZlMC45LjFjYXR0gaNibmKhZXByb29m2CpYJQABcRIgsQ8uLnlxCE7wwIPywgaasa2l8bvRlMxZW2eorsuSRI9jY2Fua3VjYW4vYXR0ZXN0ZHdpdGh0ZGlkOndlYjp3ZWIzLnN0b3JhZ2VjYXVkWQEQhSQwggEKAoIBAQC4T2_HU4IAY1mmmR7kLZJM5uFZ9mPGlmQlKx0448PAJBjtT24vAqVDKTj1lZYaGbCfua7dB_7Heli_xyeRsLLVZ-ue2QUEjb850Q4yWN-DMOrq1lbAa0VELPmW3ffiJM9VTmFR8mHKq5uMlbgbpNVLkqs0Xl3JCatGQkM9oSRdPkdRsIK4ajpHOvqHjO3A51CgbKs1wVl3gAEd_7Apx4_aEqLrwlB5a1UsBzJyxd1SEaEJcvWQ0jjmPCHu8T-2paTgqXyUH18j7WSIVtJCvSrbpYR2_Abw77l06Xd-ACdrAnGGZZLHji0SxKCwr5mP_lRLZV4UTcYZ7hGzyfX1bULBAgMBAAFjZXhw9mNmY3SBom5hY2Nlc3MvY29uZmlybdgqWCUAAXESIJFEgJydlSesIetMeo_BSE5BKLK5qjl106vLKHjdGudTbmFjY2Vzcy9yZXF1ZXN02CpYJQABcRIg9UwtDbNtI0VSwyEl7ZOty7jkAgjGxGirZFMW8VSx0zRjaXNzUp0ad2ViOndlYjMuc3RvcmFnZWNwcmaA";
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

  useEffect(() => {
    // Call the setup function when the component mounts
    setupWeb3Storage()
      .then(({ client, space, myAccount }) => {
        console.log(client);
        // Do something with client, space, and myAccount if needed
      })
      .catch((error) => {
        console.log(error);
        // Handle any setup errors
      });
  }, []);
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
