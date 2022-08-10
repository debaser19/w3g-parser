const { default: W3GReplay } = require("w3gjs");
const fs = require("fs");
const parser = new W3GReplay();
const currentPath = ("C:/Users/steve/Documents/Warcraft III/BattleNet/1338795/Replays/Autosaved/Multiplayer/");    // set this to your w3g file path
const newPath = ("C:/Users/steve/Documents/Warcraft III/BattleNet/1338795/Replays/Autosaved/Renamed/");    // set this to your w3g file path

// get list of all filenames in the directory and store in an array
const files = fs.readdirSync(currentPath);

// get first file in the directory
const file = files[0];
const birthtime = fs.statSync(currentPath + file).birthtime.toISOString();
console.log(birthtime);
const createdDate = fs.statSync(currentPath + file).birthtime.toISOString().
    replace(/T/, "_").
    replaceAll("-", "_").
    replaceAll(":", "_").
    replace(/\..+/, '');
console.log(createdDate);

(async () => {
    const result = await parser.parse(currentPath + file);
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

    var full_string = "[" + createdDate + "]" + team_0_string + "_VS_" + team_1_string;
    console.log(full_string)
    fs.rename(
        currentPath + file,
        newPath + full_string + ".w3g",
        function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Replay renamed to " + full_string + ".w3g");
        }
    });
})().catch(console.error);

