const { EmbedBuilder } = require('discord.js');

const fs = require('fs');
const path = require('path');

let datapath = path.join(__dirname, "..").normalize()
let rawdata = fs.readFileSync(path.join(datapath, "data/feedback_info.json"));
const feedbackinfo = JSON.parse(rawdata)

module.exports = {
    async execute(interaction)  {
    const embed = new EmbedBuilder()
            .setColor("5f5f5f")
            .setTitle(interaction.fields.getTextInputValue('object'))
            .setDescription(interaction.fields.getTextInputValue('description'))
            .setThumbnail(interaction.user.avatar.url)
            .setTimestamp();
        
    interaction.reply({content: 'Message sent to developpers ! Thanks for sharing with us your opinion! ', ephemeral: true});
    interaction.guild.channels.cache.get(feedbackinfo.feedbackChannel_id).send({embeds: [embed]})
    }
}
