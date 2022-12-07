const { SlashCommandBuilder } = require('discord.js');

const help = infos.help;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(help.name)
        .setDescription(help.description),
    async execute(interaction) {
        await interaction.reply(help.reply);
    }
}