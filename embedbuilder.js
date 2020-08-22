const Discord = require("discord.js");
const Utils = require("./utils");
const prefix = Utils.prefix;

exports.fetchMatchDetails = (json) => {
  let fields = [];
  json["content"]["innings"].map((item) => {
    fields.push({
      name: item["title"],
      value: item["total"],
      inline: true,
    });
  });
  const matchDetails = new Discord.MessageEmbed({
    color: 0x0099ff,
    title: json["header"]["title"],
    setDescription: `\n ${json["meta"]["homeTeamName"]} vs ${json["meta"]["awayTeamName"]}`,
    author: {
      name: `🏏${Utils.getBattingBowlingTeam(json).battingTeam["displayName"]}`,
      iconURL: `${Utils.logoBaseUrl}${
        Utils.getBattingBowlingTeam(json).battingTeam["logoUrl"]
      }`,
    },
    fields: fields,
    footer: {
      text: `🥎${Utils.getBattingBowlingTeam(json).bowlingTeam["displayName"]}`,
      iconURL: `${Utils.logoBaseUrl}${
        Utils.getBattingBowlingTeam(json).bowlingTeam["logoUrl"]
      }`,
    },
  });

  return matchDetails;
};

exports.FetchAllmatchesToday = (json) => {
  let finalMessage = [];
  for (i = 1; i < json.length; i++) {
    singleMatchId = `${json[i]["id"]}`;
    singleMatch = ` ${json[i]["t1"]} vs ${json[i]["t2"]}`;
    finalMessage.push({
      value: ` Match ID: ${singleMatchId}`,
      name: `${singleMatch}`,
    });
  }

  const allMatches = new Discord.MessageEmbed({
    color: 0x0099ff,
    thumbnail: "https://static.toiimg.com/photo/msid-70056441/70056441.jpg",
    title: "🏏 Current Live Matches are:",
    fields: finalMessage,
    footer: {
      text: `\n Send \`${prefix}match match_id \` for details`,
    },
  });
  return allMatches;
};
