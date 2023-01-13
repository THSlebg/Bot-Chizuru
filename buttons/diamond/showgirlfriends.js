const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require('fs');
const { globalAgent } = require("http");
const path = require('path');

module.exports = {
    async execute(interaction) {
        if(interaction.message.interaction.user.id === interaction.member.user.id){
            const datapath = path.join(__dirname, "../..").normalize();
            const rowdata = fs.readFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"));
            const userdata = JSON.parse(rowdata);

            if(!index.has(interaction.member.user.id)){
                index.set(interaction.member.user.id, 0);
            }
            if(interaction.customId === "GF+") {
                index.set(interaction.member.user.id, index.get(interaction.member.user.id)+1);
            }
            else if(interaction.customId === "GF-") {
                index.set(interaction.member.user.id, index.get(interaction.member.user.id)-1);
            }

            porteclés = Object.keys(gf);
            modulo = index.get(interaction.member.user.id) % porteclés.length;
            if (modulo < 0){modulo = modulo + porteclés.length;}
            pos = porteclés[modulo];

            console.log("index : " + index.get(interaction.member.user.id));
            console.log("length : " + porteclés.length);
            console.log("modulo : " + modulo);
            console.log("pos : " + pos);

            const GF = new EmbedBuilder()
                    .setColor("843dff")
                    .setTitle("ダイヤモンド - DIAMOND")
                    .addFields({name: "Name", value: gf[pos].name},
                    {name: "Gender", value: gf[pos].gender},
                    {name: "Age",value: (gf[pos].age).toString()},
                    {name: "Height", value: gf[pos].height},
                    {name: "Personnality", value: gf[pos].personnality},
                    {name: "Rental price (per hour):", value: (gf[pos].price).toString() + " :yen:"})
                    .setImage(gf[pos].image)
                    .setFooter({text:"Diamond Inc. © - Bringing the best for you • " + (modulo+1).toString() + "/" + porteclés.length})
                    .setTimestamp();

            // condition field rented by : user

            // conditon field owned by :user

            
            var NavigationGF = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
                .setCustomId("GF-")
                .setLabel("PREVIOUS")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("◀"));

            if (userRent.has(interaction.member.user.id)) {
                if(porteclés[userRent.get(interaction.member.user.id)[1]] === pos) {
                    NavigationGF.addComponents(new ButtonBuilder()
                        .setCustomId("Date_resume")
                        .setLabel("Resume Date")
                        .setStyle(ButtonStyle.Success)
                        .setEmoji("⏯"));}
                else {
                    NavigationGF.addComponents(new ButtonBuilder()
                        .setCustomId("RentGF")
                        .setLabel("RENT HER !")
                        .setStyle(ButtonStyle.Success)
                        .setEmoji("💲")
                        .setDisabled(true));
                }
                
            }
            else if(userdata.owned_free_rent_ticket > 0)
            {
                NavigationGF.addComponents(new ButtonBuilder()
                .setCustomId("RentGF")
                .setLabel("FREE RENT !")
                .setStyle(ButtonStyle.Success)
                .setEmoji("🎟️"));
            }
            else
            {
            NavigationGF.addComponents(new ButtonBuilder()
                .setCustomId("RentGF")
                .setLabel("RENT HER !")
                .setStyle(ButtonStyle.Success)
                .setEmoji("💲"));
            }
            if(userdata.love_point >= gf[pos].lovePoint) // && ownedbyGF[indexGF] === "No one" -- check if the gf isn't already married
            {
                NavigationGF.addComponents(new ButtonBuilder()
                    .setCustomId("Marry")
                    .setLabel("MARRY HER")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("👰"));
            }
            NavigationGF.addComponents(new ButtonBuilder()
                .setCustomId("GF+")
                .setLabel("NEXT")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("▶"));

            var HomeGF = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId("Home")
                    .setLabel("Back Home Page")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("🏡"));

            

            interaction.update({embeds:[GF], components: [NavigationGF, HomeGF]});
        }
        else 
        {
            interaction.reply({content: "Je suis sincèrement désolé mon adorable " + interaction.member.user.username + " mais cette instance est reservé à une personne que j'apprécie bien plus que toi...", ephemeral: true});
        }
        
    }
}