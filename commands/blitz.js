const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "..").normalize();
const blitz = infos.blitz;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(blitz.name)
        .setDescription(blitz.description),
    async execute(interaction) {

        const rawdata = fs.readFileSync(path.join(datapath, blitz.infospath[0] + interaction.guild.id + blitz.infospath[1]))
        const data = JSON.parse(rawdata);

        const modal = new ModalBuilder()
            .setCustomId(blitz.modal.id)
            .setTitle(blitz.modal.title);

        for (let i = 0; i < blitz.modal.rows.length; i++) {
            const row = blitz.modal.rows[i];
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