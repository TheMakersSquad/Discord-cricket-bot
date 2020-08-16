const Discord = require('discord.js');

const {prefix, token} = require('./config.json')

const client = new Discord.Client();






client.once('ready',()=>{
    client.user.setActivity("Cricket", {type:"PLAYING"})
    console.log('Bot is Ready')
});

client.on('message',message=>{
    if(message.content.startsWith(`${prefix}score`)){
            message.channel.send(":wave:"+"Hello. Not there yet. Keep Patience")
}});


client.login(token);