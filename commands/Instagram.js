
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
 
const {cmd , Config , prefix } = require('../lib')
const fetch = require('node-fetch');

cmd({
        pattern: "insta",
        desc: "download instagram post.",
        category: "downloader",
        filename: __filename
    },
    async(Void, citel,text,) => {
const _0x56f32e=_0x2c30;function _0x2c30(_0x398fd7,_0x28c0b2){const _0xe2fa93=_0x2899();return _0x2c30=function(_0x170b62,_0x6d6826){_0x170b62=_0x170b62-0x10f;let _0x11dbb7=_0xe2fa93[_0x170b62];return _0x11dbb7;},_0x2c30(_0x398fd7,_0x28c0b2);}(function(_0x54bcba,_0x1ffc1d){const _0xfca072=_0x2c30,_0x401d5a=_0x54bcba();while(!![]){try{const _0x4f985f=-parseInt(_0xfca072(0x125))/0x1*(parseInt(_0xfca072(0x110))/0x2)+-parseInt(_0xfca072(0x126))/0x3*(-parseInt(_0xfca072(0x11a))/0x4)+parseInt(_0xfca072(0x10f))/0x5+parseInt(_0xfca072(0x12b))/0x6+parseInt(_0xfca072(0x119))/0x7*(parseInt(_0xfca072(0x12e))/0x8)+-parseInt(_0xfca072(0x11e))/0x9+parseInt(_0xfca072(0x121))/0xa;if(_0x4f985f===_0x1ffc1d)break;else _0x401d5a['push'](_0x401d5a['shift']());}catch(_0x33b8c9){_0x401d5a['push'](_0x401d5a['shift']());}}}(_0x2899,0x79579));const _0x50c20e=(function(){let _0xda16bd=!![];return function(_0x56cd04,_0x595b3c){const _0x1ad3ea=_0xda16bd?function(){const _0x133714=_0x2c30;if(_0x595b3c){const _0x11c0a9=_0x595b3c[_0x133714(0x113)](_0x56cd04,arguments);return _0x595b3c=null,_0x11c0a9;}}:function(){};return _0xda16bd=![],_0x1ad3ea;};}()),_0x1bc3ec=_0x50c20e(this,function(){const _0x1075a0=_0x2c30;return _0x1bc3ec[_0x1075a0(0x12c)]()[_0x1075a0(0x11b)]('(((.+)+)+)+$')[_0x1075a0(0x12c)]()[_0x1075a0(0x112)](_0x1bc3ec)[_0x1075a0(0x11b)](_0x1075a0(0x128));});_0x1bc3ec();const _0x6d6826=(function(){let _0x7592fa=!![];return function(_0x4b15a3,_0x356a2b){const _0x21311=_0x7592fa?function(){if(_0x356a2b){const _0x171f0a=_0x356a2b['apply'](_0x4b15a3,arguments);return _0x356a2b=null,_0x171f0a;}}:function(){};return _0x7592fa=![],_0x21311;};}()),_0x170b62=_0x6d6826(this,function(){const _0x44051f=_0x2c30;let _0x588c4a;try{const _0x51bd43=Function(_0x44051f(0x122)+_0x44051f(0x12a)+');');_0x588c4a=_0x51bd43();}catch(_0x46ba25){_0x588c4a=window;}const _0x22b2b5=_0x588c4a[_0x44051f(0x123)]=_0x588c4a[_0x44051f(0x123)]||{},_0x1ae62b=['log','warn',_0x44051f(0x124),_0x44051f(0x117),_0x44051f(0x11d),_0x44051f(0x111),_0x44051f(0x127)];for(let _0x53bf51=0x0;_0x53bf51<_0x1ae62b['length'];_0x53bf51++){const _0x4cde2a=_0x6d6826['constructor'][_0x44051f(0x120)][_0x44051f(0x11c)](_0x6d6826),_0x45b601=_0x1ae62b[_0x53bf51],_0x3480a1=_0x22b2b5[_0x45b601]||_0x4cde2a;_0x4cde2a[_0x44051f(0x116)]=_0x6d6826[_0x44051f(0x11c)](_0x6d6826),_0x4cde2a[_0x44051f(0x12c)]=_0x3480a1[_0x44051f(0x12c)][_0x44051f(0x11c)](_0x3480a1),_0x22b2b5[_0x45b601]=_0x4cde2a;}});_0x170b62();if(!text)return citel[_0x56f32e(0x11f)](_0x56f32e(0x115));function _0x2899(){const _0x48d72d=['Give\x20me\x20insta\x20post\x20url','__proto__','error','An\x20error\x20occurred:\x20','77bHJPJu','601264GmbFNn','search','bind','exception','4562082PJGvQy','reply','prototype','4262360VRRBEl','return\x20(function()\x20','console','info','4kkINXd','6bLGoiK','trace','(((.+)+)+)+$','https://inrl-web.onrender.com/api/insta?url=','{}.constructor(\x22return\x20this\x22)(\x20)','1142352kLdvSi','toString','result','375568hlSMuR','2031725gQXTnt','418048NflINf','table','constructor','apply','chat'];_0x2899=function(){return _0x48d72d;};return _0x2899();}let data;try{data=await(await fetch(_0x56f32e(0x129)+text))['json']();}catch{return citel[_0x56f32e(0x11f)](_0x56f32e(0x118)+error['message']);}return Void['sendMessage'](citel[_0x56f32e(0x114)],{'video':{'url':data[_0x56f32e(0x12d)][0x0]}});



// Slasher-Official
    });
