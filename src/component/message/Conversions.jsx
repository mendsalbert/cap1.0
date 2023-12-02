"use client";
import uSm from "/public/static/images/message/u-sm.png";
import uSm1 from "/public/static/images/message/u-sm-1.png";
import moe from "/public/static/images/message/moe.png";

import ConversionsHeader from "./ConversionsHeader";
import Conversion from "./Conversion";
import Typing from "./Typing";
import SendMassage from "../forms/SendMassage";
import Profile from "./Profile";
import { useState } from "react";
function Conversions() {
  const [isOpen, toggleSetting] = useState(false);
  return (
    <>
      <div className="2xl:col-span-9 xl:col-span-8 dark:bg-darkblack-500 lg:col-span-7 col-span-12 relative">
        <ConversionsHeader toggleSetting={() => toggleSetting(!isOpen)} />
        <div className="lg:pt-20 dark:bg-darkblack-500 lg:px-3 p-5 mb-5 lg:mb-0 space-y-10">
          <Conversion img={moe} text="How may I assist you today?" />
        </div>
        <SendMassage />
      </div>
      <Profile isOpen={isOpen} close={() => toggleSetting(!isOpen)} />
    </>
  );
}

export default Conversions;
