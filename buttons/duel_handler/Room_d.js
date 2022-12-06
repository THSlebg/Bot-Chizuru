const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

let datapath = path.join(__dirname, "../..").normalize()
let rawdata = fs.readFileSync(path.join(datapath, "data/server/duel_info.json"));
const duelinfo = JSON.parse(rawdata)

module.exports = {
    async execute(interaction) {

        if (interaction.customId === 'Room_+') {
            duelList.get(interaction.guild).set(interaction.member.user, 0);
            console.log(duelList);
        }

        const embed = new EmbedBuilder()
            .setTitle('Duel de Harem')
            .setDescription('Pour lancer le combat tous les joueurs doivent se mettre **prêts**')
            .addFields({ name: 'Joueurs prêts :', value: "**" + duelList.get(interaction.guild).size + "**/" + duelinfo.nbJ },
                { name: 'Rappel de la mise :', value: duelinfo.mise + "<:kakera:950050987412951051>" },
                { name: 'Score et roll :', value: "Premier à " + duelinfo.score + " points et roll sur " + duelinfo.roll })
            .setColor('d40f0f')

        if (duelList.get(interaction.guild).size < Number(duelinfo.nbJ)) {

            var ready = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("Ready_d")
                        .setLabel("Prêt !")
                        .setStyle(ButtonStyle.Success)
                        .setEmoji("🗡"),
                    new ButtonBuilder()
                        .setCustomId("Cancel_d")
                        .setLabel("Annuler le combat")
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji("❌"))
        }
        else {
            var ready = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('Synth_d').setLabel("Continuez")
                    .setStyle(ButtonStyle.Success).setEmoji("💮"),
                new ButtonBuilder()
                    .setCustomId("Cancel_d")
                    .setLabel("Annuler le combat")
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji("❌"))
        }
        await interaction.update({ embeds: [embed], components: [ready] })
    }
}