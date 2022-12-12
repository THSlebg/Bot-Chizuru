const { ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const fs = require('fs');
const path = require('path');

module.exports = {
    async execute(interaction) {
        if(interaction.message.interaction.user.id === interaction.member.user.id) {
                
            const datapath = path.join(__dirname, "../..").normalize();
            const rowdata = fs.readFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"));
            const userdata = JSON.parse(rowdata);

            var Connect = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId("Home")
                    .setLabel("Log To DIAMOND")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("💎"));

            interaction.update({content: "**INSTALLATION TERMINÉE** \nConnexion à DIAMOND.app \n**Login : [" + userdata.appname + "]** \n**Password : **⏹⏹⏹⏹⏹⏹⏹", components: [Connect]});
        }
        else 
        {
            interaction.reply("Je suis sincèrement désolé mon adorable " + interaction.member.user.username + " mais cette instance est reservé à une personne que j'apprécie bien plus que toi...");
        }
    }
}