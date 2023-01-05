const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require('fs');
const path = require('path');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

module.exports =  {
    async execute(interaction) {
        if(interaction.message.interaction.user.id === interaction.member.user.id){

            const datapath = path.join(__dirname, "../..").normalize();
            const rowdata = fs.readFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"));
            const userdata = JSON.parse(rowdata);

            indexgirl = Number(interaction.message.embeds[0].data.footer.text.substring(45, interaction.message.embeds[0].data.footer.text.indexOf('/')));
            girl = gf[Object.keys(gf)[indexgirl-1]];
            console.log(girl);
            console.log(getRndInteger(10000001, 99999999))
            
            const RGF = new EmbedBuilder()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND - Date overview ")
            .addFields({name: "Purchase:", value: "You have rented " + girl.name + " for one hour."},
            {name: "Paiement Recap:", value: girl.price + " :yen:"},
            {name: 'Rented by:', value: interaction.member.user.username})
            .setFooter({text:"Diamond Inc. © - Bringing the best for you - Order number: " + getRndInteger(10000001, 99999999) + "x" + (indexgirl-1).toString()})
            .setTimestamp();

            const start = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId('Date')
                    .setEmoji("💞")
                    .setLabel("Start Date !")
                    .setStyle(ButtonStyle.Danger))
                .addComponents(new ButtonBuilder()
                    .setCustomId('Home')
                    .setLabel('Back Home Page')
                    .setStyle(ButtonStyle.Success)
                    .setEmoji('🏡'));

            console.log("thune :" + userdata.balance + " prix fille : " + girl.price)
            if(!userRent.has(interaction.member.user.id)){
                if(userdata.owned_free_rent_ticket > 0){
                    userdata.owned_free_rent_ticket = userdata.owned_free_rent_ticket - 1;
                    //userRent.set(interaction.member.user.id, [Date.now(), indexgirl, "Neutral", 0]);
                    interaction.update({embeds: [RGF], components: [start]});
                }
                else if(userdata.balance > girl.price){
                    userdata.balance = userdata.balance - girl.price;
                    //userRent.set(interaction.member.user.id, [Date.now(), indexgirl, "Neutral", 0]);
                    interaction.update({embeds: [RGF], components: [start]});
                }
                // add condition if owned by user by being married with → makes rent free
                else {

                    const noMoney = new EmbedBuilder()
                        .setTitle('Not Enough money')
                        .setDescription("You don't have enough money to rent " + girl.name);

                    var BackHome = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                        .setCustomId("Home")
                        .setLabel("Back Home Page")
                        .setStyle(ButtonStyle.Success)
                        .setEmoji("🏡"));

                    interaction.update({embeds:[noMoney], components: [BackHome]});
                }
            }
            else{
                interaction.reply({content: "Selon la politique d'utilisation de Diamond Inc. ©, les doubles dates ou toutes formes de multi-dating via l'application sont prohibés.", ephemeral: true});
            }

        }
        else{
            interaction.reply({content: "Je suis sincèrement désolé mon adorable " + interaction.member.user.username + " mais cette instance est reservée à une personne que j'apprécie bien plus que toi...", ephemeral: true});
        }
    }
}