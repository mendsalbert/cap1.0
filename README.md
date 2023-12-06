<p align="center">
  <a href="" title="Project Initiator">
    <img src="https://i.ibb.co/KWGWP0X/cap.png" width={10}/>
  </a>
</p>
<h1 align="center">CAP</h1>

<p align="center">
    <a href="https://www.youtube.com/watch?v=rMbAXlKUL8A" title="">🖥️ Video</a>
    .
    <a href="https://cap1-0-graphica99.vercel.app/" title="">🔗 Website</a>
    ·
    <a href="https://github.com/mendsalbert/cap1.0" title="">📂 Repo</a>
    ·
    <a href="https://github.com/mendsalbert/cap1.0" title="🐛Report Bug/🎊Request Feature">🚀 Got Issue</a>
</p>

## Problem

In conflict zones, individuals face numerous challenges, from accessing essential supplies to staying informed about the rapidly evolving situation. Traditional communication and aid delivery systems often struggle to meet the urgent needs of those affected by war. CAP aims to address these issues by leveraging technology to provide timely assistance, transparent communication, and sustainable support in war-torn regions.

## Solution: Vidispark and its Features

In response to the identified challenges, CAP introduces a suite of solutions to empower users and aid organizations in navigating the complexities of conflict zones. Firstly, the platform facilitates real-time assistance by allowing users to request vital supplies, such as medical aid, food, and blood, connecting them seamlessly with NGOs and first responders who can swiftly deliver these critical items. This not only addresses the immediate needs of affected individuals but also streamlines the aid delivery process.

To address the issue of uncertainty surrounding the impact of donations, CAP adopts a transparent approach to fundraising. The donation system integrated into the platform ensures that users can witness the real-time utilization of their funds, providing a clear understanding of how their contributions directly contribute to alleviating the challenges faced by those in war-torn regions.

Recognizing the critical importance of information in crisis situations, CAP incorporates an AI-driven assistance feature. This functionality empowers users with real-time information about the war zone, safety tips, and relevant news updates. By leveraging artificial intelligence, CAP not only enhances the user experience but also equips individuals with the knowledge needed to make informed decisions during challenging times.

In addition to direct aid, CAP introduces innovative avenues for support through carbon footprint campaigns initiated by NGOs. These campaigns allow users to contribute crypto donations to plant or remove trees, thereby addressing environmental concerns and providing a sustainable fundraising model for NGOs engaged in humanitarian efforts.

Through this comprehensive approach, CAP endeavors to create a dynamic and responsive ecosystem that not only meets the immediate needs of individuals in conflict zones but also addresses the broader challenges associated with aid delivery, transparency, and environmental sustainability.

## Architecture and Technology Stack

<img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/687/631/datas/gallery.jpg" alt="Sample Image" width="1000" style="width: 600px;">
In the frontend development of the CAP application, we employ a modern tech stack to ensure a seamless user experience. Leveraging Next.js and JavaScript, we create a responsive and dynamic user interface that enables smooth navigation and real-time updates. The integration of the Google Maps API adds a crucial visual element, providing users with a clear representation of their location within a war zone or non-conflict area. Tailwind CSS is employed for efficient styling, contributing to a visually appealing and user-friendly design.

Node.js forms the backbone of CAP's backend, facilitating robust server-side logic and efficient handling of requests. The microservices architecture enhances scalability and maintainability, ensuring that different components of the application can operate independently. The backend is responsible for orchestrating the communication between users, NGOs, and first responders. Git and GitHub are integral to version control, enabling collaborative development and streamlined code management.

For secure and decentralized file storage, CAP utilizes a hybrid approach, integrating the InterPlanetary File System (IPFS) with Filecoin and Firebase Storage. This combination ensures that critical data, such as user information and transaction records, is stored in a distributed, tamper-resistant, and cloud-based manner. The use of IPFS, Filecoin, and Firebase Storage contributes to the overall resilience and reliability of the file storage system, safeguarding important information in a decentralized and secure manner.

Ethereum smart contracts play a pivotal role in the CAP ecosystem. Hardhat, a development environment for Ethereum, is utilized for building and testing smart contracts. Chainlink services are integrated to facilitate secure and reliable interactions between the CAP application and external data sources. Blockchain technology ensures transparency, traceability, and immutability in the donation and carbon footprint campaigns initiated by NGOs, instilling trust in the fundraising process.

To power the AI-driven features within CAP, the OpenAI API is employed. This API enables real-time interactions with artificial intelligence, providing users with up-to-date information about the war zone, safety tips, and relevant news updates. The seamless integration of the OpenAI API enhances the overall user experience by delivering intelligent and context-aware responses to user queries. The frontend interacts with the AI backend to dynamically incorporate AI-generated insights into the user interface.

By orchestrating these technologies in a cohesive manner, CAP achieves a comprehensive and innovative platform that addresses the diverse needs of users, NGOs, and first responders in conflict zones, leveraging the capabilities of frontend and backend development, decentralized file storage, blockchain, and artificial intelligence.

## Technology Stack & Tools

- Open AI API
- Google map
- Chainlink services
- IPFS (filecoin)
- Firebase storage
- Hardhat
- Ethereum smart contract
- Javascript
- Nextjs
- Tailwindcss
- Nodejs
- Git
- Github
- Microservices

# Chainlink services

- Chainlink Price Feeds: This service is integral for converting various cryptocurrencies into USDT (Tether). Chainlink Price Feeds offer reliable, secure, and accurate price reference data, essential for our application's financial transactions and conversions.

- Chainlink External Adapters: We utilize these adapters to connect our Chainlink nodes with external data sources and APIs. This capability is crucial for our application, as it allows us to access real-time, undiluted news sources, ensuring that our users are promptly informed with trustworthy information.

- Chainlink Keepers: This decentralized service is a cornerstone of our application, automating smart contract triggers for efficient and timely operations. We specifically employ Chainlink Keepers for the critical function of transferring funds to first responders and managing donations, ensuring these transactions are executed accurately and without delay.

- Chainlink VRF (Verifiable Random Function): We incorporate Chainlink VRF to integrate a layer of randomness into our application. This feature provides a fair and unbiased source of randomness, which is vital for certain aspects of our application that require an element of unpredictability to function optimally.

#Features
**Features for Users:**

1. Interactive Map: Users are greeted with a real-time map, indicating their location in a war zone. If not in a war zone, they are prompted to contribute through donations.

2. Request Assistance: Users can request specific items such as ambulances, medical equipment, or food from NGOs, streamlining the process of aid delivery.

3. News Section: A dedicated section provides users with trending updates on the war, fostering awareness and keeping them informed.

4. AI Assistance: An AI-powered tab allows users to interact with the system for real-time information and assistance.

**Features for NGOs:**

1. Campaign Management: NGOs can initiate and manage donation campaigns, ensuring efficient fundraising for their humanitarian efforts.

2. Carbon Footprint Initiatives: NGOs can launch campaigns to reduce CO2 emissions, inviting crypto donations to support tree planting and environmental conservation.

3. Inventory Management: NGOs can efficiently manage and stockpile essential items, ensuring readiness for future assistance requests.

4. Donation Impact Tracking: Tools are provided to showcase the impact of donation campaigns, fostering transparency and building trust with donors.

**Features for First Responders:**

1. Efficient Delivery Tasks: First responders have a user-friendly interface for managing and prioritizing delivery tasks, ensuring timely and effective aid distribution.

2. Task Tracking: A tracking system allows first responders to monitor and update the status of requested items, providing users with real-time information on their deliveries.

3. Communication Hub: The app serves as a central communication hub, connecting first responders with NGOs and users for seamless coordination.

4. Security Measures: Robust security features are in place to protect sensitive information, ensuring the safety and privacy of both responders and users.

## Prerequisite

- [Nodejs](https://nodejs.org/en// "Node") Installed

- [Git](https://git-scm.com/ "Git OFficial") Installed

- [npm](https://www.npmjs.com/ "npm ") Installed

- [Hardhat](https://hardhat.org/ "Hardhat ") Installed

## Installation Steps

1. Clone the repository

```Bash
git clone https://github.com/mendsalbert/cap1.0
```

2. Change the working directory

```Bash
cd cap1.0
```

3. Start the local Hardhat node

```Bash
npx hardhat node
```

4. With the network running, deploy the contracts to the local network in a separate terminal window

```Bash
npx hardhat run scripts/deploy.js --network matic
```

5. Start the app

```Bash
npm run start
```

**🎇 You are Ready to Go!**

## Configuration

The chain ID should be 365. If you have a localhost rpc set up, you may need to overwrite it.

<p align="center" title="Project Initiator"><img src="https://bafybeieuh2n62zhzw666m3fe77cc5xlandpfebcmtwyugdqf5b2nkxjmae.ipfs.w3s.link/Screenshot%202023-05-31%20at%2010.14.09%20AM.png" alt="Project Initiator"/></p>

To deploy to Polygon test or main networks, update the configurations located in hardhat.config.js to use a private key and, optionally, deploy to a private RPC like Infura.

```Bash
require('@nomiclabs/hardhat-waffle');
const privateKey = 'xx';
const projectId = 'xx';

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 365,
    },
     mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey],
    },
  },
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
```

# Learning and Challenges

The team learned a lot on exploring Chainlink Network and OpenAI API. The documentation from [Chainlink Docs](https://docs.chain.link/) and [OpenAI Platform Docs](https://platform.openai.com/docs/introduction) provides great use for development of the Platform.

The most challenging parts are:

- Setting up Testnet node. The team encountered some error regarding seeding nodes.
- OpenAI API restrictions. The team encountered some unexpected restrictions on OpenAI API.
- We encountered numerous errors due to changes in most of the web3 libraries and packages, making the old versions obsolete.

But those mentioned challenges did not stop the team to bring CAP to life.

# What's next for CAP

Deploy for other countries (now the only country is Isreal.)
Community chat.
Optimise routes for delivery of medical equipmentsThe team is very open for feedback & comments to improve the Platform.
