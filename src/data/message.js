import authorImg1 from "/public/static/images/message/u-1.png";
import authorImg2 from "/public/static/images/message/u-2.png";
import authorImg3 from "/public/static/images/message/u-3.png";
import authorImg4 from "/public/static/images/message/u-4.png";
import authorImg5 from "/public/static/images/message/u-5.png";
import authorImg6 from "/public/static/images/message/u-6.png";
import authorImg7 from "/public/static/images/message/u-7.png";
import authorImg8 from "/public/static/images/message/u-8.png";
import authorImg9 from "/public/static/images/message/u-9.png";

const pinnedMessages = [
  {
    id: 1,
    img: authorImg1,
    title: "How to stop a deep cut?",
    massage: "5 \u00B7 Searches",
    time: "16:14",
    isOnline: false,
    isTyping: false,
    status: "",
  },
  {
    id: 2,
    img: authorImg1,
    title: "How to tie a dandage?",
    massage: "2 \u00B7 Searches",
    time: "16:14",
    isOnline: false,
    isTyping: false,
    status: "",
  },
];

const allMessage = [
  {
    id: 1,
    img: authorImg4,
    title: " What is the easiest rounte from A to B",
    massage: "4 \u00B7 Searches",
    time: "15:11",
    status: "sent",
    isOnline: true,
    isTyping: false,
  },
];

export { pinnedMessages, allMessage };
