const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "../..").normalize();
const emoji = new Map([["owned_chocolate", ["🍫", "ChocolateG"]], ["owned_book", ["📔", "BookG"]], ["owned_scarf", ["🧣", "ScarfG"]], ["owned_ring", ["💍", "RingG"]]]);
const emojiA = new Map([["owned_knife", ["🔪", "KnifeG"]], ["owned_rose", ["🌹", "RoseG"]], ["owned_teddybear", ["🧸", "TeddyG"]]]);

module.exports =  {
    async execute(interaction) {
        if(interaction.message.interaction.user.id === interaction.member.user.id) {
            
            const rowdata = fs.readFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"));
            const userdata = JSON.parse(rowdata);
            
            const girl = gf[Object.keys(gf)[userRent.get(interaction.user.id)[1]]];

            const Gift = new EmbedBuilder()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND")
                .setDescription("Vous êtes sur le point d'offrir un cadeau à " + girl.name + ".")
                .setThumbnail(girl.ppIMG)
                .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                .setTimestamp();

            stuff = "";
            const ChooseG = new ActionRowBuilder();
            console.log("size : " + emoji.size) // validé
            gift = new Map();

            switch (interaction.customId) {
                case 'Gift':
                    gift = emoji;
                    break;
                case 'GiftA':
                    gift = emojiA;
                    console.log('awkward mode : on' + gift.get("owned_rose")[1]);
                    break;
                default:
                    break;
            }

            for (const x of gift.keys())
            {
                if(userdata[x] > 0)
                {
                    button = new ButtonBuilder()
                        .setCustomId(gift.get(x)[1])
                        .setLabel("Offer 1")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(gift.get(x)[0]);
                    
                    console.log("nb cadeaux : " + userRent.get(interaction.member.user.id)[3]);
                    if (userRent.get(interaction.member.user.id)[3] > 5)
                    {
                        button.setDisabled();
                    }

                    ChooseG.addComponents(button);

                    for(i=0; i < userdata[x]; i++)
                    {
                        stuff += gift.get(x)[0] + " ";
                    }
                }
            }

            if (userRent.get(interaction.member.user.id)[3] > 5)
                    {
                        Gift.addFields({name : "Impossible de donner plus de cadeaux", value: "Vous avez atteint la limite de cadeaux que vous pouvez offrir par date ..."});
                    }
                    
            if (stuff === ""){stuff = "Vous ne possédez rien...";}

            ChooseG.addComponents(new ButtonBuilder()
                .setCustomId("Date_resume")
                .setLabel("Back to Date")
                .setStyle(ButtonStyle.Success)
                .setEmoji("🌆"));
            
            Gift.addFields({name: "Inventaire", value: stuff});

            interaction.update({embeds:[Gift], components: [ChooseG]});

        }
        else 
        {
            interaction.reply({content: "Je suis sincèrement désolé mon adorable " + interaction.member.user.username + " mais cette instance est reservé à une personne que j'apprécie bien plus que toi...", ephemeral: true});
        }
    }
}