import ListTab from "@/component/listTab";
import Wallet from "@/component/wallet";
import Calender from "@/component/calender";
import Efficiency from "@/component/revenueFlow/Efficiency";
import SummaryV2 from "@/component/summary/SummaryV2";
import LocationV2 from "@/component/location";
import TaskSummary from "@/component/summary/TaskSummary";

function Statistics() {
  return (
    <>
      <section className="2xl:flex-1 2xl:mb-0 mb-6">
        <button className="bg-[#21c55d] mt-4 hover:bg-green-600 text-white rounded-full px-10  py-2 text-lg">
          Buy Carbon
        </button>
        <div className="w-full mb-[24px] xl:flex xl:space-x-[24px]">
          <SummaryV2 />
          <Efficiency height="h-[180px]" />
        </div>
        <div className="w-full mb-[24px] flex space-x-[24px]">
          <LocationV2 />
          <TaskSummary />
        </div>
      </section>
    </>
  );
}

export default Statistics;
