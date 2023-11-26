import ListTab from "@/component/listTab";
import Wallet from "@/component/wallet";
import AddBalance from "@/component/addBalance/AddBalance";
import SummaryV3 from "@/component/summary/SummaryV3";
import EfficiencyV2 from "@/component/revenueFlow/EfficiencyV2";
import Integration from "@/component/integration/Integration";
import integrations from "@/data/intigration";
import { IconCirclePlus } from "@tabler/icons-react";
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
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default MyWallet;
