const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const embedHelp = infos.embedhelp;

const embed = new EmbedBuilder()
    .setColor(embedHelp.embed.color)
    .setTitle(embedHelp.embed.title)
    .setDescription(embedHelp.embed.description)
    .setThumbnail(embedHelp.embed.thumbnail)
    .setTimestamp();

for (let i in infos) {
    embed.addFields({name:"/" + infos[i].name, value: infos[i].description});
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName(embedHelp.name)
        .setDescription(embedHelp.description),
    async execute(interaction) {
        await interaction.reply({ embeds: [embed] });
    }
}