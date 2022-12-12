const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require("discord.js");
        
const fs = require('fs');
const path = require('path');

module.exports = {
    data : new SlashCommandBuilder()
    .setName('diamond')
    .setDescription('...'),
    async execute(interaction) {

        const datapath = path.join(__dirname, "..").normalize();
        const folderName = path.join(datapath, 'data/server/' + interaction.guild.id);       
        try {
            if (!fs.existsSync(folderName)) {
              fs.mkdirSync(folderName);
            }
        } catch (err) {
            console.log(err);
        }
        try {
            if (!fs.existsSync(path.join(folderName, interaction.member.user.id + ".json"))) {
                const tempdata = fs.readFileSync(path.join(datapath, "data/diamond_data_template.json"));
                const template = JSON.parse(tempdata);

                template.id = interaction.member.user.id;
                template.username = interaction.member.user.username;
                template.taille = Math.floor(Math.random() * 71) + 140;
                template.balance = Math.floor(Math.random() * 50000) + 2500;
                if(Math.floor(Math.random() * 2) == 0)
                {
                    template.genre = ":male_sign:";
                }
                else
                {
                    template.genre = "♀️";
                }
                var extra = "";
                var extraAlea = Math.floor(Math.random() * 5); 
                switch(extraAlea){
                    case 0: 
                    extra = "lebg"; 
                    break
                    case 1:
                    extra = "diño"; 
                    break
                    case 2:
                    extra = "letombeur"; 
                    break
                    case 3:
                    extra = "aulait"; 
                    break
                    case 4:
                    extra = "leboulet"; 
                    break
                    default:
                        break}

                template.appname = interaction.member.user.username + extra;

                console.log(template);

                fs.writeFileSync(path.join(folderName, interaction.member.user.id + ".json"), JSON.stringify(template, null, 2), (err) => {
                    if (err) {
                        console.log("Problème lors de l'initialisation du fichier .json du joueur : " + interaction.member.user.username + ", ID : "  + interaction.member.user.id, err);
                        return;
                    }
                    console.log(interaction.member.user.id + ".json  updated");
                });

                var logIn = new ActionRowBuilder()
                    .addComponents(new ButtonBuilder()
                        .setCustomId("ConnectToDiamond")
                        .setLabel("INSTALLER DIAMOND")
                        .setStyle(ButtonStyle.Success)
                        .setEmoji("💎"))
                    .addComponents(new ButtonBuilder()
                        .setCustomId("Disconnect")
                        .setLabel("Mauvaise idée")
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji("❎"));
                console.log(interaction)
                interaction.reply({content: "*Votre téléphone vibre étrangement ?\nDans un grand flash blanc, votre téléphone vous propose de vous rediriger vers le lien suivant : https://diamond.app/rent \nCe lien semble inaccessible, cependant il semblerait que vous puissiez installer l'application* **DIAMOND**", components: [logIn]});

            }
            else {
                console.log('else');
                require("../buttons/diamond/mainPage.js").execute(interaction);
            }
        } 
        catch(err) {
            console.log(err)
        }          
    }
}           
                    