const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = {
    async execute(interaction) {

        const datapath = path.join(__dirname, "../..").normalize();
        const rawdata = fs.readFileSync(path.join(datapath, "data/server/duel_info.json"));
        const duelinfo = JSON.parse(rawdata);

        if(!(interaction.customId === 'Start_d')) {
            for (const x of duelList.get(interaction.guild).keys()) {
                if(interaction.customId.split('|')[1] === x.username) {
                    score = duelList.get(interaction.guild).get(x) + 1;
                    if(score < duelinfo.score){

                        duelList.get(interaction.guild).set(x, score);

                        const buttons = new ActionRowBuilder();
                        listS = "";
                        
                        for (const x of duelList.get(interaction.guild).keys()) {
                            listS += x.username;
                            listS += " " + duelList.get(interaction.guild).get(x);
                            listS += "\n";
                            buttons.addComponents(
                                new ButtonBuilder()
                                .setStyle(ButtonStyle.Success)
                                .setCustomId('Start_d|' + x.username)
                                .setLabel(x.username)
                                .setEmoji('➕'))
                        }

                        const scoreG1 = new EmbedBuilder()
                                .setColor("eb4034")
                                .setTitle("🔪 Progression du Duel : ")
                                .setDescription("La tension est palpable...")
                                .addFields( {name: 'Score à atteindre :', value: duelinfo.score},
                                            {name: 'Rappel mise :', value: duelinfo.mise},
                                            {name: 'Score : ', value: listS},
                                            {name: 'Roll de round : ', value: '$mmi ' + (getRandomInt(duelinfo.roll)).toString()}
                                            );
    
                        interaction.update({embeds: [scoreG1], components: [buttons]});
                    }
                    else{

                        const logpath = path.join(__dirname, "../..").normalize();
                        const loglog = fs.readFileSync(path.join(logpath, "data/log_info.json"));
                        const loginfo = JSON.parse(loglog);

                        gain = duelinfo.mise * (duelinfo.nbJ - 1);
                        const scoreG1 = new EmbedBuilder()
                            .setColor("eb4034")
                            .setTitle("VICTOIRE")
                            .setDescription("Parmi tous ces harems, seulement un en est ressorti vainqueur !")
                            .setThumbnail("https://i.pinimg.com/736x/92/bd/dd/92bddda156b1b7c6c10304a20c1f2a24.jpg")
                            .addFields( {name: "Gagnant :", value: interaction.customId.split('|')[1]},
                                        {name: "Récompenses :", value: gain.toString() + "<:kakera:950050987412951051>"});
        
                        const buttons = new ActionRowBuilder()
                            .addComponents(new ButtonBuilder()
                                .setCustomId("GG|" + interaction.customId.split('|')[1] + "|" + (gain).toString())
                                .setLabel("Obtenir ces gains")
                                .setStyle(ButtonStyle.Success)
                                .setEmoji("🏆"))
                            .addComponents(new ButtonBuilder()
                                .setCustomId("Synth_d")
                                .setLabel("Rejouer (et obtenier gain pour " + interaction.customId.split('|')[1] + ")")
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji("🔁"));
                                
                        duelinfo.replay = 1;
                        console.log(duelinfo.replay);
                        fs.writeFile(path.join(datapath, "data/server/duel_info.json"), JSON.stringify(duelinfo, null, 2), (err) => {
                            if (err) {
                                console.log("Problème lors du chargement des données dans le fichier duel_info.json", err);
                                return;
                            }
                            console.log("duel_info.json  updated");
                        });
                        try {
                            interaction.guild.channels.cache.get(loginfo.id).send('Log : ' + interaction.customId.split('|')[1] + " +" + (gain).toString() + "<:kakera:950050987412951051> " + Date.now());
                        }
                        catch (exception) {
                            console.log(exception)
                        }
                        finally {
                            interaction.reply({embeds: [scoreG1], components: [buttons]});
                        }
                    }
                }
            }
        }
        else
        {
            const buttons = new ActionRowBuilder();
            listS = "";
                        
            for (const x of duelList.get(interaction.guild).keys()) {
                listS += x.username;
                listS += " " + duelList.get(interaction.guild).get(x);
                listS += "\n";
                buttons.addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Success)
                        .setCustomId('Start_d|' + x.username)
                        .setLabel(x.username)
                        .setEmoji('➕')
                    ,
                );
            }

            const scoreG1 = new EmbedBuilder()
                .setColor("eb4034")
                .setTitle("🔪 Progression du Duel : ")
                .setDescription("Première manche, rien n'est encore joué !")
                .addFields( {name: 'Score à atteindre :', value: duelinfo.score},
                    {name: 'Rappel mise :', value: duelinfo.mise},
                    {name: 'Score : ', value: listS},
                    {name: 'Roll de round : ', value: '$mmi ' + (getRandomInt(duelinfo.roll)).toString()}
                );
                interaction.update({embeds: [scoreG1], components: [buttons]});
        }
    }
}