const { zokou } = require("../framework/zokou");
const axios = require("axios");
const Genius = require("genius-lyrics");
const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

zokou({
  'nomCom': "bible",
  'reaction': '🎎',
  'categorie': "General"
}, async (message, sender, args) => {
  const { repondre: respond, arg: arguments, ms: metadata } = args;
  const searchQuery = arguments.join(" ");
  if (!searchQuery) {
    return respond("Please specify the book, the chapter and the verse you want to read. Example: bible Romans 6:23");
  }
  let response = await fetch("https://bible-api.com/" + searchQuery);
  if (!response.ok) {
    return respond("Please specify the chapter number or name. Example: timothy john 3:16");
  }
  let data = await response.json();
  let replyText = "📖 *THE HOLY BIBLE*\n\n📜 *_WE'RE READING:_* " + data.reference + "\n\n🔢 *_NUMBER OF VERSES:_* " + data.verses.length + "\n\n🤍 *_NOW READ:_* " + data.text + "\n\n🌍 *_LANGUAGE_:* " + data.translation_name + "\n\n\n╭────────────────◆\n│ *_𝐓𝐎𝐅𝐀𝐍-𝐌𝐃 Scripture._*\n╰─────────────────◆";
  await respond(replyText);
});

zokou({
  'nomCom': "poll",
  'reaction': '✨',
  'categorie': "General"
}, async (message, sender, args) => {
  const { repondre: respond, arg: arguments, ms: metadata } = args;
  const pollContent = arguments.join(" ");
  let [question, options] = pollContent.split('/');
  if (pollContent.split('/').length < 2) {
    return respond("Incorrect format.\nExample: poll what is 1+1/2, 3, 4");
  }
  let optionsArray = [];
  for (let option of options.split(',')) {
    optionsArray.push(option);
  }
  await sender.sendMessage(message, {
    'poll': {
      'name': question,
      'values': optionsArray
    }
  });
});

zokou({
  'nomCom': "fact",
  'reaction': '✌️',
  'categorie': "User"
}, async (message, sender, args) => {
  const { repondre: respond, arg: arguments, ms: metadata } = args;
  const factResponse = await fetch("https://nekos.life/api/v2/fact");
  const factData = await factResponse.json();
  respond("◆━━━━━━✦FACT✦━━━━━━◆ \n*◇* " + factData.fact + "\n\n\n\n\n*◇*Njabulo*JB*\n\n╔═════◇\n║◇ *Free Zone 𝐓𝐎𝐅𝐀𝐍-𝐌𝐃*\n╚════════════════════> ");
});

zokou({
  'nomCom': "quotes",
  'reaction': '🗿',
  'categorie': "User"
}, async (message, sender, args) => {
  const { repondre: respond, arg: arguments, ms: metadata } = args;
  const quoteResponse = await fetch("https://favqs.com/api/qotd");
  const quoteData = await quoteResponse.json();
  const quoteMessage = "\n◆━━━━━━✦QUOTE✦━━━━━━◆ \n◇ _" + quoteData.quote.body + "_\n\n\n◇ *AUTHOR:* " + quoteData.quote.author + "\n\n\n\n\n◇ _Engine by:_ *Njabulo Jb*\n\n\n╔═════◇\n║◇ *Free Space 𝐓𝐎𝐅𝐀𝐍-𝐌𝐃*\n╚════════════════════> ";
  respond(quoteMessage);
});

zokou({
  'nomCom': "define",
  'reaction': '😁',
  'categorie': "Search"
}, async (message, sender, args) => {
  const { repondre: respond, arg: arguments, ms: metadata } = args;
  if (!arguments || arguments.length === 0) {
    return respond("Provide a term");
  }
  const term = arguments.join(" ");
  try {
    let { data: definitionData } = await axios.get("http://api.urbandictionary.com/v0/define?term=" + term);
    var definitionText = "\n Word: " + term + "\n Definition: " + definitionData.list[0].definition.replace(/\[/g, '').replace(/\]/g, '') + "\n Example: " + definitionData.list[0].example.replace(/\[/g, '').replace(/\]/g, '');
    return respond(definitionText);
  } catch {
    return respond("No result for " + term);
  }
});

zokou({
  'nomCom': "lyrics",
  'reaction': '✨',
  'categorie': "Search"
}, async (message, sender, args) => {
  const { repondre: respond, arg: arguments, ms: metadata } = args;
  try {
    if (!arguments || arguments.length === 0) {
      return respond("Please provide me the song name");
    }
    const songName = arguments.join(" ");
    const songs = await Client.songs.search(songName);
    const firstSong = songs[0];
    console.log(firstSong);
    const lyrics = await firstSong.lyrics();
    const artist = await firstSong.artist.name;
    const title = await firstSong.title;
    const lyricsMessage = "*𝐓𝐈𝐌𝐍𝐀𝐒𝐀-𝐓𝐌𝐃 LYRICS FINDER*\n\n*TITLE* - " + title + "\n\n*ARTIST* - " + artist + "\n\n" + lyrics;
    await sender.sendMessage(message, {
      'image': {
        'url': "./media/lyrics.jpg"
      },
      'caption': lyricsMessage
    }, {
      'quoted': metadata
    });
  } catch (error) {
    respond("Error occurred: " + error);
    console.log(error);
  }
});
