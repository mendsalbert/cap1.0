"use client";
import Logistics from "@/component/logistics/Logistics";
import logistics from "@/data/logistics";
import { IconCirclePlus, IconX } from "@tabler/icons-react";

function LogisticsComponent() {
  return (
    <>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-4 xl:gap-6">
        {logistics?.map((logistic) => (
          <Logistics key={logistic.id} logistic={logistic} />
        ))}
      </div>
    </>
  );
}

export default LogisticsComponent;
