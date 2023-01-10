const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "../..").normalize();
const blitzinfos = infos.blitz;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    async execute(interaction) {

        const rawdata = fs.readFileSync(path.join(datapath, blitzinfos.infospath[0] + interaction.guild.id + blitzinfos.infospath[1]));
        const blitz_info = JSON.parse(rawdata);
        
        if(blitz_info.replay != 0){
            for (const x of blitzList.get(interaction.guild).keys()){
                blitzList.get(interaction.guild).set(x, 0);
                console.log("je reset" + blitzList.get(interaction.guild).get(x))
            }
            blitz_info.replay = 0,
            fs.writeFile(path.join(datapath, blitzinfos.infospath[0] + interaction.guild.id + blitzinfos.infospath[1]), JSON.stringify(blitz_info, null, 2), (err) => {
                if (err) {
                    console.log("Problème lors du chargement des données dans le fichier blitz_info.json", err);
                    return;
                }
                console.log("blitz_info.json  updated");
            });
        }

        let concat = "";
        for (const x of blitzList.get(interaction.guild).keys()) {
            concat += x.username;
            concat += "\n";
        }

        nb = (blitz_info.score-1)*blitz_info.nbJ+1;
        chiffres = '';
        for (let i=0; i< nb; i++) 
        {
            let tub = (getRandomInt(blitz_info.roll-1)+1).toString() + '\n';
            console.log('tub : ' + tub);
            chiffres = chiffres.concat(tub);
        }
        console.log("chiffres :\n" + chiffres)
        
        const resume = new EmbedBuilder()
            .setColor("821fcf")
            .setTitle("🔪 Détails du Blitz : ")
            .setDescription("Le Blitz est un mode pour les joueurs confirmés, assurez-vous de pas être un noob avant de participer")
            .setThumbnail("https://i.imgur.com/EI9kJ6a.jpg")
            .addFields({ name: "Score à atteindre :", value: blitz_info.score },
            { name: "Roll max :", value: blitz_info.roll },
            { name: "Mise :", value: blitz_info.mise },
            { name: "Joueurs (" + blitz_info.nbJ + ") :", value: concat },
            { name: "Vos numéros de personnages sont : \n*pro tips: checker l'ensemble de vos personnages dans un channel à part, ces numéros s'éffaceront au lancement du Blitz*", value : chiffres})
            .setTimestamp();

        const Gogo = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
                .setCustomId("Start_b")
                .setLabel("Commencer le DUEL !")
                .setStyle(ButtonStyle.Success)
                .setEmoji("⚔"))
            .addComponents(new ButtonBuilder()
                .setCustomId("Cancel_b")
                .setLabel("Annuler le combat")
                .setStyle(ButtonStyle.Secondary)
                .setEmoji("❌"));

        await interaction.update({ embeds: [resume], components: [Gogo] });
    }
}