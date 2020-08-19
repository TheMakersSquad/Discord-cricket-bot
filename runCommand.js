const { commands } = require("./commands");
const Utils = require("./utils");
const prefix = Utils.prefix;

const funcs = {
  help: (message) => {
    console.log(message.content);
  },

  match: (message) => {
    var messageArray = message.content.split(" ");
    var matchID = parseInt(messageArray[1]);
    var param = messageArray[2] || "info";
    Utils.fetchMatchDetails(matchID).then((json) => {
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
      message.channel.send(mappedParam[param]);
    });
  },

  today: (message) => {
    Utils.fetchAllMatchesToday().then((json) => {
      var finalMessage = "";
      for (i = 1; i < json.length; i++) {
        finalMessage += ` \`${json[i]["id"]}\` : ${json[i]["t1"]} vs ${json[i]["t2"]} \n`;
      }
      finalMessage =
        " All the matches for today are: \n\n" +
        finalMessage +
        `\n Send \`${prefix}match match_id param\` for details`;
      message.channel.send(finalMessage);
    });
  },
};

exports.run = (inputCommand, message) => {
  funcs[inputCommand](message);
};
