/**
---------------------------------------------------------------------------
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
.___________.  ______    _______    ___      .__   __. 
|           | /  __  \  |   ____|  /   \     |  \ |  | 
`---|  |----`|  |  |  | |  |__    /  ^  \    |   \|  | 
    |  |     |  |  |  | |   __|  /  /_\  \   |  . `  | 
    |  |     |  `--'  | |  |    /  _____  \  |  |\   | 
    |__|      \______/  |__|   /__/     \__\ |__| \__| 
                                                       
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
--------------------------------------------------------------------------
 Copyright (C) 2022.                                                                                        
 Licensed under the  GPL-3.0 License;                                                      
 You may not use this file except in compliance with the License.    
 It is supplied in the hope that it may be useful                                     
 * @project_name : QADEER-MD                                                                   
 * @author : Qadeer-bhai <https://github.com/Qadeer-bhai>   
 * @description : QADEER-MD ,A Multi-functional whatsapp bot.       
 * @version 1.0.1                                                                                             
 ========================================================
 **/

const { tlang, botpic, cmd, prefix, runtime, Config , sleep } = require('../lib')
const axios = require('axios')
const speed = require('performance-now')
const fetch = require('node-fetch');
//---------------------------------------------------------------------------
cmd({
    pattern: "chat",
    alias :['gpt'],
    desc: "chat with an AI(GPT)",
    category: "AI",
    use: '<Hii,Secktor>',
    filename: __filename,
},
async(Void, citel,text) => {
    let zx = text.length;
    if (zx < 8) {
        let {data} = await axios.get(`http://api.brainshop.ai/get?bid=167991&key=aozpOoNOy3dfLgmB&uid=[${citel.sender.split("@")[0]}]&msg=[${text}]`);
        return citel.reply(data.cnt);  
    }
    if (!text) return citel.reply(`Hey there! ${citel.pushName}. How are you doing these days?`);
    // const { Configuration, OpenAIApi } = require("openai");
    // const configuration = new Configuration({
    //     apiKey: Config.OPENAI_API_KEY || "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",
    // });
    // const openai = new OpenAIApi(configuration);
    // const completion = await openai.createCompletion({
    //     model: "text-davinci-002",
    //     prompt: text,
    //     temperature: 0.5,
    //     max_tokens: 80,
    //     top_p: 1.0,
    //     frequency_penalty: 0.5,
    //     presence_penalty: 0.0,
    //     stop: ['"""'],
    // });
    // citel.reply(completion.data.choices[0].text);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Config.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", 
      messages: [{ role: "system", content: "You" }, { role: "user", content: text }],
    }),
  });

  const data = await response.json();
  console.log("GPT REPONCE : ",data); 
  if (!data.choices || data.choices.length === 0) {citel.reply("*Invalid ChatGPT API Key, Please Put New Key*"); }
  return await  citel.reply(data.choices[0].message.content)
	
}
)

cmd({
    pattern: "dalle",
    alias : ['dall','dall-e'],
    desc: "Create Image by AI",
    category: "AI",
    use: '<an astronaut in mud.>',
    filename: __filename,
},
async(Void, citel,text,{isCreator}) => 
{
//if (!isCreator) return citel.reply(tlang().owner)
if (Config.OPENAI_API_KEY=='') return citel.reply('You Dont Have OPENAI_API_KEY \nPlease Create OPEN API KEY from Given Link \nhttps://platform.openai.com/account/api-keys');
if (!text) return citel.reply(`*Give Me A Query To Get Dall-E Reponce ?*`); 
const imageSize = '256x256'
const apiUrl = 'https://api.openai.com/v1/images/generations';
const response = await fetch(apiUrl, {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${Config.OPENAI_API_KEY}`
},
body: JSON.stringify({
  model: 'image-alpha-001',
  prompt: text,
  size: imageSize ,
  response_format: 'url'
})
});

const data = await response.json();
let buttonMessage = {
    image:{url:data.data[0].url},
    caption : '*---Your DALL-E Result---*'

}

Void.sendMessage(citel.chat,{image:{url:data.data[0].url}})
}
)

//---------------------------------------------------------------------------
cmd({
        pattern: "repo",
        alias: ["git", "sc", "script"],
        desc: "Sends info about repo.",
        category: "general",
        filename: __filename,
    },
    async(Void, citel) => {
        let { data } = await axios.get('https://api.github.com/repos/chhaseeb47/HASI-MD')
        let cap = `🧣 *HASI-MD Script* 🧣\n\n*🎀 Total Forks:* ${
          repo.forks_count
        }\n*⭐ Total Stars:* ${repo.stargazers_count}\n*📜 License:* ${
          repo.license.name
        }\n*📁 Repo Owner: *CH HASEEB*
          2
        )} MB\n*📅 Last Updated:* ${repo.updated_at}\n\n*🔗 Repo Link:*https://github.com/chhaseeb47/HASI-MD
        }\n\n❝ Dont forget to give a Star ⭐ to the repo. It's made with restless hardwork by *Ch Haseeb*. ❞\n\n*©️ Team HASI-MD- 2023*`
        let buttonMessaged = {
            image: { url: await botpic() },
            caption: cap,
            footer: tlang().footer,
            headerType: 4,
            contextInfo: {
                externalAdReply: {
                    title: "Hasi-MD-Repo",
                    body: "Easy to Use",
                    thumbnail: log0,
                    mediaType: 4,
                    mediaUrl: '',
                    sourceUrl: ``,
                },
            },
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)
//---------------------------------------------------------------------------
cmd({
        pattern: "status",
        alias: ["about"],
        desc: "To check bot status",
        category: "general",
        filename: __filename,
    },
    async(Void, citel) => {
        const uptime = process.uptime();
        timestampe = speed();
        latensie = speed() - timestampe;
        let ter = `
🔰 *TOFAM-MD* 🔰
*🌟Description:* A WhatsApp bot with rich features, build in NodeJs to make your WhatsApp enjoyable.
*⚡Speed:* ${latensie.toFixed(4)} ms
*🚦Uptime:* ${runtime(process.uptime())}
*🕸Version:* 1.0.1
*👤Owner:*  QADEER KHAN
*Powered by TOFAN-MD*
`;
        let buttonMessaged = {
            image: {
                url: await botpic(),
            },
            caption: ter,
            footer: tlang().footer,
            headerType: 4,
            contextInfo: {
                externalAdReply: {
                    title: tlang().title,
                    body: `Bot-Status`,
                    thumbnail: log0,
                    mediaType: 2,
                    mediaUrl: ``,
                    sourceUrl: ``,
                },
            },
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, {
            quoted: citel,
        });

    }
)

//---------------------------------------------------------------------------
cmd({
    pattern: "theme",
    desc: "To find all themes",
    category: "general",
    filename: __filename,
},
async(Void, citel,text,{isCreator}) => {

if(!isCreator) return citel.reply(tlang().owner);
let str="*All available themes in Secktor-2.0*"
str+=`1. SECKTOR\n2. TOFAN-MD\n3. ANIME\n\n these are the themes of TOFAN-MD Userbot.\_Reply ${prefix}setvar THEME:ANIME`
return citel.reply(str)
    
}
)
