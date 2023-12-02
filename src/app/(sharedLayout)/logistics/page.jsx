"use client";
import Logistics from "@/component/logistics/Logistics";
import logistics from "@/data/logistics";
import { IconCirclePlus, IconX } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { addProduct, getAllProducts } from "../../../../utils/ProductC/queries";

function LogisticsComponent() {
  const [name, setname] = useState(null);
  const [description, setdescription] = useState("");
  const [image, setimage] = useState(null);
  const [quantity, setquantity] = useState(null);
  const [products, setproducts] = useState(null);
  const [txPending, setTxPending] = useState(false);

  async function onsubmitHandler() {
    setTxPending(true);
    let value = await addProduct(name, quantity, description, image);
    console.log(value);
    setTxPending(false);
  }

  useEffect(async () => {
    const allProducts = await getAllProducts();
    setproducts(allProducts);
  }, []);

  console.log(products);
  return (
    <>
      {/* must be seen by only NGOs */}
      <button
        onClick={() => document.getElementById("my_modal_4").showModal()}
        className="bg-darkblack-600 text-white py-1.5  flex flex-row items-center space-x-2 px-2 rounded-full mb-2"
      >
        <IconCirclePlus />
        <span>Add Product</span>
      </button>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        {logistics?.map((logistic) => (
          <Logistics key={logistic.id} logistic={logistic} />
        ))}
      </div>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-6/12 max-w-5xl dark:bg-[#1d1e23] dark:text-white">
          <h3 className="font-bold text-lg my-3">
            Fill in the details to add a Product
          </h3>
          {/* name, category */}
          <div className="space-x-4 py-2 flex flex-row">
            <input
              type="text"
              placeholder="Name"
              name={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              className="input input-bordered input-md w-full dark:bg-darkblack-500"
            />
            <input
              type="number"
              placeholder="enter quantity"
              name={quantity}
              onChange={(e) => {
                setquantity(e.target.value);
              }}
              className="input input-bordered input-md w-full  dark:bg-darkblack-500"
            />
          </div>
          {/* target amount - regioin using google map search */}
          {/* file input */}
          <div className="form-control w-full py-2">
            <input
              type="text"
              name={image}
              placeholder="Insert image url"
              onChange={(e) => {
                setimage(e.target.value);
              }}
              className="file-input file-input-bordered w-full  dark:bg-darkblack-500"
            />
          </div>
          {/* description */}
          <textarea
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            placeholder="Enter the description for this product"
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

export default LogisticsComponent;
