const fetch = require("node-fetch");
const { prefix, token } = require("./config.json");
const { Message } = require("discord.js");

exports.getBattingBowlingTeam = (json) => {
  var result = {
    battingTeam: null,
    bowlingTeam: null,
  };
  
  if(json["header"]["matchEvent"]["competitors"][0]["isBatting"]){
    result.battingTeam = json["header"]["matchEvent"]["competitors"][0];
    result.bowlingTeam = json["header"]["matchEvent"]["competitors"][1];
  }
  else{
    result.battingTeam = json["header"]["matchEvent"]["competitors"][1];
    result.bowlingTeam = json["header"]["matchEvent"]["competitors"][0];
  }

  
  return result;
};



exports.fetchMatchDetails = async function allMatches(matchID) {
  
    var data = await fetch(
    `https://hsapi.espncricinfo.com/v1/pages/match/scoreboard?lang=en&leagueId=8623&eventId=${matchID}`
  );
  var json = await data.json();
  return json;

};

exports.fetchAllMatchesToday = async function matchDetail() {
  
  var data = await fetch("http://cricscore-api.appspot.com/csa");

  var json = await data.json();
  return json;
};

exports.prefix = prefix;
exports.logoBaseUrl ="https://img1.hscicdn.com/image/upload/f_auto,t_h_100/" ; 