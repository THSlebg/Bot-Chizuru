const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('secret')
        .setDescription('no...'),
    async execute(interaction) {
        await interaction.reply("This is something that you should had never discovered... But at this point, maybe i should let you get a try... 💎 \nI'll be waiting for you darling...")
    },
}