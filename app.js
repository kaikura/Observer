const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const axios = require('axios').default;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const letters = ['1', '2', '3', '4', '5', '6'];

function generateRandomWord() {
        let word = '';
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * letters.length);
          word += letters[randomIndex];
        }
        return word;
  }

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
        let queue = await getqueue();
        //console.log(queue);
        if(queue!= null){
        client.user.setPresence({
          activities: [{ name: 'Render in cue: '+ queue.queue  , type: ActivityType.Watching }],
          status: 'dnd',
        });
        

    //CHANGING NICK JUST IN CASE
        //const guild = await client.guilds.fetch(process.env.GUILD_ID);
        //guild.members.me.setNickname('Observer');
        
        setInterval(async () => {
                //CALL TO API HERE
          queue = await getqueue();
          //console.log(queue);
          if(queue!= null){
          client.user.setPresence({
            activities: [{ name: 'Render in cue: '+ queue.queue  , type: ActivityType.Watching }],
            status: 'dnd',
        });
      }     
             
                //guild.members.me.setNickname('Render in cue: '+generateRandomWord());
          }, 30 * 1000);
        }
        
  });

  
  


client.login(token);
  
