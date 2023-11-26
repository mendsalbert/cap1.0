"use client";
import Logistics from "@/component/logistics/Logistics";
import logistics from "@/data/logistics";
import { IconCirclePlus, IconX } from "@tabler/icons-react";

function LogisticsComponent() {
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
    </>
  );
}

export default LogisticsComponent;
