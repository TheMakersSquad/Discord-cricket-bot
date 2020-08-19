const Discord = require("discord.js");
const fetch = require("node-fetch");
const Commands = require("./commands");
const Runner = require("./runCommand");

const { prefix, token } = require("./config.json");

const client = new Discord.Client();

client.once("ready", () => {
  client.user.setActivity("Cricket", { type: "PLAYING" });
  console.log("Bot is Ready");
});

client.on("message", (message) => {
  if (message.content.startsWith(`${prefix}`)) {
    handleMessage(message);
  }
});

function handleMessage(message) {
  var messageArray = message.content.split(" ");
  var inputCommand = messageArray[0].replace(`${prefix}`, "");
  if (Commands.commands.hasOwnProperty(inputCommand)) {
    Runner.run(inputCommand, message);
  }
}

client.login(token);
