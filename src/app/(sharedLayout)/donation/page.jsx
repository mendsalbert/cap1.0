"use client";
import Integration from "@/component/integration/Integration";
import integrations from "@/data/intigration";
import { IconCirclePlus, IconX } from "@tabler/icons-react";
function MyWallet() {
  return (
    <>
      {/* <section className="2xl:w-[424px]">
        <AddBalance />
        <Wallet />
      </section> */}
      {/* TODO: this must be showend to the admin alone */}
      <button
        onClick={() => document.getElementById("my_modal_4").showModal()}
        className="bg-darkblack-600 text-white py-1.5  flex flex-row items-center space-x-2 px-2 rounded-full mb-2"
      >
        <IconCirclePlus />
        <span>Add Donation</span>
      </button>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        {integrations?.map((integration) => (
          <Integration key={integration.id} integration={integration} />
        ))}
      </div>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-6/12 max-w-5xl dark:bg-[#1d1e23] dark:text-white">
          <h3 className="font-bold text-lg">
            Fill in the details to add a donation
          </h3>
          {/* name, category */}
          <div className="space-x-4 py-2 flex flex-row">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-md w-full"
            />
            <select className="select select-bordered w-full">
              <option disabled selected>
                Normal
              </option>
              <option>Normal Apple</option>
              <option>Normal Orange</option>
              <option>Normal Tomato</option>
            </select>
          </div>
          {/* target amount - regioin using google map search */}
          <div className="space-x-4 py-2 flex flex-row">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-md w-full"
            />
            <select className="select select-bordered w-full">
              <option disabled selected>
                Normal
              </option>
              <option>Normal Apple</option>
              <option>Normal Orange</option>
              <option>Normal Tomato</option>
            </select>
          </div>
          {/* file input */}
          {/* description */}
          <textarea
            placeholder="Bio"
            className="textarea textarea-bordered textarea-lg mt-2 w-full "
          ></textarea>

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

export default MyWallet;
