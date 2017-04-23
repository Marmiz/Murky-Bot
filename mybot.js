/*
  Murky bot will show in chat like a true murloc.
*/

// app config
require('dotenv').config();
var express = require('express')
var app = express()

var axios = require('axios');

// import the discord.js module
const Discord = require('discord.js');


// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = process.env.TOKEN;

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  console.log('I am ready!');
});


// create an event listener for messages
bot.on('message', message => {
  // create a prefix for control
  let prefix = '!';

  // to avoid botception
  if(message.author.bot) return;

  // if mentioned
  if (message.isMentioned(bot.user)){
    var emoji = bot.emojis.get('230434417414373376').toString();
    message.channel.sendMessage('Mmrrlg '+emoji);
  }

  // no prefix
  if(!message.content.startsWith(prefix)) return;

  // taunt like a boss
  if(message.content.startsWith(prefix + 'taunt')){
    var emoji = bot.emojis.get('232799774577786881').toString();
    message.channel.sendMessage('Your mother was a murloc ' +emoji);
  }
});

// log our bot in
bot.login(token);

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send('Hello World!')
});

setInterval(function() {
    axios.get("https://murky-bot.herokuapp.com/");
}, 18000000); // every 30 minutes wake up the bot if idle.

app.listen(app.get('port'), function() {
  console.log(`Server listening on port ${app.get('port')}`);
})
