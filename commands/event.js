const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const projectpath = path.join(__dirname, "..");
const datapath = path.normalize(projectpath);

const event = infos.event;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(event.name)
        .setDescription(event.description),
    async execute(interaction) {
        const rawdata = fs.readFileSync(path.join(datapath, event.infospath[0] + interaction.guild.id + event.infospath[1]));
        const data = JSON.parse(rawdata);

        const eventBuilder = new EmbedBuilder()
            .setColor(data.eventColor)
            .setTitle(event.embed.title + data.eventTitle)
            .setDescription(event.embed.description)
            .setThumbnail(event.embed.thumbnail)
            .addFields(
                //maybe boucle
                { name: event.embed.fields[0], value: data.eventDescr },
                { name: event.embed.fields[1], value: data.eventPeriod },
                { name: event.embed.fields[2], value: data.eventAva }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [eventBuilder] });
    }
}