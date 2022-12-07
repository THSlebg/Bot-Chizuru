const { SlashCommandBuilder } = require("discord.js");

const alpha = infos.alpha;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(alpha.name)
        .setDescription(alpha.description),
    async execute(interaction) {
        interaction.reply(alpha.reply);
    }
}