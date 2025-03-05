const { keith } = require('../keizzah/keith');
const axios = require("axios");
const { getytlink, ytdwn } = require("../keizzah/ytdl-core");
const yts = require("yt-search");
const fs = require('fs');
const conf = require(__dirname + '/../set');


keith({
  nomCom: "currencylist",
  aliases: ["currencies", "conversionrates"],
  reaction: '💱',
  categorie: "trade"
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  const fetchCurrencyRates = async () => {
    try {
      const response = await axios.get('https://v6.exchangerate-api.com/v6/0d36793326ec3af0c240a8d4/latest/USD');
      const data = response.data;

      // Check if the response is successful
      if (data && data.result === "success") {
        return data.conversion_rates;
      } else {
        throw new Error('Failed to retrieve currency rates.');
      }
    } catch (error) {
      console.error('Error fetching currency rates:', error);
      return null;
    }
  };

  try {
    const conversionRates = await fetchCurrencyRates();

    if (!conversionRates) {
      return repondre('Failed to retrieve currency rates. Please try again later.');
    }

    let message = '*Currency Conversion Rates*\n\n';
    for (const [currency, rate] of Object.entries(conversionRates)) {
      message += `*${currency}*: ${rate}\n`;
    }

    await zk.sendMessage(dest, { text: message });
  } catch (error) {
    console.error('Error sending currency list:', error);
    await repondre('Something went wrong while sending the currency list. Please try again later.');
  }
});

keith({
  nomCom: "forex",
  category: "trade",
  desc: "Fetches the latest forex news",
  reaction: "🤦",
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    const apiUrl = "https://api.polygon.io/v2/reference/news?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data.results || data.results.length === 0) {
      return repondre("*No forex news available at the moment.*");
    }

    const articles = data.results;
    let output = "";

    articles.forEach((article, index) => {
      output += `*Title:* ${article.title}\n`;
      output += `*Publisher:* ${article.publisher.name}\n`;
      output += `*Published UTC:* ${article.published_utc}\n`;
      output += `*Article URL:* ${article.article_url}\n\n`;

      if (index < articles.length - 1) {
        output += "---\n\n";
      }
    });

    return repondre(output, { quoted: zk });
  } catch (error) {
    console.error('Error fetching forex news:', error);
    return repondre("*Failed to fetch forex news.*");
  }
});
keith({
  nomCom: "fxstatus",
  category: "trade",
  desc: "Fetches the current status of the forex market",
  reaction: "🤦",
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    const apiUrl = "https://api.polygon.io/v1/marketstatus/now?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data) {
      return repondre("*Failed to fetch forex market status.*");
    }

    let output = "*Forex Market Status:*\n";
    output += `After Hours: ${data.afterHours ? "Closed" : "Open"}\n`;
    output += `Market: ${data.market ? "Open" : "Closed"}\n`;

    const currencies = data.currencies;
    output += "\n*Currencies:*\n";
    output += `Crypto: ${currencies.crypto}\n`;
    output += `FX: ${currencies.fx}\n`;

    const exchanges = data.exchanges;
    output += "\n*Exchanges:*\n";
    output += `NASDAQ: ${exchanges.nasdaq}\n`;
    output += `NYSE: ${exchanges.nyse}\n`;
    output += `OTC: ${exchanges.otc}\n`;

    const indicesGroups = data.indicesGroups;
    output += "\n*Indices Groups:*\n";
    output += `S&P: ${indicesGroups.s_and_p}\n`;
    output += `Societe Generale: ${indicesGroups.societe_generale}\n`;
    output += `MSCI: ${indicesGroups.msci}\n`;
    output += `FTSE Russell: ${indicesGroups.ftse_russell}\n`;
    output += `MStar: ${indicesGroups.mstar}\n`;
    output += `MStarC: ${indicesGroups.mstarc}\n`;
    output += `CCCY: ${indicesGroups.cccy}\n`;
    output += `CGI: ${indicesGroups.cgi}\n`;
    output += `NASDAQ: ${indicesGroups.nasdaq}\n`;
    output += `Dow Jones: ${indicesGroups.dow_jones}\n`;

    output += `\n*Server Time:* ${data.serverTime}\n`;

    return repondre(output, { quoted: ms });
  } catch (error) {
    console.error('Error fetching forex market status:', error);
    return repondre("*Failed to fetch forex market status.*");
  }
});

keith({
  nomCom: "fxpairs",
aliases: ["forexpairs", "pairforex"],
  category: "trade",
  desc: "Fetches a list of active forex currency pairs",
  reaction: "🤦",
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    const apiUrl = "https://api.polygon.io/v3/reference/tickers?market=fx&active=true&apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.results || data.results.length === 0) {
      return repondre("*Failed to fetch forex currency pairs.*");
    }

    let output = "*Active Forex Currency Pairs:*\n\n";
    data.results.forEach((pair) => {
      output += `${pair.ticker}: ${pair.name}\n`;
    });

    return repondre(output, { quoted: ms });
  } catch (error) {
    console.error('Error fetching forex currency pairs:', error);
    return repondre("*Failed to fetch forex currency pairs.*");
  }
});

keith({
  nomCom: "stocktickers",
  aliases: ["stockticks", "tickets"],
  category: "trade",
  desc: "Fetches a list of active stock tickers",
  reaction: "🤦",
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    const limit = 100; // Assuming a default limit of 100, or you can customize this as needed
    const apiUrl = `https://api.polygon.io/v3/reference/tickers?active=true&limit=${limit}&apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.results || data.results.length === 0) {
      return repondre("*No active stock tickers found.*");
    }

    let output = `*Active Stock Tickers (Limit: ${limit}):*\n\n`;
    data.results.forEach((ticker) => {
      output += `${ticker.ticker}: ${ticker.name}\n`;
    });

    return repondre(output, { quoted: ms });
  } catch (error) {
    console.error('Error fetching stock tickers:', error);
    return repondre("*Failed to fetch stock tickers.*");
  }
});

keith({
  nomCom: "fxexchange",
  aliases: ["forexexchange", "exchangerate"],
  category: "trade",
  desc: "Fetches the latest foreign exchange rates against the US Dollar",
  reaction: "🤦",
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    const currencyCode = "USD"; // Using default currency code as USD
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${currencyCode}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.rates) {
      return repondre(`*Failed to fetch exchange rates for ${currencyCode}.*`);
    }

    let output = `*Foreign Exchange Rates (${data.base})*\n\n`;
    for (const [currency, rate] of Object.entries(data.rates)) {
      output += `${currency}: ${rate.toFixed(4)}\n`;
    }

    return repondre(output, { quoted: ms });
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return repondre("*Failed to fetch exchange rates.*");
  }
});

// Nsearch - Video Search Command
keith({
  nomCom: "nsearch",
  aliases: ["videosearch", "videolist"],
  categorie: "search",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;
  const query = arg.join(" ");
  
  // Ensure query exists
  if (!query) {
    return repondre('Please provide a search query!');
  }

  try {
    // Define Video search API URL
    const searchApiUrl = `https://api.davidcyriltech.my.id/search/xvideo?text=${encodeURIComponent(query)}`;
    const response = await axios.get(searchApiUrl);

    // Check if response data is valid and contains search results
    const results = response.data.results;
    if (!results || results.length === 0) {
      return repondre("No search results found.");
    }

    // Prepare search result message
    let searchMessage = `${conf.BOT} 𝐕𝐈𝐃𝐄𝐎 𝐒𝐄𝐀𝐑𝐂𝐇 𝐑𝐄𝐒𝐔𝐋𝐓𝐒\n\n`;

    results.forEach((result, index) => {
      searchMessage += `*┃${index + 1}.* ${result.title}\n`;
      searchMessage += `*┃Duration*: ${result.duration || "Unknown"}\n`;
      searchMessage += `*┃URL*: ${result.url}\n`;
      searchMessage += `───────────────────◆\n\n`;
    });

    // Get the thumbnail for the first result, or a default if missing
    const thumbnailUrl = results[0]?.thumbnail || conf.URL;

    // Send the video search result message
    await zk.sendMessage(dest, {
      text: searchMessage,
      contextInfo: {
        externalAdReply: {
          title: "Video Search Results",
          body: "Click the links to view the videos",
          thumbnailUrl: thumbnailUrl,
          sourceUrl: conf.GURL,
          mediaType: 1,
          showAdAttribution: true, // Verified badge
        },
      },
    });

  } catch (error) {
    // Log error and respond with message
    console.error(error); // Log the error for debugging
    repondre(`Error occurred: ${error.message || 'Something went wrong.'}`);
  }
});


// TikTok Search Command
keith({
  nomCom: "tiktoksearch",
  aliases: ["tiksearch", "tiktoklist"],
  categorie: "search",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;
  const query = arg.join(" ");
  
  // Check if there is a query in the arguments
  if (!query) {
    return repondre('Please provide a query!');
  }

  try {
    // URL for the TikTok search API
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(query)}`;
    const response = await axios.get(searchApiUrl);

    // Check if response data is valid and contains search results
    const searchData = response.data.data;
    if (!searchData || searchData.length === 0) {
      return repondre("No TikTok search results found.");
    }

    // Construct TikTok search message
    let searchMessage = `${conf.BOT} 𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐀𝐑𝐂𝐇\n\n`;

    // Loop through search results and construct track info with numbers
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      searchMessage += `*┃${trackNumber}.* ${track.title}\n`;
      searchMessage += `*┃Region*: ${track.region || "Unknown"}\n`;
      searchMessage += `*┃ID*: ${track.id}\n`;  // `id` is the video ID
      searchMessage += `*┃Video URL*: ${track.url}\n`;
      searchMessage += `*┃Cover Image*: ${track.cover}\n`;
      searchMessage += `*┃Views*: ${track.views || 0}\n`;
      searchMessage += `*┃Likes*: ${track.likes || 0}\n`;
      searchMessage += `*┃Comments*: ${track.comments || 0}\n`;
      searchMessage += `*┃Shares*: ${track.share || 0}\n`;
      searchMessage += `*┃Download Count*: ${track.download || 0}\n`;
      searchMessage += `───────────────────◆\n\n`;
    });

    // Determine the thumbnail URL
    const thumbnailUrl = searchData[0]?.cover || conf.URL;

    // Send the playlist message
    await zk.sendMessage(
      dest,
      {
        text: searchMessage,
        contextInfo: {
          mentionedJid: [dest],
          externalAdReply: {
            showAdAttribution: true,
            title: conf.BOT,
            body: conf.OWNER_NAME,
            thumbnailUrl: thumbnailUrl,
            sourceUrl: conf.GURL,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      },
    );
  } catch (error) {
    // Log and respond with error message
    console.error(error);  // Log the error to the console
    repondre(`Error: ${error.message || 'Something went wrong.'}`);
  }
});


// Twitter Search Command
keith({
  nomCom: "twittersearch",
  aliases: ["xsearch", "twitterlist", "tweetsearch", "xsearch"],
  categorie: "search",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;
  const query = arg.join(" ");
  
  // Ensure a query is provided in the arguments
  if (!query) {
    return repondre('Please provide a query!');
  }

  try {
    // Define the search API URL
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts?text=${encodeURIComponent(query)}`;
    const response = await axios.get(searchApiUrl);
    const searchData = response.data.result;  // Assuming 'result' contains an array of tweets

    // Check if no results are found
    if (!searchData || searchData.length === 0) {
      return repondre("No Twitter search results found.");
    }

    // Construct the search message
    let searchMessage = `${conf.BOT} 𝐓𝐖𝐈𝐓𝐓𝐄𝐑 𝐒𝐄𝐀𝐑𝐂𝐇\n\n`;
    searchMessage += `Creator: ${response.data.creator}\n\n`;  // Include the creator info

    // Loop through search results and append details to the message
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      searchMessage += `*┃${trackNumber}.* ${track.user}\n`;
      searchMessage += `*┃Profile*: ${track.profile || "Unknown"}\n`;
      searchMessage += `*┃Post*: ${track.post}\n`;  // The text of the tweet
      searchMessage += `*┃User Link*: ${track.user_link}\n`;  // Link to the user's profile
      searchMessage += `───────────────────◆\n\n`;
    });

    // Determine the thumbnail URL
    const thumbnailUrl = searchData[0]?.profile || conf.URL;

    // Send the search result message
    await zk.sendMessage(
      dest,
      {
        text: searchMessage,
        contextInfo: {
          mentionedJid: [dest],
          externalAdReply: {
            showAdAttribution: true,
            title: conf.BOT,
            body: conf.OWNER_NAME,
            thumbnailUrl: thumbnailUrl,
            sourceUrl: conf.GURL,
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      }
    );
  } catch (error) {
    // Log and respond with the error message
    console.error(error);  // Log the error to the console
    repondre(`Error: ${error.message || 'Something went wrong.'}`);
  }
});


// YouTube Search Command
keith({
  nomCom: "yts",
  categorie: "Search",
  reaction: "💬"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query) {
    return repondre("Please provide a search query.");
  }

  try {
    const info = await yts(query);
    const results = info.videos;

    if (results.length === 0) {
      return repondre("No results found.");
    }

    let captions = `*${conf.BOT} YOUTUBE SEARCH*\n`;
    results.slice(0, 10).forEach((video, index) => {
      captions += `*────────────────────*\n${index + 1}.*Title:* ${video.title}\n*Time:* ${video.timestamp}\n*Url:* ${video.url}\n`;
    });

    captions += "\n─────────────────────\n*";

    const thumb = results[0].thumbnail; // Using the first video's thumbnail

    await zk.sendMessage(dest, {
      image: { url: thumb },
      caption: captions,
      contextInfo: {
        externalAdReply: {
          title: `${conf.BOT} YouTube Search`,
          body: `Top results for "${query}"`,
          mediaType: 1,
          thumbnailUrl: thumb,
          sourceUrl: conf.GURL,
          showAdAttribution: true,
        },
      },
    }, { quoted: ms });

  } catch (error) {
    console.error("Error during the search process:", error);
    repondre("Error during the search process: " + error.message);
  }
});
          
