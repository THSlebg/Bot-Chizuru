const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display available commands'),
    async execute(interaction) {
        let commands = "\n - date \n - hi \n - help \n - version \n - embedHelp \n - event \n - setEvent \n - duel \n - roll \n - score \n - log \n - testLog \n - makeLog \n - setEmoji \n - patchnote\n - feedback\n - alpha";
        await interaction.reply("**__List of commands :__**" + commands);
    },
}