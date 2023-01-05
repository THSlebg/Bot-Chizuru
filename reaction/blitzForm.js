const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "..").normalize();
const rawdata = fs.readFileSync(path.join(datapath, "data/server/blitz_info.json"));
const blitz_info = JSON.parse(rawdata);

module.exports = {
    async execute(interaction) {

        if(blitzList.has(interaction.guild)){
            interaction.reply("Un duel est déjà en cours sur ce serveur. Veuillez ré-essayer lorsque celui-ci aura conclu.");
        }
        else {
            blitz_info.mise = interaction.fields.getTextInputValue('bet');
            blitz_info.nbJ = interaction.fields.getTextInputValue('nbplayer');
            blitz_info.roll = interaction.fields.getTextInputValue('roll');
            blitz_info.score = interaction.fields.getTextInputValue('score');
            blitz_info.replay = 0;

            console.log("Duel settings : \n" + blitz_info); // pour papyK, mdr

            fs.writeFile(path.join(datapath, "data/server/blitz_info.json"), JSON.stringify(blitz_info, null, 2), (err) => {
                if (err) {
                    console.log("Problème lors du chargement des données dans le fichier blitz_info.json", err);
                    return;
                }
                console.log("blitz_info.json  updated");
            });

            const embed = new EmbedBuilder()
                .setTitle('⚔ Blitz !! (PvP NRV Bitch!)')
                .setDescription("Pour lancer l'affrontement tous les joueurs doivent se mettre **prêts**")
                .addFields({ name: 'Joueurs prêts :', value: "0/" + blitz_info.nbJ },
                    { name: 'Rappel de la mise :', value: blitz_info.mise + "<:kakera:950050987412951051>" },
                    { name: 'Score et roll :', value: "Premier à " + blitz_info.score + " points et roll sur " + blitz_info.roll })
                .setColor('d40f0f');

            const ready = new ActionRowBuilder()
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
            
            
            blitzList.set(interaction.guild, new Map());

            interaction.reply({ embeds: [embed], components: [ready] });
        }
    }
}