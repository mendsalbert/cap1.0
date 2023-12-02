"use client";
import ListTab from "@/component/listTab";
import TeamChat from "@/component/teamChat";
import Wallet from "@/component/wallet";
import React, { useEffect, useState } from "react";
import axios from "axios";
function News() {
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
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % newsData.length);
    }, 3600); // Change slide every second
    return () => clearInterval(interval);
  }, [newsData.length]);

  // alert(newsData.length);
  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div
          className="whitespace-nowrap transition-transform duration-500 ease-linear"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {newsData?.map((news, index) => {
            console.log("Image URL:", news?.urlToImage);

            return (
              <div
                key={index}
                className="inline-block w-full h-full"
                style={{ transitionDelay: `${index * 0.2}s` }} // Staggered transition delay for each item
              >
                <div className="flex flex-row items-start space-x-4 p-4 m-2 bg-white text-gray-700 dark:text-white dark:bg-[#1d1e23] rounded-xl shadow-lg ">
                  <div>
                    <img
                      src={news?.urlToImage}
                      width={300}
                      height={300}
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {news?.title?.length > 100
                        ? news?.title.slice(0, 100) + "..."
                        : news?.title}
                    </p>
                    {/* <h2 className="text-lg ">{news?.description}</h2> */}
                    <p className="text-sm ">{news?.source?.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
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
