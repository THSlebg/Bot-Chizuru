const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const projectpath = path.join(__dirname, "..");
const datapath = path.normalize(projectpath);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Display current server event information'),
    async execute(interaction) {
        const rawdata = fs.readFileSync(path.join(datapath, "data/event_info.json"));
        const data = JSON.parse(rawdata);
        const eventColor = data.eventColor;
        const eventTitle = data.eventTitle;
        const eventPeriod = data.eventPeriod;
        const eventDescr = data.eventDescr;
        const eventAva = data.eventAva;

        const event = new EmbedBuilder()
            .setColor(eventColor)
            .setTitle("**ÉVÈNEMENT ACTIF** : " + eventTitle)
            .setDescription("*Informations relatives à l'évènement en cours sur le serveur...*")
            .setThumbnail("https://www.playerone.vg/wp-content/uploads/2020/08/Critica-de-Kanojo-Okarishimasu-destacada-El-Palomitron2-e1598033037864-370x305.jpg") //maybe imgur link pour éviter le trolling
            .addFields(
                { name: "📃 Détails de l'évènement :", value: eventDescr },
                { name: "⌛ Période de l'évènement :", value: eventPeriod },
                { name: "🚹 Eligibilité : ", value: eventAva }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [event] });
    }
}