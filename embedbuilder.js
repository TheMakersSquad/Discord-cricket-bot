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

  }


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



exports.fetchScoreCard = (json, param1, param2) => {

 
    
  let fields =[];
 
  let inningsNo = json["content"]["innings"].length;

var no = (param1 -1);


if( param1 <= inningsNo && no >=0 && param2 === "bat") {
  
  
        fields.push({
          name: json["content"]["innings"][no]["title"],
          value: `Total: ${json["content"]["innings"][no]["total"]}`,
          inline: false,
        });

        
        json["content"]["innings"][no]["batsmen"].map((battingPlayer)=>{
            fields.push({
              name:  battingPlayer["name"],
              value: ` ** Runs: ${battingPlayer["runs"]} (${battingPlayer["ballsFaced"]})** \n ${battingPlayer["shortText"]}  \nFours:(${battingPlayer["fours"]})\nSixes:(${battingPlayer["sixes"]}) \n Strike Rate:${battingPlayer["strikeRate"]}`,
              inline: true,
            });
          });
    

    
      }
else if( param1 <= inningsNo && no >=0 &&param2 === "ball"){


  fields.push({
    name: "Bowling Scorecard",
    value: `Total: ${json["content"]["innings"][no]["extras"]}`,
    inline: false,
  })

  
  json["content"]["innings"][no]["bowlers"].map((bowlingPlayer)=>{
      fields.push({
        name: bowlingPlayer["name"],
        value: ` Overs: ${bowlingPlayer["overs"]} \n Maidens:${bowlingPlayer["maidens"]} \n Conceded: ${bowlingPlayer["conceded"]} \n WICKETS:**${bowlingPlayer["wickets"]}** \n Economy:(${bowlingPlayer["economyRate"]}) \n Wides:${bowlingPlayer["wides"]} \n No Balls:${bowlingPlayer["noballs"]}`,
        inline: true,
      });
    });
}
 else{
      
      fields.push({
        name: `** Invalid Innings Number / MatchID ** OR **Innings yet to be Played** `,
        value:` Please Enter ${prefix}scorecard MatchID [Innings number] [bat/ball] ` 
      })
    
      
    }


  const scoreCard = new Discord.MessageEmbed({
    color: 0x0099ff,
    title: ` Score: ${json["header"]["matchEvent"]["statusText"]}`,
    setDescription: `\n ${json["meta"]["homeTeamName"]} vs ${json["meta"]["awayTeamName"]}`,
    author: {
      name: `🏏${Utils.getBattingBowlingTeam(json).battingTeam["displayName"]}`,
      iconURL: `${Utils.logoBaseUrl}${
        Utils.getBattingBowlingTeam(json).battingTeam["logoUrl"]
      }`},
    fields: fields,
    footer: {
      text: `🥎${Utils.getBattingBowlingTeam(json).bowlingTeam["displayName"]}`,
      iconURL: `${Utils.logoBaseUrl}${
        Utils.getBattingBowlingTeam(json).bowlingTeam["logoUrl"]
      }`,
    },
  });

  return scoreCard;


}
