"use client";
import {
  IconAtom,
  IconAtom2,
  IconAtom2Filled,
  IconCash,
  IconTargetArrow,
  IconUser,
} from "@tabler/icons-react";
import Image from "next/image";
import ProtoTypes from "prop-types";

function FootPrint({ footprint }) {
  const { img, title, category, text, status } = footprint;
  return (
    <>
      <div className=" bg-white dark:bg-darkblack-600 rounded-lg p-6 relative">
        <div className="shrink-0 rounded-full relative">
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
          Support
        </button>
      </div>

      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box w-11/12 max-w-5xl dark:bg-[#1d1e23]">
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          {/* <p className="py-4">
            Press ESC key or click the button below to close
          </p> */}
          <div className="flex  space-x-3">
            <img src="/for.jpeg" width={500} className="rounded-lg" />
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
                  50.00 units
                </button>
                <button className="rounded-full btn btn-outline btn-success">
                  100.00 units
                </button>
                <button className=" rounded-full btn btn-outline btn-warning">
                  200.00 units
                </button>
                <button className=" rounded-full btn btn-outline btn-error">
                  500.00 units
                </button>
              </div>
              <input
                type="text"
                placeholder="Or Enter amount of units "
                className="rounded-full input input-bordered input-md w-full "
              />
              <button className="bg-[#21c55d] mt-4 hover:bg-green-600 text-white rounded-full px-10  py-2 text-lg">
                Support
              </button>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              {/* <button className="btn">Close</button> */}
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