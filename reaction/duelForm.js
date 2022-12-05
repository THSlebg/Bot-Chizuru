const fs = require('fs');
const path = require('path');

let datapath = path.join(__dirname, "..").normalize()
let rawdata = fs.readFileSync(path.join(datapath, "data/server/duel_info.json"));
const duelinfo = JSON.parse(rawdata)

module.exports = {
    async execute(interaction){
        duelinfo.mise = interaction.fields.getTextInputValue('bet');
        duelinfo.nbJ = interaction.fields.getTextInputValue('nbplayer');
        duelinfo.roll = interaction.fields.getTextInputValue('roll');
        duelinfo.score = interaction.fields.getTextInputValue('score');
    fs.writeFile(path.join(datapath, "data/server/duel_info.json"), JSON.stringify(duelinfo, null, 2), (err) => {
            if (err) {
                console.log("Problème lors du chargement des données dans le fichier duel_info.json", err)
                return;
            }
            console.log("duel_info.json  updated");
        })
    }
}