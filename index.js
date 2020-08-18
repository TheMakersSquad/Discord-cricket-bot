const Discord = require("discord.js");
const fetch = require("node-fetch");

const { prefix, token } = require("./config.json");

const client = new Discord.Client();

client.once("ready", () => {
  client.user.setActivity("Cricket", { type: "PLAYING" });
  console.log("Bot is Ready");
});

client.on("message", (message) => {
  if (message.content.startsWith(`${prefix}detail`)) {
    console.log(message);
    var messageArray = message.content.split(" ");
    var matchID = parseInt(messageArray[1]);
    var param = messageArray[2] || "info";
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
          info: `${json["series"][0]["series_name"]} \n\n ${
            json["description"]
          } \n\n ${json["live"]["status"]} \n \n ${
            json["match"]["live_state"] || ""
          }`,
        };
        message.channel.send(mappedParam[param]); // do something with JSON
      });
    console.log(matchID);
  }
  if (message.content.startsWith(`${prefix}matches`)) {
    let url = "http://cricscore-api.appspot.com/csa";
    let settings = { method: "Get" };
    let finalMessage = "";
    fetch(url, settings)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);

        for (i = 1; i < json.length; i++) {
          finalMessage += ` \`${json[i]["id"]}\` : ${json[i]["t1"]} vs ${json[i]["t2"]} \n`;
        }
        finalMessage =
          " All the matches for today are: \n\n" +
          finalMessage +
          `\n Send \`${prefix}detail match_id param\` for details`;
        message.channel.send(finalMessage); // do something with JSON
      });
  }
});

client.login(token);
