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
 * @project_name : TOFAN-MD                                                                   
 * @author : Qadeer-bhai <https://github.com/Qadeer-bhai>   
 * @description : TOFAN-MD ,A Multi-functional whatsapp bot.       
 * @version 1.0.1                                                                                             
 ========================================================
 **/

const { dare, truth, random_question } = require('../lib/truth-dare.js')
const axios = require('axios')
const { cmd } = require('../lib')
    //---------------------------------------------------------------------------
cmd({
            pattern: "question",
            desc: "Random Question.",
            category: "fun",
            filename: __filename,
        },
        async(Void, citel, text) => {
            return await citel.reply(`${random_question()}`);
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "truth",
            desc: "truth and dare(truth game.).",
            category: "fun",
            filename: __filename,
        },
        async(Void, citel, text) => {
            return await citel.reply(`${truth()}`);
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "dare",
            desc: "truth and dare(dare game.).",
            category: "fun",
            filename: __filename,
        },
        async(Void, citel, text) => {
            return await citel.reply(`${dare()}`);
        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "fact",
        desc: "Sends fact in chat.",
        category: "fun",
        filename: __filename,
    },
    async(Void, citel, text) => {
        const { data } = await axios.get(`https://nekos.life/api/v2/fact`)
        return citel.reply(`*Fact:* ${data.fact}\n\n*Powered by Secktor-2.0*`)   
    }

    
)
    //---------------------------------------------------------------------------
    cmd({
        pattern: "quotes",
        desc: "Sends quotes in chat.",
        category: "fun",
        filename: __filename,
    },
    async(Void, citel, text) => {
        var quoo = await axios.get(`https://favqs.com/api/qotd`)
        const replyf = `
╔════◇
║ *🎯Content:* ${quoo.data.quote.body}
║ *👤Author:* ${quoo.data.quote.author}
║
╚════════════╝ `
return citel.reply(replyf)
    }

)
    //---------------------------------------------------------------------------
    cmd({
        pattern: "define",
        desc: "urban dictionary.",
        category: "fun",
        filename: __filename,
    },
    async(Void, citel, text) => {
        try{
            let { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${text}`)
            var textt = `
            Word: ${text}
            Definition: ${data.list[0].definition.replace(/\[/g, "").replace(/\]/g, "")}
            Example: ${data.list[0].example.replace(/\[/g, "").replace(/\]/g, "")}`
            return citel.reply(textt)
                    } catch {
                        return citel.reply(`No result for ${text}`)
                    }
    }
)
