const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var router = express.Router();
const fs = require('fs'); 
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var players = [
    { position: "1", alias: "jperez", password:"a9993e364706816aba3e25717850c26c9cd0d89d", name: "Jose", surname: "Perez", score: 1000, created: "2020-11-03T15:20:21.377Z", coins: 10, billetes: 0, habilidad1: 0, habilidad2: 1, habilidad3: 1, avatar: 0},
    { position: "2", alias: "jsanz", password:"40bd001563085fc35165329ea1ff5c5ecbdbbeef", name: "Juan", surname: "Sanz", score: 950, created: "2020-11-03T15:20:21.377Z", coins: 0, billetes: 0, habilidad1: 0, habilidad2: 0, habilidad3: 1, avatar: 0 },
    { position: "3", alias: "mgutierrez", password:"40bd001563085fc35165329ea1ff5c5ecbdbbeef", name: "Maria", surname: "Gutierrez", score: 850, created: "2020-11-03T15:20:21.377Z", coins: 0, billetes: 0, habilidad1: 0, habilidad2: 0, habilidad3: 1, avatar: 0 },
    { position: "4", alias: "rimbeldi", password:"hola123", name: "Aaron", surname: "Deza", score: "700", created: "2020-12-03T15:20:21.377Z", coins: 0, billetes: 0, habilidad1: 0, habilidad2: 0, habilidad3: 1, avatar: 0}
];
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
function login(paramAlias, paramPassword){
    ok = searcher(paramAlias);
    if(ok.thebool === true){
        if(paramPassword === players[ok.theindex].password){
            return players[ok.theindex];
        }else{
            //Contraseña incorrecta
            return "ErrorContra";
        }
    }
    else{
        //Jugador no existe
        return "ErrorUsuario";
    }
}
function searcher(data) {
    getjson();
    //El data.alias es el alias que envia el cliente (lo se por que hice un console 7.7)
    var index = players.findIndex(j => j.alias === data)
    var ok = false;
    //Si lo encuentra es false sino true
    if (index != -1) {
        ok = {thebool: true, theindex: index};
    }else{
        ok = {thebool: false, theindex: index};
    }
    return ok;
}
function comprobadorDeDatos(paramAlias, paramName, paramSurname, paramPassword/*paramScore*/){
    getjson();
    var hey = false;
    if (paramAlias === '' || paramName === '' || paramSurname === '' || paramPassword === ''){/*parseInt(paramScore) <= 0 || paramScore === '' || isNaN(paramScore) || paramScore === null*/
        hey = false;
    }else{
        hey = true;
    }
    return hey;
}
router.get('/login/:alias/:password', function(req,res){
    var paramAlias = req.params.alias || '';
    var paramPassword = req.params.password || '';
    /*
    var ok = login(paramAlias, paramPassword);
    if(ok !== false){
        res.send(ok);
    }else if(ok === "ErrorUsuario"){
        res.send("ErrorUsuario");
    }else if(ok === "ErrorContra"){
        res.send("ErrorContra");
    }
    */
   console.log("Hola");
});

module.exports.topJugadores = topJugadores;
module.exports = router;