const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const setevent = infos.setevent;

const datapath = path.join(__dirname, "..").normalize();


module.exports = {
    data: new SlashCommandBuilder()
        .setName(setevent.name)
        .setDescription(setevent.description),
    async execute(interaction) {
        const rawdata = fs.readFileSync(path.join(datapath, infos.event.infospath[0] + interaction.guild.id + infos.event.infospath[1]));
        const data = JSON.parse(rawdata);

        const modal = new ModalBuilder()
            .setCustomId('eventForm')
            .setTitle('setEvent Form')

        for (let i = 0; i < setevent.modal.rows.length; i++) {
            const row = setevent.modal.rows[i];
            modal.addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId(row.id)
                            .setLabel(row.label)
                            .setPlaceholder(row.placeholder)
                            .setRequired(row.required)
                            .setStyle(row.style)
                            .setValue(data[row.id])
                    ));
        }

        await interaction.showModal(modal);
    }
}
