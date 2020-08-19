const fetch = require("node-fetch");
const { prefix, token } = require("./config.json");

exports.getBattingBowlingTeam = (json) => {
  var battingTeamId = json["live"]["batting"]["team_id"];
  var bowlingTeamId = json["live"]["bowling"]["team_id"];
  var result = {
    battingTeam: null,
    bowlingTeam: null,
  };
  for (i = 0; i < json["team"].length; i++) {
    if (json["team"][i]["team_id"] == battingTeamId) {
      result.battingTeam = json["team"][i];
    } else if (json["team"][i]["team_id"] == bowlingTeamId) {
      result.bowlingTeam = json["team"][i];
    }
  }
  return result;
};

exports.getTeamFromTeamID = (data, teamID) => {
  // data = team object
  for (i = 0; i < data.length; i++) {
    if (data[i]["team_id"] == teamID) {
      return data[i];
    }
  }
};

exports.getPlayerFromID = (data, playerID) => {
  console.log(data.length);
  for (i = 0; i < data.length; i++) {
    people = data[i]["player"] ? data[i]["player"] : data[i]["squad"];
    for (j = 0; j < people.length; j++) {
      if (people[j]["player_id"] == playerID) {
        return people[j];
      }
    }
  }
};

exports.fetchMatchDetails = async function allMatches(matchID) {
  var data = await fetch(
    `http://www.espncricinfo.com/matches/engine/match/${matchID}.json`
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
