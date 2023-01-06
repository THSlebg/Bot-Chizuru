const fs = require('fs');
const path = require('path');

const eventinfos = infos.event

module.exports = {
    async execute(interaction) {
                
        const datapath = path.join(__dirname, "..").normalize();
        const rawdata = fs.readFileSync(path.join(datapath, eventinfos.infospath[0] + interaction.guild.id + eventinfos.infospath[1]));
        const eventinfo = JSON.parse(rawdata);

        eventinfo.eventTitle = interaction.fields.getTextInputValue('eventTitle');
        eventinfo.eventDescr = interaction.fields.getTextInputValue('eventDescr');
        eventinfo.eventPeriod = interaction.fields.getTextInputValue('eventPeriod');
        eventinfo.eventAva = interaction.fields.getTextInputValue('eventAva');
        if (!interaction.fields.getTextInputValue('eventColor'))
            eventinfo.eventColor = '5bed07';
        else
            eventinfo.eventColor = interaction.fields.getTextInputValue('eventColor');

        fs.writeFile(path.join(datapath, eventinfos.infospath[0] + interaction.guild.id + eventinfos.infospath[1]), JSON.stringify(eventinfo, null, 2), (err) => {
            if (err) {
                console.log("Problème lors du chargement des données dans le fichier event_info.json", err);
                return;
            }
            console.log("event_info.json updated");
        });
        interaction.reply('Event info updated!');
    }
}