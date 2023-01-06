const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const makelog = infos.makelog;

const datapath = path.join(__dirname, "..").normalize();

module.exports = {
    data: new SlashCommandBuilder()
        .setName(makelog.name)
        .setDescription(makelog.description)
        .addStringOption(option => option
            .setName(makelog.stringoption.name)
            .setDescription(makelog.stringoption.description)
            .setRequired(makelog.stringoption.required)),
    async execute(interaction) {
        const rawdata = fs.readFileSync(path.join(datapath, infos.log.infospath[0] + interaction.guild.id + infos.log.infospath[1]));
        const data = JSON.parse(rawdata);
        interaction.reply({ content: makelog.reply[0] + data.id + makelog.reply[1], ephemeral: makelog.reply[2] });
        interaction.guild.channels.cache.get(data.id).send(interaction.options.getString('content'));
    }
}
