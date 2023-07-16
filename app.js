const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const axios = require('axios').default;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  async function getqueue(){
    let url = "https://apib.ps-lab.io/getqueuewait";
    try {
      let res = await axios.get(url);
      if(res.status == 200) {
        return res.data;
      }
      else {
        console.log("status not 200");
        return null;
      }
    } catch (error) {
      console.log('Error retrieving queue:', error);
      return null;
    }
  }

  
client.on ('ready', async () => {
        console.log('Render cue observer is online...');
        let queue;
        setInterval(async () => {
                //CALL TO API HERE
          queue = await getqueue();
          //console.log(queue);
          if(queue!= null){
            if(queue.queue!=0){
          client.user.setPresence({
            activities: [{ name: 'Render in cue: '+ queue.queue  , type: ActivityType.Watching }],
            status: 'dnd',
          });
            }else{
          client.user.setPresence({
            activities: [{ name: 'cue available', type: ActivityType.Watching }],
            status: 'dnd',
        });
      }
      }     
             
              //guild.members.me.setNickname('Render in cue: '+generateRandomWord());
        }, 30 * 1000);
  });

  
  


client.login(token);
  
