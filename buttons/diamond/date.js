const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require('fs');
const path = require('path');

module.exports = {
    async execute(interaction) {
        const datapath = path.join(__dirname, "../..").normalize();
        const rowdata = fs.readFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"));
        const userdata = JSON.parse(rowdata);

        if(!(interaction.customId === "Date" && !userRent.has(interaction.member.user.id)) && !(interaction.customId === "Date_resume"  && userRent.has(interaction.member.user.id)))
        {
            interaction.reply({content: "Selon la politique d'utilisation de Diamond Inc. ©, les doubles dates ou toutes formes de multi-dating via l'application sont prohibés.", ephemeral: true});
        }
        else
        {
            if (interaction.customId === "Date" && !userRent.has(interaction.member.user.id)) 
                {
                    indexgirl = Number(interaction.message.embeds[0].data.footer.text.substring(interaction.message.embeds[0].data.footer.text.indexOf('x')+1));
                    console.log("index girl : " + indexgirl);
                    userRent.set(interaction.member.user.id, [Date.now(), indexgirl, "Neutral", 0]);
                }
            girl = gf[Object.keys(gf)[userRent.get(interaction.member.user.id)[1]]];

            const RGF = new EmbedBuilder()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND - Date overview ")
                .addFields({name: "Purchase:", value: "You have rented " + girl.name + " for one hour."},
                {name: 'Rented by:', value: interaction.member.user.username})
                .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                .setTimestamp();
            
            switch(userRent.get(interaction.member.user.id)[2])
                {
                    case 'Neutral':
                        RGF.setDescription(girl.name + " sort avec vous !");
                        RGF.setImage(girl.rentedIMG);
                        break
                    case 'Happy':
                        RGF.setDescription(girl.name + " est heureuse de passer ce moment avec vous !");
                        RGF.setImage(girl.rentedIMGHappy);
                        break
                    case 'Angry':
                        RGF.setDescription(girl.name + " semble confuse...");
                        RGF.setImage(girl.rentedIMGAngry);
                        break
                    default:
                        break
                }
        
            var BackHome = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                        .setCustomId("Gift")
                        .setLabel("Give a present")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("🎁"))
        
            if(userdata.owned_chocolate > 0 || userdata.owned_knife > 0 || userdata.owned_teddybear > 0)
                {
                    BackHome.addComponents(new ButtonBuilder()
                        .setCustomId("GiftA")
                        .setLabel("Give an awkward present")
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji("🎒"))
                }
        
            BackHome.addComponents(new ButtonBuilder()
                .setCustomId("Home")
                .setLabel("Back Home Page")
                .setStyle(ButtonStyle.Success)
               .setEmoji("🏡"));
                
            await interaction.update({embeds:[RGF], components: [BackHome]});
        }
    }
}