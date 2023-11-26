"use client";
import HeaderOne from "@/component/header/HeaderOne";
import HeaderTwo from "@/component/header/HeaderTwo";
import Overlay from "@/component/overlay";
import Sidebar from "@/component/sidebar";
import ClientSidebar from "@/component/sidebar/Client";
import FR from "@/component/sidebar/FR";
import NGO from "@/component/sidebar/NGO";
import SidebarV2 from "@/component/sidebar/SidebarV2";
import ProtoTypes from "prop-types";

import { useState } from "react";

function Layout({ bg, overlay, children }) {
  const [sidebar, setSidebar] = useState(true);
  const user = true;
  return (
    <div className={`layout-wrapper ${sidebar && "active"}  w-full`}>
      <div className="relative flex w-full">
        {user ? (
          // <Sidebar handleActive={() => setSidebar(!sidebar)} />
          <ClientSidebar handleActive={() => setSidebar(!sidebar)} />
          // <NGO handleActive={() => setSidebar(!sidebar)} />
        ) : (
          // <FR handleActive={() => setSidebar(!sidebar)} />
        )}

        {overlay ? overlay : <Overlay />}
        <SidebarV2 />
        <div
          className={`body-wrapper flex-1 overflow-x-hidden ${
            bg ? bg : "dark:bg-darkblack-500"
          } `}
        >
          <HeaderOne handleSidebar={() => setSidebar(!sidebar)} />
          <HeaderTwo handleSidebar={() => setSidebar(!sidebar)} />
          {children}
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  bg: ProtoTypes.string,
  overlay: ProtoTypes.node,
  children: ProtoTypes.node,
};

export default Layout;
