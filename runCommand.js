const { commands } = require("./commands");
const Utils = require("./utils");
const fetchAllmatchesToday = require("./embedbuilder");
const Fetchedmatchdetails = require("./embedbuilder");
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
      let details = Fetchedmatchdetails.fetchMatchDetails(json);
      message.channel.send(details);
    });
  },

  current: (message) => {
    Utils.fetchAllMatchesToday().then((json) => {
      let matchesToday = fetchAllmatchesToday.FetchAllmatchesToday(json);
      message.channel.send(matchesToday);
    });
  },
};

exports.run = (inputCommand, message) => {
  funcs[inputCommand](message);
};
