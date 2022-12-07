const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js');

const duel = infos.duel;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(duel.name)
        .setDescription(duel.description),
    async execute(interaction) {

        const modal = new ModalBuilder()
            .setCustomId(duel.modal.id)
            .setTitle(duel.modal.title);

        for (let i = 0; i < duel.modal.rows.length; i++) {
            const row = duel.modal.rows[i];
            modal.addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId(row.id)
                            .setLabel(row.label)
                            .setPlaceholder(row.placeholder)
                            .setStyle(row.style)
                            .setMinLength(row.min)
                            .setMaxLength(row.max)
                            ));
        }
 
        await interaction.showModal(modal);
    }
}