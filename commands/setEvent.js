const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

let datapath = path.join(__dirname, "..").normalize()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setevent')
        .setDescription('Set Up the new server event'),
    async execute(interaction) {

        let rawdata = fs.readFileSync(path.join(datapath, "data/event_info.json"));
        let data = JSON.parse(rawdata);

        const modal = new ModalBuilder()
            .setCustomId('eventForm')
            .setTitle('setEvent Form');

        const eventTitle = new TextInputBuilder()
            .setCustomId('title')
            .setLabel('Fill in the field your event title')
            .setRequired(true)
            .setPlaceholder(data.eventTitle)
            .setStyle(TextInputStyle.Short);

        const eventDesc = new TextInputBuilder()
            .setCustomId('description')
            .setLabel('Event details')
            .setPlaceholder('Raconte pas trop ta vie steuplé')
            .setStyle(TextInputStyle.Paragraph);

        const eventTime = new TextInputBuilder()
            .setCustomId('period')
            .setLabel('Starting date - Ending Date')
            .setPlaceholder('Un début et une fin, pas plus du con')
            .setStyle(TextInputStyle.Short);

        const eventAvala = new TextInputBuilder()
            .setCustomId('ave')
            .setLabel('Who can participate')
            .setPlaceholder(data.eventAva)
            .setStyle(TextInputStyle.Short);

        const eventColor = new TextInputBuilder()
            .setCustomId('color')
            .setLabel('Side bar embed color')
            .setValue('123abc')
            .setRequired(false)
            .setStyle(TextInputStyle.Short);

        const firstrow = new ActionRowBuilder().addComponents(eventTitle);
        const secondrow = new ActionRowBuilder().addComponents(eventDesc);
        const thirdrow = new ActionRowBuilder().addComponents(eventTime);
        const fourthrow = new ActionRowBuilder().addComponents(eventAvala);
        const fifthrow = new ActionRowBuilder().addComponents(eventColor);

        modal.addComponents(firstrow, secondrow, thirdrow, fourthrow, fifthrow)

        await interaction.showModal(modal)
	},
}
