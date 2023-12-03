"use client";
import ListTab from "@/component/listTab";
import TeamChat from "@/component/teamChat";
import Wallet from "@/component/wallet";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
function News() {
  const [newsData, setNewsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: "war",
            apiKey: "c7a7c8720b7945039ff620cbf0ffe973",
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
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % newsData.length);
    }, 3600); // Change slide every second
    return () => clearInterval(interval);
  }, [newsData.length]);

  console.log(newsData);

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
                    <div className="max-w-2xl">
                      <p className="text-2xl font-bold truncate ">
                        {news?.title}
                      </p>
                    </div>
                    <div className="max-w-2xl">
                      <h2 className="text-lg truncate ">{news?.description}</h2>
                    </div>
                    <p className="text-sm ">{news?.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <section className="2xl:w-70 w-full 2xl:mb-0 mb-6">
        {/* <ListTab pageSize={9} newsData={newsData} /> */}
        {
          //publishedAt,author,url
        }
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <tbody>
              {/* row 1 */}
              {newsData.map((news, index) => (
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-24 h-24">
                          <img
                            src={news?.urlToImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        {/* <div className="font-bold">Hart Hagerty</div> */}
                        <div className="max-w-sm">
                          <h2 className="text-lg truncate ">
                            {news?.description}
                          </h2>
                        </div>
                        <div className="text-sm opacity-50">
                          {news?.source?.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-sm">
                      {news.author}
                    </span>
                  </td>
                  <td>{news.publishedAt}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      <Link href={news.url}>Link</Link>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </section>
      {/* <section className="2xl:flex-1 w-full">
        <Wallet />
        <TeamChat />
      </section> */}
    </>
  );
}

export default News;
