const { SlashCommandBuilder } = require('discord.js');

const date = infos.date;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(date.name)
        .setDescription(date.description),
    async execute(interaction) {
        await interaction.reply(date.reply);
    }
}