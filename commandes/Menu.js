const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "menu2", categorie: "menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    
 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');

// Créer une date et une heure en EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭━━━━━━━━━━━━━━━⊷
┃✧╭───────────⊷
┃✧│➥ *ʙᴏᴛ ɴᴀᴍᴇ* : ${s.OWNER_NAME}
┃✧│➥ *ᴅᴀtᴇ* : ${date}
┃✧│➥ *ᴘʀᴇғɪx* : ${s.PREFIXE}
┃✧│➥ *ᴍᴏᴅᴇ* : ${mode} mode
┃✧│➥ *ᴄᴏᴍᴍᴀɴᴅs* : ${cm.length} 
┃✧│➥ *ʀᴀᴍ* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃✧│➥ *ᴄʜʀᴏᴍᴇ* : ${os.platform()}
┃✧│➥ *ᴛʜᴇᴍᴇ* : JB 
┃✧└───────────⊷
╰━━━━━━━━━━━━━━━⊷

©ᴍᴀᴅᴇ ʙʏ ᴛᴏғᴀɴ ᴍᴅ\n`;
    let menuMsg = ``;
    for (const cat in coms) {
      menuMsg += `
⊷━ *{cat}* ━⊷
╭━━━━━━━━━━━━━⊷`;
      ╭─────────⊷  for (const cmd of coms[cat]) {
            menuMsg += `
┃✧┃➥${cmd}`;
        }
        menuMsg += `
      └─────────⊷
╰━━━━━━━━━━━━━⊷\n`
    }

    menuMsg += `
 ᴍᴀᴅᴇ ʙʏ ᴛᴏғᴀɴ ᴍᴅ 2025
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*popkid*" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

})
