const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
        
const fs = require('fs');
const path = require('path');

module.exports ={
    async execute(interaction) {

        const datapath = path.join(__dirname, "../..").normalize();
        const rowdata = fs.readFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"));
        const userdata = JSON.parse(rowdata);
        stuff = "Aucun objet possédé";
        gfList = "none"
        for (let i = 1; i <= userdata.owned_chocolate; i++) {
            stuff += "🍫 ";
            if (i === userdata.owned_chocolate) { stuff += "\n"}
        }
        for (let i = 1; i <= userdata.owned_book; i++) {
            stuff += "📔 ";
            if (i === userdata.owned_book) { stuff += "\n"}
        }
        for (let i = 1; i <= userdata.owned_scarf; i++) {
            stuff += "🧣 ";
            if (i === userdata.owned_scarf) { stuff += "\n"}
        }
        for (let i = 1; i <= userdata.owned_ring; i++) {
            stuff += "💍 ";
            if (i === userdata.owned_ring) { stuff += "\n"}
        }
        for (let i = 1; i <= userdata.owned_rose; i++) {
            stuff += "🌹 ";
            if (i === userdata.owned_rose) { stuff += "\n"}
        }
        for (let i = 1; i <= userdata.owned_knife; i++) {
            stuff += "🔪 ";
            if (i === userdata.owned_knife) { stuff += "\n"}
        }
        for (let i = 1; i <= userdata.owned_teddybear; i++) {
            stuff += "🧸 ";
            if (i === userdata.owned_teddybear) { stuff += "\n"}
        }
        for (let i = 1; i <= userdata.owned_free_rent_ticket; i++) {
            stuff += "🎟 ";
            if (i === userdata.owned_free_rent_ticket) { stuff += "\n"}
        }
        for (let i = 0; i < userdata.owned_gf.length; i++) {
            const gf = userdata.owned_gf[i];
            gfList += "> " + gf.name + "\n" 
        }

        const Profile = new EmbedBuilder()
                    .setColor("843dff")
                    .setTitle("ダイヤモンド - DIAMOND")
                    .setDescription("*Profil de " + interaction.member.user.username + "*")
                    .setThumbnail(interaction.member.user.avatarURL())
                    .addFields({name: "Genre :", value: userdata.genre},
                    {name: "Taille :", value: (userdata.taille).toString() + " cm"},
                    {name: "Porte-Feuille :", value: (userdata.balance).toString() + " :yen:"},
                    {name: "Inventaire :", value: stuff},
                    {name: "Inventaire Casino : ", value: userdata.casino_token + " 🪙  " + (userdata.owned_free_casino_ticket).toString() + " 🎫"})
                    .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                    .setTimestamp();
        // addfields ({name: "Love Points :", value: userdata.Love_point.toString()}); 

        if(!gfList === "none"){
            Profile.addFields({name: "GirlFriend marié(es) :", value: gfList});
        }
        var NavigationP = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
                .setCustomId("Home")
                .setLabel("Back Home")
                .setStyle(ButtonStyle.Success)
                .setEmoji("🏡"))
            .addComponents(new ButtonBuilder()
                .setCustomId("Succes" + interaction.user.id)
                .setLabel("Success")
                .setStyle(ButtonStyle.Success)
                .setEmoji("🏆"))
            .addComponents(new ButtonBuilder()
                .setCustomId("Bank" + interaction.user.id)
                .setLabel("Bank")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("💰"))
            .addComponents(new ButtonBuilder()
                .setCustomId("Disconnect" + interaction.user.id)
                .setLabel("Exit")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("❌"));
                    
        interaction.update({embeds:[Profile], components: [NavigationP]});
            
    }
}