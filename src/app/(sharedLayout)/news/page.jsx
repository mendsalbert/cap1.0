"use client";

import ListTab from "@/component/listTab";
import TeamChat from "@/component/teamChat";
import Wallet from "@/component/wallet";
import React, { useEffect, useState } from "react";
import axios from "axios";
function News() {
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

  const [newsData, setNewsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: "war",
            apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
            pageSize: 10,
            language: "en",
          },
        });
        setNewsData(response.data.articles);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % newsData.length);
    }, 1200); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  console.log("newsData", newsData);
  console.log("newsData");
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveIndex((current) => (current + 1) % data.length);
  //   }, 1200); // Change slide every second
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div
          className="whitespace-nowrap transition-transform duration-500 ease-linear"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="inline-block w-full h-full"
              style={{ transitionDelay: `${index * 0.2}s` }} // Staggered transition delay for each item
            >
              <div className="flex flex-row items-start space-x-4 p-4 m-2 bg-white text-gray-700 dark:text-white dark:bg-[#1d1e23] rounded-xl shadow-lg ">
                <div>
                  <img
                    src="war.png"
                    width={200}
                    height={200}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <h2 className="text-lg">{item.title}</h2>
                  <p className="text-sm">{item.change}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="2xl:w-70 w-full 2xl:mb-0 mb-6">
        <ListTab pageSize={9} />
      </section>
      {/* <section className="2xl:flex-1 w-full">
        <Wallet />
        <TeamChat />
      </section> */}
    </>
  );
}

export default News;
