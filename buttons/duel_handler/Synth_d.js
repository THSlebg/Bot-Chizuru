const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

const duelinfos = infos.duel;
const datapath = path.join(__dirname, "../..").normalize();

module.exports = {
    async execute(interaction) {

        const rawdata = fs.readFileSync(path.join(datapath, duelinfos.infospath[0] + interaction.guild.id + duelinfos.infospath[1]));
        const duelinfo = JSON.parse(rawdata);
        
        if(duelinfo.replay != 0){
            for (const x of duelList.get(interaction.guild).keys()){
                duelList.get(interaction.guild).set(x, 0);
                console.log("je reset" + duelList.get(interaction.guild).get(x))
            }
            duelinfo.replay = 0,
            fs.writeFile(path.join(datapath, duelinfos.infospath[0] + interaction.guild.id + duelinfos.infospath[1]), JSON.stringify(duelinfo, null, 2), (err) => {
                if (err) {
                    console.log("Problème lors du chargement des données dans le fichier duel_info.json", err);
                    return;
                }
                console.log("duel_info.json  updated");
            });
        }

        let concat = "";
        for (const x of duelList.get(interaction.guild).keys()) {
            concat += x.username;
            concat += "\n";
        }

        const resume = new EmbedBuilder()
            .setColor("eb4034")
            .setTitle("🔪 Détails du combat : ")
            .setDescription("Pour modifier les valeurs max de score et de rolls, utilisez respectivement les commandes **rent!score** et **rent!roll**.")
            .setThumbnail("https://i.imgur.com/EI9kJ6a.jpg")
            .addFields({ name: "Score à atteindre :", value: duelinfo.score })
            .addFields({ name: "Roll max :", value: duelinfo.roll })
            .addFields({ name: "Mise :", value: duelinfo.mise })
            .addFields({ name: "Joueurs (" + duelinfo.nbJ + ") :", value: concat })
            .setTimestamp();

        const Gogo = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
                .setCustomId("Start_d")
                .setLabel("Commencer le DUEL !")
                .setStyle(ButtonStyle.Success)
                .setEmoji("⚔"))
            .addComponents(new ButtonBuilder()
                .setCustomId("Cancel_d")
                .setLabel("Annuler le combat")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("❌"));

        await interaction.update({ embeds: [resume], components: [Gogo] });
    }
}