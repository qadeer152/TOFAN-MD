const { zokou } = require("../framework/zokou");
const axios = require("axios");
const yts = require('yt-search');
const fs = require('fs');
const yt = require("../framework/dl/ytdl-core.js");
const ffmpeg = require("fluent-ffmpeg");

zokou({
  nomCom: "mygroups",
  categorie: "User",
  reaction: "💿"
}, async (senn, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    const getGroupzs = await zk.groupFetchAllParticipating();
    const groupzs = Object.entries(getGroupzs).map(entry => entry[1]);
    const anaa = groupzs.map(v => v.id);
    let jackhuh = `*GROUPS AM IN*\n\n`;

    repondre(`You are currently in ${anaa.length} groups, Dullah Md will send that list in a moment...`);

    for (const i of anaa) {
      const metadat = await zk.groupMetadata(i);
      jackhuh += `*GROUP NAME:* ${metadat.subject}\n`;
      jackhuh += `*MEMBERS:* ${metadat.participants.length}\n`;
      jackhuh += `*GROUP ID:* ${i}\n\n`;
    }
    
    await repondre(jackhuh);
  } catch (error) {
    console.error("Error fetching groups:", error);
    repondre("An error occurred while const { zokou } = require("../framework");

zokou(
  {
    nomCom: "cat",
    categorie: "fun",
    reaction: "🐱",
    desc: "Send random cat images!",
  },
  async (dest, zk, commandeOptions) => {
    try {
      const imageUrl = "https://cataas.com/cat"; // API for cat images
      const fileName = "random_cat.jpg"; // Image file name

      await zk.sendImage(dest, imageUrl, fileName, "*Meowww!*");
    } catch (e) {
      console.log("Error sending cat image:", e); // Debugging
      await zk.sendText(dest, `❌ Error: ${e.message}`);
    }
  }
);
 groups.");
  }
});

const fetchAPI = async (url, repondre) => {
  try {
    const response = await axios.get(url);
    await repondre(response.data.result);
  } catch (error) {
    console.error("Error fetching data:", error);
    repondre("An error occurred while fetching data.");
  }
};

zokou({
  nomCom: "flirt",
  reaction: '😁',
  categorie: "FUN"
}, async (client, user, options) => {
  const { repondre } = options;
  await fetchAPI("https://shizoapi.onrender.com/api/texts/flirt?apikey=shizo", repondre);
});

zokou({
  nomCom: "pickupline",
  reaction: '😁',
  categorie: "FUN"
}, async (client, user, options) => {
  const { repondre } = options;
  await fetchAPI("https://api.popcat.xyz/pickuplines", repondre);
});

zokou({
  nomCom: "yomama😂",
  reaction: '😁',
  categorie: "FUN"
}, async (client, user, options) => {
  const { repondre } = options;
  await fetchAPI("https://yomamaindra.onrender.com/jokes", repondre);
});

const generateImage = async (messageId, sender, prompt, category) => {
  try {
    const imageUrl = `https://www.noobs-api.000.pe/dipto/${category}?prompt=${encodeURIComponent(prompt)}`;

    await sender.sendMessage(messageId, {
      image: {
        url: imageUrl
      },
      caption: "*ROLE by Tofan md*"
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return "Oops, an error occurred while processing your request.";
  }
};

const imageCommands = [
  { nomCom: "meta", category: "meta" },
  { nomCom: "genix", category: "genix" },
  { nomCom: "sdxl", category: "sdxl" },
  { nomCom: "monster", category: "monster" },
  { nomCom: "midjourney", category: "mj" },
  { nomCom: "pixart", category: "pixart" }
];

imageCommands.forEach(({ nomCom, category }) => {
  zokou({
    nomCom,
    reaction: '📡',
    categorie: 'META-AI'
  }, async (messageId, sender, { repondre, arg }) => {
    if (!arg || arg.length === 0) {
      return repondre("Please enter the necessary information to generate the image.");
    }

    const query = arg.join(" ");
    await generateImage(messageId, sender, query, category);
  });
});
         
