const { EmbedBuilder } = require('discord.js');

const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "..").normalize();
const rawdata = fs.readFileSync(path.join(datapath, "data/feedback_info.json"));
const feedbackinfo = JSON.parse(rawdata);

module.exports = {
    async execute(interaction) {
        console.log(interaction.member.user);
        const embed = new EmbedBuilder()
            .setColor("03ecfc")
            .setTitle(interaction.member.user.username)
            .addFields({ name: interaction.fields.getTextInputValue('object'), value: interaction.fields.getTextInputValue('description') })
            .setThumbnail(interaction.member.user.displayAvatarURL())
            .setFooter({ text: 'Diamond Corp © • Feedback', iconURL: "https://i.imgur.com/JhGXd01.jpg" })
            .setTimestamp();

        try {
            interaction.client.guilds.cache.get(feedbackinfo.feedbackGuild_id).channels.cache.get(feedbackinfo.feedbackChannel_id).send({ embeds: [embed] });
        } catch (error) {
            interaction.reply({ content: 'An error has occured while transfering your feedback to the devs. Try again later...', ephemeral: true });
            console.log(error);
        } finally {
            interaction.reply({ content: 'Message sent to developpers! Thanks for sharing with us your opinion! ', ephemeral: true });
        }
    }
}
