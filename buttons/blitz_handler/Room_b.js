const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "../..").normalize();
const blitzinfos = infos.blitz

module.exports = {
    async execute(interaction) {

        const rawdata = fs.readFileSync(path.join(datapath, blitzinfos.infospath[0] + interaction.guild.id + blitzinfos.infospath[1]));
        const blitz_info = JSON.parse(rawdata);

        if (interaction.customId === 'Room_+b') {
            blitzList.get(interaction.guild).set(interaction.member.user, 0);
            console.log(blitzList);
        }

        const embed = new EmbedBuilder()
            .setTitle('Blitz')
            .setDescription("Pour lancer l'affrontement, tous les joueurs doivent se mettre **prêts**")
            .addFields(
                { name: 'Joueurs prêts :', value: "**" + blitzList.get(interaction.guild).size + "**/" + blitz_info.nbJ },
                { name: 'Rappel de la mise :', value: blitz_info.mise + "<:kakera:950050987412951051>" },
                { name: 'Score et roll :', value: "Premier à " + blitz_info.score + " points et roll sur " + blitz_info.roll })
            .setColor('821fcf');
            
        let ready;
        
        if (blitzList.get(interaction.guild).size < Number(blitz_info.nbJ)) {
            ready = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("Ready_b")
                        .setLabel("Prêt !")
                        .setStyle(ButtonStyle.Success)
                        .setEmoji("🗡"),
                    new ButtonBuilder()
                        .setCustomId("Cancel_b")
                        .setLabel("Annuler le combat")
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji("❌"));
        } else {
            ready = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('Synth_b')
                    .setLabel("Continuer")
                    .setStyle(ButtonStyle.Success).setEmoji("🥊"),
                new ButtonBuilder()
                    .setCustomId("Cancel_b")
                    .setLabel("Annuler le combat")
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji("❌"));
        }
        await interaction.update({ embeds: [embed], components: [ready] });
    }
}