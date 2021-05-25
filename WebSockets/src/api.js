const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var router = express.Router();
const fs = require('fs'); 
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var players = []
function savejson(){
    const str = JSON.stringify(players);
    const data = fs.writeFileSync('./src/player.json', str,'utf8');
}
function getjson(){
    const data = fs.readFileSync("./src/player.json", "utf8");
    players = JSON.parse(data);
}
getjson();
function UpdateRanking() {
    //Order the ranking
    players.sort((a, b) => (a.score <= b.score) ? 1 : -1);
    //Position Update
    for (var x = 0; x < players.length; x++) {
        players[x].position = x + 1;
    }
    savejson();
    getjson();
};
function topJugadores(){
    getjson();
    toplayers = [];
    var max = 0;
    if(players.length < 5){
        max = players.length;
    }else{
        max = 5;
    }
    for(i = 0; i < max ; i++){
        toplayers.push({
            alias: players[i].alias,
            score: players[i].score,
            coins: players[i].coins,
            billetes: players[i].billetes,
            avatar: players[i].avatar
        });
    }
    response = toplayers;
    return response;
}

module.exports.topJugadores = topJugadores;