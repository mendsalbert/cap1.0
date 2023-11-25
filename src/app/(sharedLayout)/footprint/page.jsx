import ListTab from "@/component/listTab";
import Wallet from "@/component/wallet";
import AddBalance from "@/component/addBalance/AddBalance";
import SummaryV3 from "@/component/summary/SummaryV3";
import EfficiencyV2 from "@/component/revenueFlow/EfficiencyV2";
import Integration from "@/component/integration/Integration";
import FootPrint from "@/component/footPrint/FootPrint";
import integrations from "@/data/intigration";
import footprints from "@/data/footprint";

function FootPrintComponent() {
  return (
    <>
      {/* <section className="2xl:w-[424px]">
        <AddBalance />
        <Wallet />
      </section> */}
      <p></p>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        {footprints?.map((footprint) => (
          <FootPrint key={footprint.id} footprint={footprint} />
        ))}
      </div>
    </>
  );
}

export default FootPrintComponent;
