"use client";

import ListTab from "@/component/listTab";
import TaskTab from "@/component/listTab/TaskTab";

import TeamChat from "@/component/teamChat";
import Wallet from "@/component/wallet";
import React, { useEffect, useState } from "react";
function Task() {
  const data = [
    {
      title: "Total Earnings",
      value: "$Issue happening in Gaza is getting serious 1",
      change:
        "+3.5% from last week dont mind this one. dont mind this one. dont mind this one. dont mind this one. dont mind this one too",
    },
    {
      title: "Total Spending",
      value: "Issue happening in Gaza is getting serious 2",
      change:
        "+3.5% from last week dont mind this one. dont mind this one. dont mind this one. dont mind this one. dont mind this one too",
    },
    {
      title: "Spending Goal",
      value: "Issue happening in Gaza is getting serious 3",
      change:
        "+3.5% from last week dont mind this one. dont mind this one. dont mind this one. dont mind this one. dont mind this one too",
    },
    {
      title: "Spending Goal",
      value: "Issue happening in Gaza is getting serious 4",
      change:
        "+3.5% from last week dont mind this one. dont mind this one. dont mind this one. dont mind this one. dont mind this one too",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % data.length);
    }, 1200); // Change slide every second
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="2xl:w-70 w-full 2xl:mb-0 mb-6">
        {/* <h1 className="text-lg py-2 font-bold">(faseffd)</h1> */}
        <button className="btn mb-3 mt-2 bg-black text-white">
          Task
          <div className="badge">+44</div>
        </button>

        {/* <ListTab pageSize={9} /> */}
        <TaskTab pageSize={9} />
      </section>
      {/* <section className="2xl:flex-1 w-full">
        <Wallet />
        <TeamChat />
      </section> */}
    </>
  );
}

export default Task;
