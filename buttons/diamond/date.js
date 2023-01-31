const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "../..").normalize();

const buttonList = ["Date_resume", "ChocolateG", "BookG", "ScarfG", "RingG", "KnifeG", "RoseG", "TeddyG"];

const coeff = new Map ([["Start", 0.25],["Angry", -0.5],["Neutral", 1],["Happy", 2.25]]);

module.exports = {
    async execute(interaction) {
        const rowdata = fs.readFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"));
        const userdata = JSON.parse(rowdata);

        if(!(interaction.customId === "Date" && !userRent.has(interaction.member.user.id)) && !(buttonList.includes(interaction.customId)  && userRent.has(interaction.member.user.id)))
        {
            interaction.reply({content: "Selon la politique d'utilisation de Diamond Inc. ©, les doubles dates ou toutes formes de multi-dating via l'application sont prohibés.", ephemeral: true});
        }
        else
        {

            let tmp;
            let spy = false;
            
            switch (interaction.customId) {
                case "ChocolateG":
                    tmp = userRent.get(interaction.member.user.id);
                    tmp[2] = gf[Object.keys(gf)[indexgirl]].likeChocolate;
                    tmp[3] += 1;
                    userdata.owned_chocolate -= 1;
                    userRent.set(interaction.member.user.id, tmp);
                    spy = true;
                    break;
                case "BookG":
                    tmp = userRent.get(interaction.member.user.id);
                    tmp[2] = gf[Object.keys(gf)[indexgirl]].likeBook;
                    tmp[3] += 1;
                    userdata.owned_book -= 1;
                    userRent.set(interaction.member.user.id, tmp);
                    spy = true;
                    break;
                case "ScarfG":
                    tmp = userRent.get(interaction.member.user.id);
                    tmp[2] = gf[Object.keys(gf)[indexgirl]].likeScarf;
                    tmp[3] += 1;
                    userdata.owned_scarf -= 1;
                    userRent.set(interaction.member.user.id, tmp);
                    spy = true;
                    break;
                case "RingG":
                    tmp = userRent.get(interaction.member.user.id);
                    tmp[2] = gf[Object.keys(gf)[indexgirl]].likeRing;
                    tmp[3] += 1;
                    userdata.owned_ring -= 1;
                    userRent.set(interaction.member.user.id, tmp);
                    spy = true;
                    break;
                case "KnifeG":
                    tmp = userRent.get(interaction.member.user.id);
                    tmp[2] = gf[Object.keys(gf)[indexgirl]].likeKnife;
                    tmp[3] += 1;
                    userdata.owned_knife -= 1;
                    userRent.set(interaction.member.user.id, tmp);
                    spy = true;
                    break;
                case "RoseG":
                    tmp = userRent.get(interaction.member.user.id);
                    tmp[2] = gf[Object.keys(gf)[indexgirl]].likeRose;
                    tmp[3] += 1;
                    userdata.owned_rose -= 1;
                    userRent.set(interaction.member.user.id, tmp);
                    spy = true;
                    break;
                case "TeddyG":
                    tmp = userRent.get(interaction.member.user.id);
                    tmp[2] = gf[Object.keys(gf)[indexgirl]].likeTeddybear;
                    tmp[3] += 1;
                    userdata.owned_teddybear -= 1;
                    userRent.set(interaction.member.user.id, tmp);
                    spy = true;
                    break;
                default:
                    break;
            }

            if (interaction.customId === "Date" && !userRent.has(interaction.member.user.id)) 
                {
                    indexgirl = Number(interaction.message.embeds[0].data.footer.text.substring(interaction.message.embeds[0].data.footer.text.indexOf('x')+1));
                    console.log("index girl : " + indexgirl);
                    setgirl = gf[Object.keys(gf)[indexgirl]];
                    userRent.set(interaction.member.user.id, [Date.now(), indexgirl, "Neutral", 0]);
                    userdata.balance -= setgirl.price;
                    userdata.love_point += (Math.round(setgirl.price/(setgirl.lovePoint*4)*coeff.get("Start")));
                }

            let girl = gf[Object.keys(gf)[userRent.get(interaction.member.user.id)[1]]];

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

            if (spy)
                {
                    let rnd = (Math.floor(Math.random() * 50) + 50)/100;
                    console.log('rnd : ' + rnd);
                    console.log('love Point earned : ' + (Math.round(girl.price/(girl.lovePoint*4)*coeff.get(tmp[2])*rnd)))
                    userdata.love_point += (Math.round(girl.price/(girl.lovePoint*4)*coeff.get(tmp[2])*rnd));
                }
        
            var BackHome = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                        .setCustomId("Gift")
                        .setLabel("Give a present")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji("🎁"))
        
            if(userdata.owned_rose > 0 || userdata.owned_knife > 0 || userdata.owned_teddybear > 0)
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

            // data writing
            fs.writeFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"), JSON.stringify(userdata, null, 2), (err) => {
                if (err) {
                    console.log("Problème lors de l'initialisation du fichier .json du joueur : " + interaction.member.user.username + ", ID : "  + interaction.member.user.id, err);
                    return;
                }
                console.log(interaction.member.user.id + ".json  updated");
            });

            await interaction.update({embeds:[RGF], components: [BackHome]});
        }
    }
}