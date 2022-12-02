const fs = require('fs');
const path = require('path');

let datapath = path.join(__dirname, "..").normalize()
let rawdata = fs.readFileSync(path.join(datapath, "data/event_info.json"));
const eventinfo = JSON.parse(rawdata)

module.exports = {
    async execute(interaction) {
        eventinfo.eventTitle = interaction.fields.getTextInputValue('title');
        eventinfo.eventDescr = interaction.fields.getTextInputValue('description');
        eventinfo.eventPeriod = interaction.fields.getTextInputValue('period');
        eventinfo.eventAva = interaction.fields.getTextInputValue('ave');
        if (!interaction.fields.getTextInputValue('color')){
            eventinfo.eventColor = '5bed07';
        }
        else {
        eventinfo.eventColor = interaction.fields.getTextInputValue('color');
        }
        fs.writeFile(path.join(datapath, "data/event_info.json"), JSON.stringify(eventinfo, null, 2), (err) => {
            if (err) {
                console.log("Problème lors du chargement des données dans le fichier json", err)
                return;
            }
            console.log("event_info.json updated");
        });
        interaction.reply('Event info updated!')
    },
}