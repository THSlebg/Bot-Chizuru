const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

let projectpath = path.join(__dirname, "..")
let datapath = path.normalize(projectpath)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Display current server event information'),
    async execute(interaction) {

        let rawdata = fs.readFileSync(path.join(datapath, "data/event_info.json"));
        let data = JSON.parse(rawdata);
        let eventColor = data.eventColor;
        let eventTitle = data.eventTitle;
        let eventPeriod = data.eventPeriod;
        let eventDescr = data.eventDescr;
        let eventAva = data.eventAva;

        const event = new EmbedBuilder()
            .setColor(eventColor)
            .setTitle("**ÉVÈNEMENT ACTIF** : " + eventTitle)
            .setDescription("*Informations relatives à l'évènement en cours sur le serveur...*")
            .setThumbnail("https://www.playerone.vg/wp-content/uploads/2020/08/Critica-de-Kanojo-Okarishimasu-destacada-El-Palomitron2-e1598033037864-370x305.jpg")
            .addFields({ name: "📃 Détails de l'évènement :", value: eventDescr },
                { name: "⌛ Période de l'évènement :", value: eventPeriod },
                { name: "🚹 Eligibilité : ", value: eventAva }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [event] });
    },
}