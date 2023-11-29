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

//wallet imports
import merge from "lodash.merge";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  createConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { createPublicClient, http } from "viem";

const mumbaiApothem = {
  id: 80001,
  name: "Mumbai (TestNet)",
  network: "Mumbai Apothem Network (TestNet)",
  nativeCurrency: {
    decimals: 18,
    name: "Mumbai-Network",
    symbol: "MATIC",
  },

  rpcUrls: {
    public: { http: ["https://rpc-mumbai.maticvigil.com"] },
    default: { http: ["https://rpc-mumbai.maticvigil.com"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Matic Explorer",
      url: "https://mumbai.polygonscan.com",
    },
    default: { name: "Matic Explorer", url: "https://mumbai.polygonscan.com" },
  },
  testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mumbaiApothem],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "CAP",
  chains,
  projectId: 21,
});

const wagmiClient = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: connectors,
});

/

const myTheme = merge(midnightTheme(), {
  colors: {
    accentColor: "#21c55d",
    accentColorForeground: "#21c55d",
  },
});

function Layout({ bg, overlay, children }) {
  const [sidebar, setSidebar] = useState(true);
  const user = true;
  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <div className={`layout-wrapper ${sidebar && "active"}  w-full`}>
          <div className="relative flex w-full">
            {user ? (
              // <ClientSidebar handleActive={() => setSidebar(!sidebar)} />
              <NGO handleActive={() => setSidebar(!sidebar)} />
            ) : (
              // <FR handleActive={() => setSidebar(!sidebar)} />
              <Sidebar handleActive={() => setSidebar(!sidebar)} />
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
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

Layout.propTypes = {
  bg: ProtoTypes.string,
  overlay: ProtoTypes.node,
  children: ProtoTypes.node,
};

export default Layout;
