const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "../..").normalize();
const rawdata = fs.readFileSync(path.join(datapath, "data/server/duel_info.json"));
const duelinfo = JSON.parse(rawdata);

module.exports = {
    async execute(interaction) {

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
            .addFields({ name: "Joueurs" + duelinfo.nbJ + " :", value: concat })
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