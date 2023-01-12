const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "../..").normalize();
const emoji = new Map([["owned_chocolate", ["🍫", "ChocolateG"]], ["owned_book", ["📔", "BookG"]], ["owned_scarf", ["🧣", "ScarfG"]], ["owned_ring", ["💍", "RingG"]]]);

module.exports =  {
    async execute(interaction) {
        if(interaction.message.interaction.user.id === interaction.member.user.id) {
            
            const rowdata = fs.readFileSync(path.join(datapath, 'data/server/' + interaction.guild.id + "/" + interaction.member.user.id +".json"));
            const userdata = JSON.parse(rowdata);

            stuff = ""
            const ChooseG = new ActionRowBuilder();
            console.log("size : " + emoji.size) // validé

            for (const x of emoji.keys())
            {
                if(userdata[x] > 0)
                {
                    ChooseG.addComponents(new ButtonBuilder()
                        .setCustomId(emoji.get(x)[1])
                        .setLabel("Offer 1")
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(emoji.get(x)[0]))

                    for(i=0; i < userdata[x]; i++)
                    {
                        stuff += emoji.get(x)[0] + " ";
                    }
                }
            }

            if (stuff === ""){stuff = "Vous ne possédez rien...";}
            const girl = gf[Object.keys(gf)[userRent.get(interaction.user.id)[1]]];

            const Gift = new EmbedBuilder()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND")
                .setDescription("Vous êtes sur le point d'offrir un cadeau à " + girl.name + ".")
                .setThumbnail(girl.ppIMG)
                .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                .setTimestamp();

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