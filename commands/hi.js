const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hi')
        .setDescription('Chizuru is glad to meet you'),
    async execute(interaction) {
        await interaction.reply("Hey, I'm Chizuru Ichinose, nice to meet you ♥\nI would love to get to know you more, call me whenever you want 👋");
    }
}