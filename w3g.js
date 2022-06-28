const { default: W3GReplay } = require("w3gjs");
const fs = require("fs");
const parser = new W3GReplay();
const path = ("C:/Users/steve/Documents/Warcraft III/BattleNet/1338795/Replays");    // set this to your w3g file path
parser
  .parse(path + "/LastReplay.w3g")
  .then((result) => {
    var team_0 = [];
    var team_1 = [];
    for (let p = 0; p < result.players.length; p++) {
        if (result.players[p].teamid == 0) {
            team_0.push({playerName: result.players[p].name, playerRace: result.players[p].raceDetected})
        } else if (result.players[p].teamid == 1) {
            team_1.push({playerName: result.players[p].name, playerRace: result.players[p].raceDetected})
        }
    }

    var team_0_string = "";
    var team_1_string = "";
    for (let i = 0; i < team_0.length; i++) {
        team_0_string += team_0[i].playerName + "[" + team_0[i].playerRace + "]";
        if (i < team_0.length - 1) {
            team_0_string += "+";
        }
    }

    for (let i = 0; i < team_1.length; i++) {
        team_1_string += team_1[i].playerName + "[" + team_1[i].playerRace + "]";
        if (i < team_1.length - 1) {
            team_1_string += "+";
        }
    }

    var full_string = team_0_string + "_VS_" + team_1_string;
    console.log(full_string)

    // rename LastReplay.w3g to full_string.w3g
    fs.rename(
        path + "/LastReplay.w3g",
        path + "/Renamed/" + full_string + ".w3g",
        function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Replay renamed to " + full_string + ".w3g");
        }
    });
  })
  .catch(console.error);