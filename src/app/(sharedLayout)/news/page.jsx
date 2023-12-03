"use client";
import ListTab from "@/component/listTab";
import TeamChat from "@/component/teamChat";
import Wallet from "@/component/wallet";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
function News() {
  // const [newsData, setNewsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const newsData = [
    {
      author: "Karissa Bell",
      title:
        "TikTok says it's removed millions of fake accounts since start of Israel-Hamas war",
      description:
        "TikTok is pushing back on critics who claim the video app is falling short in its content moderation duties amid the Israel-Hamas war. In a statement, the company offered new details about the number of accounts and videos it has taken down since the October …",
      publishedAt: "2023-11-16T12:55:34Z",
      source: {
        name: "BBC News",
      },
      url: "https://www.bbc.co.uk/news/world-europe-67437171",
      urlToImage:
        "https://ichef.bbci.co.uk/news/1024/branded_news/10EAD/production/_131739296_35fc629f0b6c949da5edb37aa92c5e0d3418d717.jpg",
    },
    {
      author: "Will Knight",
      title:
        "The US and 30 Other Nations Agree to Set Guardrails for Military AI",
      description:
        "The tech-centric war in Ukraine and the success of ChatGPT have prompted new interest in figuring out how to prevent military AI from going awry.",
      publishedAt: "2023-11-08T18:37:18Z",
      source: {
        name: "Wired",
      },
      url: "https://www.wired.com/story/the-us-and-30-other-nations-agree-to-set-guardrails-for-military-ai/",
      urlToImage:
        "https://media.wired.com/photos/654ae8c1428f34179e6b33c2/191:100/w_1280,c_limit/Military-AI-Guardrails-Business-1757360709.jpg",
    },
    {
      author: "Matt Burgess, Lily Hay Newman",
      title:
        "Internet Blackouts in Gaza Are a New Weapon in the Israel-Hamas War",
      description:
        "Israel has said it’s prepared to disrupt internet service in Gaza, signaling a new age of warfare. In the past two weeks, the Palestinian territory has already suffered three communications shutdowns.",
      publishedAt: "2023-11-07T18:41:31Z",
      source: {
        name: "Wired",
      },
      url: "https://www.wired.com/story/israel-gaza-internet-blackouts-weapon/",
      urlToImage:
        "https://media.wired.com/photos/6549a751ffe219707629bcb0/191:100/w_1280,c_limit/Communication-Towers-Gaza-Security-1749945926.jpg",
    },
    {
      author: "https://www.facebook.com/bbcnews",
      title: "US warns Israel against reoccupying Gaza after war",
      description:
        "Secretary of State Antony Blinken says Gaza and the West Bank should be united under the Palestinian Authority.",
      publishedAt: "2023-11-08T12:26:55Z",
      source: {
        name: "BBC News",
      },
      url: "https://www.bbc.co.uk/news/world-middle-east-67355319",
      urlToImage:
        "https://ichef.bbci.co.uk/news/1024/branded_news/27D2/production/_131649101_2a09ea638fdadeaf0afda720a5a6f9b583189af0.jpg",
    },
    {
      author: "https://www.facebook.com/bbcnews",
      title: "Ukraine war: The Russians fighting for a Ukrainian passport",
      description:
        "Russians in Ukraine say they can't work, use services or get bank accounts due to their nationality.",
      publishedAt: "2023-11-20T06:02:07Z",
      source: {
        name: "BBC News",
      },
      url: "https://www.bbc.co.uk/news/world-europe-67099716",
      urlToImage:
        "https://ichef.bbci.co.uk/news/1024/branded_news/13183/production/_131411287_photo04.10.2023124731.jpg",
    },
    {
      author: "https://www.facebook.com/bbcnews",
      title:
        "Ukraine war: Locals forced to take Russian passports, report says",
      description:
        "Ukrainians in occupied territories are being forced to take Russian citizenship, a report finds.",
      publishedAt: "2023-11-16T05:09:00Z",
      source: {
        name: "BBC News",
      },
      url: "https://www.bbc.co.uk/news/world-europe-67427840",
      urlToImage:
        "https://ichef.bbci.co.uk/news/1024/branded_news/15467/production/_131734178_kherson_passport_getty.jpg",
    },
    {
      author: "https://www.facebook.com/bbcnews",
      title: "'Her life is painkillers' - The Gaza children ravaged by war",
      description:
        "More than 26,000 Gazans have been wounded since war erupted, many of them left with life-changing injuries.",
      publishedAt: "2023-11-10T15:18:30Z",
      source: {
        name: "BBC News",
      },
      url: "https://www.bbc.co.uk/news/world-67374801",
      urlToImage:
        "https://ichef.bbci.co.uk/news/1024/branded_news/13BCE/production/_131664808_amira1.jpg",
    },
    {
      title: "Ros Atkins on... Do the rules of war protect hospitals?",
      description:
        "The BBC's Analysis editor looks at how the rules of war apply to hospitals.",
      publishedAt: "2023-11-15T18:03:27Z",
      source: {
        name: "BBC News",
      },
      url: "https://www.bbc.co.uk/news/av/world-middle-east-67431820",
      urlToImage:
        "https://ichef.bbci.co.uk/news/1024/branded_news/F96D/production/_131735836_p0gsxt30.jpg",
    },
    {
      author: "https://www.facebook.com/bbcnews",
      title: "Ukraine war: Fierce row erupts over 2024 election",
      description:
        "Some right-wing US politicians want Ukraine to vote as scheduled next year. Ukrainians don't.",
      publishedAt: "2023-11-26T00:21:31Z",
      source: {
        name: "BBC News",
      },
      url: "https://www.bbc.co.uk/news/world-europe-67440357",
      urlToImage:
        "https://ichef.bbci.co.uk/news/1024/branded_news/14D9D/production/_131750458_capture.png",
    },
  ];

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     try {
  //       const response = await axios.get("https://newsapi.org/v2/everything", {
  //         params: {
  //           q: "war",
  //           apiKey: "c7a7c8720b7945039ff620cbf0ffe973",
  //           pageSize: 10,
  //           language: "en",
  //         },
  //       });
  //       setNewsData(response.data.articles);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching news:", error);
  //     }
  //   };

  //   fetchNews();
  // }, []);

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
