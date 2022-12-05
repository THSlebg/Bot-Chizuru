const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

let datapath = path.join(__dirname, "..").normalize()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('makelog')
        .setDescription('send a custom log to log channel')
        .addStringOption(option => option
            .setName('content')
            .setDescription('the content to echo into the log message')
            .setRequired(true)),
    async execute(interaction) {
        let rawdata = fs.readFileSync(path.join(datapath, "data/log_info.json"));
        const data = JSON.parse(rawdata);
        interaction.reply({content: 'Message sent to channel: <#' + data.id + '>', ephemeral: true});
        interaction.guild.channels.cache.get(data.id).send(interaction.options.getString('content'))
    }
}
