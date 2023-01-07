const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    async execute(interaction) {

        const pp = interaction.member.user.displayAvatarURL();

        if (!blitzList.get(interaction.guild).has(interaction.member.user)) {
            const embedPlayer = new EmbedBuilder()
                .setColor("000000")
                .setTitle("Nouveau Joueur")
                .setDescription(interaction.member.user.username + ", es-tu prêt à en découdre ?")
                .setThumbnail(pp)
                .setTimestamp();

            const confirm = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId("Room_+b")
                    .setLabel("OUI")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("✔"))
                .addComponents(new ButtonBuilder()
                    .setCustomId("Room_nb")
                    .setLabel("Enfaite... non")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("💨"));

            await interaction.update({ embeds: [embedPlayer], components: [confirm] });
        }
        else if (blitzList.get(interaction.guild).has(interaction.member.user)) {
            const relouPlayer = new EmbedBuilder()
                .setColor("DCDDCD")
                .setTitle("Mate le gros relou :")
                .setDescription(interaction.user.username + ", vous êtes déjà préparé à ce combat épique, stop spam guignol !")
                .setThumbnail(pp)
                .setTimestamp();

            const clc = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId("Room_nb")
                    .setLabel("Ok j'arrête...")
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji("🆗"));

            await interaction.update({ embeds: [relouPlayer], components: [clc] });
        }
    }
}