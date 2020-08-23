const { commands } = require("./commands");
const Utils = require("./utils");
const fetchAllmatchesToday = require("./embedbuilder");
const Fetchedmatchdetails = require("./embedbuilder");
const FetchScoreCard = require("./embedbuilder");
const prefix = Utils.prefix;

const funcs = {
  help: (message) => {
    console.log(message.content);
  },

  match: (message) => {
    let messageArray = message.content.split(" ");
    let matchID = parseInt(messageArray[1]);
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

  scorecard: (message)=>{
    let messageArray = message.content.split(" ");
    let matchID = parseInt(messageArray[1]);
    let param1 = parseInt(messageArray[2]);
    let param2 = (messageArray[3]);
    
    Utils.fetchMatchDetails(matchID).then((json) => {
      let matchScoreCard = FetchScoreCard.fetchScoreCard(json,  param1, param2);
      message.channel.send(matchScoreCard);
    });
    
  }
};

exports.run = (inputCommand, message) => {
  funcs[inputCommand](message);
};
