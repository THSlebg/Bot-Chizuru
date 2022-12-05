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
    
    try {
        const omegaguild = fs.readFileSync(path.join(datapath, "data/main_guild_info.json"));
        const omegachannel = fs.readFileSync(path.join(datapath, "data/feedback_info.json"));
        omegaguild.channels.get(omegachannel.feedbackChannel_id).send({embeds: [embed]})
    } catch (error) {
        interaction.reply({content: 'An error has occured while transfering your feedback to the devs. Try again later ...', ephemeral: true});
        console.log(error);
    }
    finally {
        interaction.reply({content: 'Message sent to developpers ! Thanks for sharing with us your opinion! ', ephemeral: true});
    }
        
    
    
    console.log(interaction.guild.channels.cache.get("957264445392949288"))
    
    }
}
