const { SlashCommandBuilder } = require('discord.js');

const hi = infos.hi;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(hi.name)
        .setDescription(hi.description),
    async execute(interaction) {
        await interaction.reply(hi.reply);
    }
}