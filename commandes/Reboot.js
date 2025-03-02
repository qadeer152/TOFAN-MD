const {zokou}=require("../framework/zokou")







zokou({nomCom:"2025",categorie:"Mods",reaction:"📴"},async(dest,z,com)=>{


  
const{repondre,ms,dev,superUser}=com;

  if(!superUser)
  {
    return repondre("This command is for owner only");
  }

  const {exec}=require("child_process")

    repondre("Tofan is come back again bot Restarting ⏳");

  exec("pm2 restart all");
  

  



})
