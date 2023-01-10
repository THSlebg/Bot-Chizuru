const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const blitzr = infos.blitzrule;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(blitzr.name)
        .setDescription(blitzr.descr),
    async execute(interaction) {

        const rule = new EmbedBuilder()
            .setTitle(blitzr.title)
            .setDescription(blitzr.description)
            .addFields({name: blitzr.objectif[0], value: blitzr.objectif[1]},
            {name : blitzr.prep[0], value: blitzr.prep[1]},
            {name: blitzr.game[0], value: blitzr.game[1]},
            {name: blitzr.win[0], value: blitzr.win[1]})
            .setThumbnail(blitzr.thumbnail)
    
        interaction.reply({embeds: [rule]})    
        }
}