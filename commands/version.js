const { SlashCommandBuilder } = require('discord.js');
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('version')
        .setDescription('Display current bot version'),
    async execute(interaction) {
        await interaction.reply("Chizuru is so happy! She has been update to version " + process.env.BOTVERSION)
    },
}