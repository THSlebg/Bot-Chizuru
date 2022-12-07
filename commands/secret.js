const { SlashCommandBuilder } = require('discord.js');

const secret = infos.secret;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(secret.name)
        .setDescription(secret.description),
    async execute(interaction) {
        await interaction.reply(secret.reply);
    }
}