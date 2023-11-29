"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Circle,
} from "@react-google-maps/api";

//wallet imports

import merge from "lodash.merge";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const mumbaiApothem = {
  id: 51,
  name: "Mumbai (TestNet)",
  network: "Mumbai Apothem Network (TestNet)",
  nativeCurrency: {
    decimals: 18,
    name: "Mumbai-Network",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-mumbai.maticvigil.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Apothem Explorer",
      url: "https://mumbai.polygonscan.com",
    },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [xdcApothem],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 31.7683, // Latitude of Jerusalem, Israel
  lng: 35.2137,
};

function Home() {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(14);
  const [iconSize, setIconSize] = useState({ width: 30, height: 30 });

  const facilities = [
    {
      id: 1,
      position: { lat: 31.7683, lng: 35.2137 }, // Jerusalem, Israel
      type: "ambulance",
      info: "Request Ambulance",
      icon: "/ambulance.svg",
    },
    {
      id: 2,
      position: { lat: 31.7727, lng: 35.217 }, // Slightly north of Jerusalem
      type: "Water and Food",
      info: "Request for food or water",
      icon: "/droplet-half-2-filled.svg",
    },
    {
      id: 3,
      position: { lat: 31.764, lng: 35.21 }, // Slightly south of Jerusalem
      type: "Medical Equipments",
      info: "Find Medical Equipments (Medicine etc)",
      icon: "/pill.svg",
    },
  ];

  const zones = [
    {
      name: "Dangerous War Zones",
      color: "rgba(255, 0, 0, 0.5)",
      radius: 5000,
    },
    {
      name: "Nearby Facilities",
      color: "rgba(255, 255, 0, 0.5)",
      radius: 3000,
    },
    {
      name: "Safe Zone Areas",
      color: "rgba(0, 255, 0, 0.5)",
      radius: 1000,
    },
  ];

  useEffect(() => {
    const fetchCurrentLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error fetching geolocation: ", error);
          }
        );
      }
    };

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const baseSize = 30;
      const scaleFactor = 1 + (zoomLevel - 14) * 0.1;
      setIconSize({
        width: baseSize * scaleFactor,
        height: baseSize * scaleFactor,
      });
    }
  }, [zoomLevel]);

  const handleActiveMarker = (facility) => {
    setSelectedFacility(facility.id);
  };

  return (
    <>
      <div className="xl:flex-1 ml-8 p-4  bg-white dark:bg-[#1d1e23] rounded-lg w-52 fixed bottom-6 z-10 mb-0 xl:mb-0 ">
        <div className="flex space-x-2 items-end mb-1">
          <div className="w-[80px] h-[22px] rounded-full bg-success-400 flex justify-center items-center">
            <div className="flex space-x-1 items-center">
              <span className="text-white text-xs font-medium">Map Guide</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-bgray-600 dark:text-darkblack-300 mb-7">
          Meaning of the colors{" "}
        </p>
        <div className="flex  flex-col-reverse space-y-2.5">
          <div className="w-full h-[32px] px-2 bg-bgray-100 dark:bg-darkblack-500 rounded-lg flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <div className="w-2 h-2 rounded-full bg-success-300"></div>
              <span className="text-bgray-900 dark:text-white text-sm font-medium">
                Safe zone areas
              </span>
            </div>
          </div>
          <div className="w-full h-[32px] px-2 rounded-lg flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <div className="w-2 h-2 rounded-full bg-warning-300"></div>
              <span className="text-bgray-900 dark:text-white text-sm font-medium">
                Nearby Facilities
              </span>
            </div>
          </div>

          <div className="w-full h-[32px] px-2 rounded-lg flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <div className="w-2 h-2 rounded-full bg-error-300"></div>
              <span className="text-bgray-900 dark:text-white text-sm font-medium">
                Dangerous War Zones{" "}
              </span>
            </div>
          </div>
        </div>
      </div>

      <LoadScript googleMapsApiKey="AIzaSyBBBcC7nb_9zSAjhYJf4Q2-BCZGVO8p26Y">
        <GoogleMap
          mapContainerStyle={containerStyle}
          // center={currentLocation}
          center={center} // Using Israel as the center
          zoom={zoomLevel}
        >
          {zones.map((zone, index) => (
            <Circle
              key={index}
              center={center}
              radius={zone.radius}
              options={{
                fillColor: zone.color,
                fillOpacity: 0.5,
                strokeColor: zone.color,
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          ))}

          {facilities.map((facility, index) => (
            <Marker
              key={index}
              position={facility.position}
              onClick={() => handleActiveMarker(facility)}
              icon={{
                url: facility.icon,
                scaledSize: { width: 40, height: 40 },
                fillColor: "white",
              }}
            >
              {selectedFacility === facility.id && (
                <InfoWindow
                  onCloseClick={() => handleActiveMarker(null)}
                  position={center}
                >
                  <div>
                    <h1>{facility.info}</h1>
                    <div className="flex flex-col items-center">
                      <img src={facility.icon} alt={facility.info} />
                      <span className="bg-green-500 px-3 py-0.5 rounded-lg text-white cursor-pointer">
                        Request
                      </span>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}

          {/* {currentLocation && <Marker position={currentLocation} />} */}
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default Home;
