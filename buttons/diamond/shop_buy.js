const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require('fs');
const path = require('path');
const datapath = path.join(__dirname, "../..").normalize();

module.exports={
    async execute(interaction) {

        if(interaction.message.interaction.user.id === interaction.member.user.id) {

            const rowdata = fs.readFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"));
            const userdata = JSON.parse(rowdata);

            const achat = new EmbedBuilder()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND")
                .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                .setTimestamp();

            switch (interaction.customId) {
                case "Buy_chocolate":
                    price = 2000;
                    field = "owned_chocolate";
                    string = "1 tablette de chocolat 🍫";
                    break;
                case "Buy_book":
                    price = 4000;
                    field = "owned_book";
                    string ="1 livre d'histoire 📔";
                    break;
                case "Buy_scarf":
                    price = 7000;
                    field = "owned_scarf";
                    string = "1 écharpe rouge :scarf:";
                    break;
                case "Buy_ring":
                    price = 10000;
                    field = "owned_ring";
                    string = "1 magnifique bague :ring:";
                    break;
                case "default":
                    price = "none";
                    break;
            }

            if(userdata.balance >= price)
            {
                userdata[field] += 1;
                userdata.balance -= price;
                achat.setDescription("DIAMOND Corp. vous remercie de votre achat.\nDétails de votre commission :");
                achat.addFields({name: "Article acheté :", value: string},
                {name: "Porte-Monnaie :", value: userdata.balance + " :yen:"});
            }
            else 
            {
                achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé...");
                if (price === "none")
                {
                    achat.addFields({name: "Détails de l'erreur :", value: "Une erreur innatendue s'est produite lors de votre transaction, veuillez réessayer ultérieurement."});
                }
                else
                {
                    achat.addFields({name: "Détails de l'erreur :", value: "Montant de :yen: insuffisant"});
                }
            }

            var shopB = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
                    .setCustomId("Shop")
                    .setLabel("Back to Shop")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("🛒"),
                new ButtonBuilder()
                    .setCustomId("Home")
                    .setLabel("Back Home")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("🏡"));

            try 
            {
                fs.writeFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"), JSON.stringify(userdata, null, 2), (err) => {
                    if (err) {
                        console.log("Problème lors de l'initialisation du fichier .json du joueur : " + interaction.member.user.username + ", ID : "  + interaction.member.user.id, err);
                        return;
                    }
                    console.log(interaction.member.user.id + ".json  updated");
                });
                interaction.update({embeds: [achat], components: [shopB]})
            } 
            catch (err) 
            {
                console.log(err);
            }
        }
        else 
        {
            interaction.reply({content: "Je suis sincèrement désolé mon adorable " + interaction.member.user.username + " mais cette instance est reservé à une personne que j'apprécie bien plus que toi...", ephemeral: true});
        }
    }
}