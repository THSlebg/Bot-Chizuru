const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { defaultMaxListeners } = require('events');
const fs = require('fs');
const path = require('path');

let datapath = path.join(__dirname, "../..").normalize()
let rawdata = fs.readFileSync(path.join(datapath, "data/server/duel_info.json"));
const duelinfo = JSON.parse(rawdata)

module.exports = {
    async execute(interaction) {

        concat = "";
        for (const x of duelList.get(interaction.guild).keys()) {
            concat += x.username;
            concat += "\n";
          }
        
        const resume = new EmbedBuilder()
        .setColor("eb4034")
        .setTitle("🔪 Détails du combat : ")
        .setDescription("Pour modifier les valeurs max de score et de rolls, utilisez respectivement les commandes **rent!score** et **rent!roll**.")
        .setThumbnail("https://i0.wp.com/9tailedkitsune.com/wp-content/uploads/2020/08/Snimka-obrazovky-394.png")
        .addFields({name:"Score à atteindre :", value: duelinfo.score})
        .addFields({name:"Roll max :", value: duelinfo.roll})
        .addFields({name:"Mise :", value: duelinfo.mise})
        .addFields({name: "Joueurs" + duelinfo.nbJ + " :", value: concat})
        .setTimestamp();

    var Gogo = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
            .setCustomId("Start_d")
            .setLabel("Commencer le DUEL !")
            .setStyle(ButtonStyle.Success)
            .setEmoji("⚔"))
        .addComponents(new ButtonBuilder()
            .setCustomId("Cancel_d")
            .setLabel("Annuler le combat")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("❌")
        );

        await interaction.update({embeds:[resume], components: [Gogo]});
    }
}