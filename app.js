const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
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

  
client.on ('ready', async () => {
        console.log('Render cue observer is online...');


    //CHANGING NICK JUST IN CASE
        //const guild = await client.guilds.fetch(process.env.GUILD_ID);
        //guild.members.me.setNickname('Observer');
        
        setInterval(() => {
                //CALL TO API HERE
                console.log(new Date());
                client.user.setPresence({
                  activities: [{ name: 'Render in cue: '+generateRandomWord() , type: ActivityType.Watching }],
                  status: 'dnd',
                });
                //guild.members.me.setNickname('Render in cue: '+generateRandomWord());
          }, 60 * 1000);
         
        
  });
  
  


client.login(token);
  
