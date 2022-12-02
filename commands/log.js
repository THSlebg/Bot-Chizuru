const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

let projectpath = path.join(__dirname, "..")
let datapath = path.normalize(projectpath)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('log')
        .setDescription('Change channel for bot logs')
        .addChannelOption(option => option.setName('channel')
                .setDescription('The channel name to write the log into')
                .addChannelTypes(ChannelType.GuildText)),
    async execute(interaction) {
        let rawdata = fs.readFileSync(path.join(datapath, "data/serv_info.json"));
        const data = JSON.parse(rawdata);
        data.channelLog = interaction.options.getString('channel');
        fs.writeFile(path.join(datapath, "data/server_info.json"), JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.log("Problème lors du chargement des données dans le fichier json", err)
                return;
            }
            console.log("event_info.json updated");
        });
        await interaction.reply('Log channel changed to ' + interaction.options.getString('channel'))

    }
}