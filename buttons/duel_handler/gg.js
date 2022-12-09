const { EmbedBuilder } = require('discord.js');

module.exports = {
    async execute(interaction) {
        player = interaction.customId.split("|")[1]
        amount = interaction.customId.split("|")[2];

        const embed = new EmbedBuilder()
            .setTitle('Bravo !')
            .setDescription('Félicitation à ' + player + '! \nTu remportes **' + amount + '** <:kakera:950050987412951051>')
            .setTimestamp()
            .setThumbnail('https://i.pinimg.com/170x/ce/85/ef/ce85efd957f47dcbcd3adc5d06097c2a.jpg')

        interaction.update({embeds: [embed], components: []})
    }
}