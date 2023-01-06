const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "..").normalize();
const duel = infos.duel;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(duel.name)
        .setDescription(duel.description),
    async execute(interaction) {

        const rawdata = fs.readFileSync(path.join(datapath, duel.infospath[0] + interaction.guild.id + duel.infospath[1]))
        const data = JSON.parse(rawdata);

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
                            .setValue(data[row.id])
                            ));
        }
 
        await interaction.showModal(modal);
    }
}