import ListTab from "@/component/listTab";
import Wallet from "@/component/wallet";
import AddBalance from "@/component/addBalance/AddBalance";
import SummaryV3 from "@/component/summary/SummaryV3";
import EfficiencyV2 from "@/component/revenueFlow/EfficiencyV2";
import Integration from "@/component/integration/Integration";
import integrations from "@/data/intigration";
function MyWallet() {
  return (
    <>
      {/* <section className="2xl:w-[424px]">
        <AddBalance />
        <Wallet />
      </section> */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        {integrations?.map((integration) => (
          <Integration key={integration.id} integration={integration} />
        ))}
      </div>
    </>
  );
}

export default MyWallet;
