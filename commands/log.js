const { SlashCommandBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "..").normalize()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('log')
        .setDescription('Change channel for bot logs')
        .addChannelOption(option => option.setName('channel')
            .setDescription('The channel name to write the log into')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)),
    async execute(interaction) {
        const rawdata = fs.readFileSync(path.join(datapath, "data/log_info.json"));
        const data = JSON.parse(rawdata);
        const old = data.id;
        console.log(old);
        data.id = interaction.options.getChannel('channel').id;
        data.guild_id = interaction.options.getChannel('channel').guild_id;
        data.name = interaction.options.getChannel('channel').name;
        data.type = interaction.options.getChannel('channel').type;
        fs.writeFile(path.join(datapath, "data/log_info.json"), JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.log("Problème lors du chargement des données dans le fichier json", err);
                return;
            }
            console.log("event_info.json updated");
        });
        await interaction.reply('Log channel changed to <#' + data.id + '>. Previously was <#' + old + ">");
    }
}