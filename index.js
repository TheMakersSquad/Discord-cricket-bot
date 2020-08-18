const Discord = require("discord.js");
const fetch = require("node-fetch");

const { prefix, token } = require("./config.json");

const client = new Discord.Client();

client.once("ready", () => {
  client.user.setActivity("Cricket", { type: "PLAYING" });
  console.log("Bot is Ready");
});

client.on("message", (message) => {
  if (message.content.startsWith(`${prefix}score`)) {
    console.log(message.content);
    var messageArray = message.content.split(" ");
    var matchID = parseInt(messageArray[1]);
    var param = messageArray[2];
    var path = `/matches/engine/match/${matchID}.json`;
    let url = `http://www.espncricinfo.com` + path;
    console.log(path);
    let settings = { method: "Get" };
    fetch(url, settings)
      .then((res) => res.json())
      .then((json) => {
        let mappedParam = {
          description: json["description"],
          series: json["series"][0]["series_name"],
          status: json["live"]["status"],
        };
        message.channel.send(mappedParam[param]); // do something with JSON
      });
    console.log(matchID);
  }
});

client.login(token);
