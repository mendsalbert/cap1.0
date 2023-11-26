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
      <button className="bg-darkblack-600 text-white py-1.5  flex flex-row items-center space-x-2 px-3 rounded-full mb-2">
        <IconCirclePlus />
        <span>Add Donation</span>
      </button>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        {integrations?.map((integration) => (
          <Integration key={integration.id} integration={integration} />
        ))}
      </div>
    </>
  );
}

export default MyWallet;
