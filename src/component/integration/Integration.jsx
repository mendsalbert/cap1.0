"use client";
import { IconCash, IconTargetArrow, IconUser } from "@tabler/icons-react";
import Image from "next/image";
import ProtoTypes from "prop-types";

function Integration({ integration }) {
  const { img, title, category, text, status } = integration;
  return (
    <>
      <div className=" bg-white dark:bg-darkblack-600 rounded-lg p-6 relative">
        <div className="shrink-0 rounded-full relative">
          <span className="bg-white bottom-3 left-2 text-sm absolute rounded-xl py-[1px] px-3 shadow-md">
            <span className="flex flex-row">
              <IconUser size={18} />
              20K
            </span>
          </span>
          <img
            priority={true}
            src={img.src}
            className="w-full rounded-md"
            alt="Stack Overflow"
          />
        </div>
        <div className="flex space-x-5">
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

        <button
          aria-label="none"
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="text-base w-full text-success-300 font-medium h-12 rounded-md border border-success-300 hover:text-white hover:bg-success-300 transition duration-300 ease-in-out"
        >
          Donate
        </button>
      </div>

      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box w-11/12 max-w-5xl dark:bg-[#1d1e23] relative">
          <div className="flex  space-x-3">
            <img src="/war2.png" width={500} className="rounded-lg" />
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
                <div
                  className="radial-progress"
                  style={{ "--value": 80 }}
                  role="progressbar"
                >
                  80%
                </div>
              </div>
              <p className="pt-5 pb-8 text-lg text-bgray-600 dark:text-bgray-50 ">
                {text}
              </p>

              <div className="flex flex-row space-x-7 text-center items-center">
                <span className="text-center">
                  <span>
                    <IconUser />
                  </span>
                  <p>102K</p>
                </span>
                <span className="flex flex-col items-center ">
                  <span>
                    <IconTargetArrow />
                  </span>
                  <p>$50,000</p>
                </span>
                <span className="flex flex-col items-center ">
                  <IconCash />
                  <p>$17,000</p>
                </span>
                <span className="flex flex-col items-center ">
                  <IconCash />
                  <p>$23,000</p>
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
                <input
                  type="text"
                  placeholder="Enter amount"
                  className="rounded-full input input-bordered input-md w-full max-w-xs"
                />
              </div>

              <button className="bg-[#21c55d] mt-4 hover:bg-green-600 text-white rounded-full px-10  py-2 text-lg">
                Donate
              </button>
            </div>
          </div>
          <div className="modal-action absolute top-0">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn  bg-error-200">Close</button>
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
