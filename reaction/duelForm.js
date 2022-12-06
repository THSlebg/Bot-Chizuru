const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
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

        console.log("Duel settings : \n" + duelinfo) // pour papyK

    fs.writeFile(path.join(datapath, "data/server/duel_info.json"), JSON.stringify(duelinfo, null, 2), (err) => {
            if (err) {
                console.log("Problème lors du chargement des données dans le fichier duel_info.json", err)
                return;
            }
            console.log("duel_info.json  updated");
        })
    
    const embed = new EmbedBuilder()
        .setTitle('Duel de Harem')
        .setDescription('Pour lancer le combat tous les joueurs doivent se mettre **prêtes**"')
        .addFields( {name: 'Joueurs prêts :', value: "0/" + duelinfo.nbJ},
                    {name: 'Rappel de la mise :', value: duelinfo.mise + "<:kakera:950050987412951051>"},
                    {name: 'Score et roll :', value: "Premier à " + duelinfo.score + " points et roll sur " + duelinfo.roll})
        .setColor('d40f0f')

    var ready = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder()
            .setCustomId("Ready")
            .setLabel("Prêt !")
            .setStyle(ButtonStyle.Success)
            .setEmoji("🗡"),
        new ButtonBuilder()
            .setCustomId("Stop")
            .setLabel("Annuler le combat")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("❌"))

    interaction.reply({embeds: [embed], components: [ready]})
    }
}