const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "../..").normalize();

module.exports = {
    async execute(interaction) {

        if(interaction.message.interaction.user.id === interaction.member.user.id) {
            
            const rowdata = fs.readFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"));
            const userdata = JSON.parse(rowdata);

            const shop = new EmbedBuilder()
                    .setColor("843dff")
                    .setTitle("ダイヤモンド - DIAMOND")
                    .setDescription("Bienvenue au magasin DIAMOND Corp.\n*Ici, vous pouvez acheter toutes sortes d'articles directement depuis votre smartphone.*\n***Aucun remboursement possible***")
                    .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoxETY5SVyRHCp_uegfkPgmKB5GeIgJUtC-1V7H2kdHnG9L7IsDRwpUCvW7b3YSpHuupA&usqp=CAU")
                    .addFields(
                    {name : "Article 1 : :chocolate_bar:", value: "Description : Une tablette de chocolat au lait, 250g.\nPrix : 2000 :yen:"},
                    {name: "Article 2 : :notebook_with_decorative_cover:", value: "Description : Un livre sur l'histoire contemporaine du Japon. Plutôt ennuyant...\nPrix : 4000 :yen:"},
                    {name: "Article 3 : :scarf:", value: "Description : Une belle écharpe rouge vif.\nPrix : 7000 :yen:"},
                    {name: "Article 4 : :ring:", value: "Description : Une magnifique bague, ornée d'une pierre précieuse rare.\nPrix : 10.000 :yen:"},
                    {name: "Porte-Monnaie :", value:  + userdata.balance.toString() + " :yen:"})
                    .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                    .setTimestamp();
            
            var NavigationS = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                        .setCustomId("Buy_chocolate")
                        .setLabel("Buy 1")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("🍫"),
                    new ButtonBuilder()
                        .setCustomId("Buy_book")
                        .setLabel("Buy 1")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("📔"),
                    new ButtonBuilder()
                        .setCustomId("Buy_scarf")
                        .setLabel("Buy 1")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("🧣"),
                    new ButtonBuilder()
                        .setCustomId("Buy_ring")
                        .setLabel("Buy 1")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("💍"),
                    new ButtonBuilder()
                        .setCustomId("Home")
                        .setLabel("Back Home")
                        .setStyle(ButtonStyle.Success)
                        .setEmoji("🏡"));

            interaction.update({embeds: [shop], components: [NavigationS]})
        }
        else 
        {
            interaction.reply({content: "Je suis sincèrement désolé mon adorable " + interaction.member.user.username + " mais cette instance est reservé à une personne que j'apprécie bien plus que toi...", ephemeral: true});
        }

    }
}