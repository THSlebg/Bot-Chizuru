const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js');

const feedback = infos.feedback;

const modal = new ModalBuilder()
    .setCustomId(feedback.modal.id)
    .setTitle(feedback.modal.title)

for (let i = 0; i < feedback.modal.rows.length; i++) {
    const row = feedback.modal.rows[i];
    modal.addComponents(
        new ActionRowBuilder()
            .addComponents(
                new TextInputBuilder()
                    .setCustomId(row.id)
                    .setLabel(row.label)
                    .setPlaceholder(row.placeholder)
                    .setStyle(row.style)
            ));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName(feedback.name)
        .setDescription(feedback.description),
    async execute(interaction) {
        await interaction.showModal(modal);
    }
}