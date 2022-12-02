const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

let datapath = path.join(__dirname, "..").normalize()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testlog')
        .setDescription('send log to lo log channel'),
    async execute(interaction) {
        let rawdata = fs.readFileSync(path.join(datapath, "data/log_info.json"));
        const data = JSON.parse(rawdata);
        interaction.reply({content: 'Message sent to channel: <#' + data.id + '>', ephemeral: true});
        interaction.guild.channels.cache.get(data.id).send('This is where my logs are sent ♥')
    }
    
}