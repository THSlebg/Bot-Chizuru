const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const testlog = infos.testlog;

const datapath = path.join(__dirname, "..").normalize();

module.exports = {
    data: new SlashCommandBuilder()
        .setName(testlog.name)
        .setDescription(testlog.description),
    async execute(interaction) {
        const rawdata = fs.readFileSync(path.join(datapath, infos.log.infospath[0] + interaction.guild.id + infos.log.infospath[1]));
        const data = JSON.parse(rawdata);
        interaction.reply({ content: infos.makelog.reply[0] + data.id + infos.makelog.reply[1], ephemeral: infos.makelog.reply[2] });
        interaction.guild.channels.cache.get(data.id).send(testlog.successmsg);
    }
}