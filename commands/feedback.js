const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

const modal = new ModalBuilder()
    .setCustomId('feedbackForm')
    .setTitle('Chizuru is listening to you ...');

const eventTitle = new TextInputBuilder()
    .setCustomId('object')
    .setLabel('Feedback Object')
    .setRequired(true)
    .setPlaceholder('What is your feedback about ?')
    .setStyle(TextInputStyle.Short);

const eventDesc = new TextInputBuilder()
    .setCustomId('description')
    .setLabel('Feedback content')
    .setPlaceholder('Tell me more ...')
    .setStyle(TextInputStyle.Paragraph);

const firstrow = new ActionRowBuilder().addComponents(eventTitle);
const secondrow = new ActionRowBuilder().addComponents(eventDesc);

modal.addComponents(firstrow, secondrow)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('feedback')
        .setDescription("Send a feedback to Chizuru's developers"),
    async execute(interaction) {
        await interaction.showModal(modal);
    }
}