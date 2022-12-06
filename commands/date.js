const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('date')
        .setDescription('Basic command, you can check if the bot is working'),
    async execute(interaction) {
        await interaction.reply("I'm all yours for now!");
    }
}