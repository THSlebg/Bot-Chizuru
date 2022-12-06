const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('duel')
        .setDescription('Start a duel with other users'),
    async execute(interaction) {

    const modal = new ModalBuilder()
                        .setCustomId('duel')
                        .setTitle("Paramètres du Duel");

    const betValue = new TextInputBuilder()
                        .setCustomId('bet')
                        .setLabel("Mise :")
                        .setPlaceholder('Max : 10.000')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(2)
                        .setMaxLength(4);


    const row = new TextInputBuilder()
                        .setCustomId('nbplayer')
                        .setLabel("Nombre de joueurs :")
                        .setPlaceholder("Au moins 2, sinon t'es le némesis du fun ...")
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(1)
                        .setMaxLength(2);

    const scoreMax = new TextInputBuilder()
                        .setCustomId('score')
                        .setLabel("Score à atteindre :")
                        .setPlaceholder("Wahh, 25 ça rsique d'être long ...")
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(1)
                        .setMaxLength(1);

    const rollMax = new TextInputBuilder()
                        .setCustomId('roll')
                        .setLabel("Nombre de roll max :")
                        .setPlaceholder('Valeur relative au plus petit harem habituellement')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(1)
                        .setMaxLength(4);

    const firstrow = new ActionRowBuilder().addComponents(betValue);
    const secondrow = new ActionRowBuilder().addComponents(row);
    const thirdrow = new ActionRowBuilder().addComponents(scoreMax);
    const fourthrow = new ActionRowBuilder().addComponents(rollMax);


    modal.addComponents(firstrow, secondrow, thirdrow, fourthrow)
    await interaction.showModal(modal)
                            
    },
}
