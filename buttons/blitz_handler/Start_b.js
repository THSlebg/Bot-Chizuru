const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const fs = require('fs');
const path = require('path');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const datapath = path.join(__dirname, "../..").normalize();
const loginfos = infos.log;
const blitzinfos = infos.blitz;

rnd = getRandomInt(250)+1;

eventList = 
[   
                "Rien",
                "Puissance x20 pour les personnages masculins",
                "Le personnage avec la plus faible puissance gagne",
                "La puissance de chaque personnage est multipliée par son nombre de clefs",
                "La puissance de chaque personnage est divisée par son nombre de clefs",
                "Le personnage ajoute à sa puissance 100x le nombre de clefs du personnage",
                "La puissance de chaque personnage est égale à la somme des chiffres componsant sa valeur",
                "Le combat se jouera avec deux personnages, chacun ajoute à sa puissance totale celle de son personnage plus celle du personnage " + rnd.toString() + " de son harem",
                "Inverse l'ordre des chiffres composant la puissance de chaque personnage",
                "Le personnage avec l'image la plus tendancieuse : puissance x50",
                "Chaque personnage voit sa puissance multipliée par 30 s'il n'est pas humain (mi-race acceptée)",
                "Puissance +250 si le personnage possède une arme sur son image (une arme hein!!)",
                "Le rang like devient la puissance de chaque personnage",
                "Le personnage avec le nom le plus court : puissance x5 (rien si égalité)",
                "La puissance de chaque personnage est multipliée par son nombre d'alias (alias custom exclu)",
                "Chaque joueur peut changer ou non de personage apres reveal lors de cette manche, avec un autre de ses personnages encore non joué",
                "Si le personnage à la plus grande puissance n'a pas plus du double du 2nd meilleur personnage de la manche, égalité, et + 1 round à l'affrontement",
                "Puissance x5 si votre personnage possède 2 fois ou plus le même chiffre dans sa puissance",
                "Puissance : -250 par clef(s)",
                "Puissance x5 si le personnage est rollable dans 2 roulettes",
                "Puissance x10 si le personnage provient du bundle hentai",
                "$divorce le personnage joué fait remporter le round (égalité si tous les joueurs le font)",
                "Vous pouvez ajoutez des kakera pour augmenter la puissance de votre personnage pour ce round (1 kkr = 1 puissance). Les joueurs dévoilent simultanéement le montant qu'il souhaite investir, et ce 1 seul fois durant le round",
                "N'importe quel joueur peut échanger son personnage avec celui dans le harem autre joueur non participant, avant reveal",
                "Puissance x4 si le personnage possède une puissance qui équivaut à un carré parfait (ex : puissance = 9²)",
                "Réduit la puissance du/des personnages adverses de 50x le nombre de clef du personnage joué",
                "Au prochain round, puissance de votre personnage multipliée par le nombre de clef du personnage joué ce tour ci",
                "Les conséquences de l'event du prochain round sont doublés",
                "Sur ce round, chaque joueur doit jouer le chiffre le plus élévé qu'il lui reste",
                "Le joueur peut invoquer pour l'aider le personnage correspondant à son nombre joué depuis un autre harem non joueur avant le reveal. Les puissances se cumulent et forme la puissance totale du joueur pour ce round",
                "Chaque joueur peut librement incrémenter ou décrementer le nombre d'invocation (-1/0/+1) avant le reveal",
                "Chaque joueur peut inverser librement l'ordre des chiffres composant le nombre d'invocation joué (ex: 102 → 210)",
                "Chaque image (hors cutom) ajoute +20 à la puissance du personnage joué",
                "Puissance x4 si le personnage est à la fois maculin et féminin",
                "Puissance x3 si un autre personnage est présent sur l'image du personnage",
                "Puissance +450 si le personnage porte des lunettes",
                "Puissance x10 si le personnage fait parti du bundle IRL",
                "Puissance +555 si le personnage porte une jupe, Puissance -333 s'il porte un pantalon",
                "Tétons qui pointent : Puissance x4",
                "Puissance +750 si soutif visible (même partiellement)",
                "Le joueur qui gagne cette manche est libre d'annuler ou de doubler les conséquences de l'event du round suivant",
                "Le joueur avec le moins de clefs gagne. En cas d'égalité, la puissance la plus élevé remporte la manche",
                "Puissance = 0 si nombre de cléfs > 1"
];

module.exports = {
    async execute(interaction) {

        const rawdata = fs.readFileSync(path.join(datapath, blitzinfos.infospath[0] + interaction.guild.id + blitzinfos.infospath[1]));
        const blitz_info = JSON.parse(rawdata);

        if(!(interaction.customId === 'Start_b')) {
            for (const x of blitzList.get(interaction.guild).keys()) {
                if(interaction.customId.split('|')[1] === x.username) {
                    score = blitzList.get(interaction.guild).get(x) + 1;
                    if(score < blitz_info.score){

                        blitzList.get(interaction.guild).set(x, score);

                        const buttons = new ActionRowBuilder();
                        listS = "";
                        
                        for (const x of blitzList.get(interaction.guild).keys()) {
                            listS += x.username;
                            listS += " " + blitzList.get(interaction.guild).get(x);
                            listS += "\n";
                            buttons.addComponents(
                                new ButtonBuilder()
                                .setStyle(ButtonStyle.Success)
                                .setCustomId('Start_b|' + x.username)
                                .setLabel(x.username)
                                .setEmoji('➕'))
                        }

                        const scoreG1 = new EmbedBuilder()
                                .setColor("821fcf")
                                .setTitle("🔪 Progression du Blitz : ")
                                .setDescription("La tension est palpable...")
                                .addFields( {name: 'Score à atteindre :', value: blitz_info.score},
                                            {name: 'Rappel mise :', value: blitz_info.mise},
                                            {name: 'Score : ', value: listS},
                                            {name: 'Evenement du round : ', value: "*" + eventList[Math.floor(Math.random() * eventList.length)] + "*"}
                                            );
    
                        interaction.reply({embeds: [scoreG1], components: [buttons]});
                    }
                    else{

                        const logpath = path.join(__dirname, "../..").normalize();
                        const loglog = fs.readFileSync(path.join(logpath, loginfos.infospath[0] + interaction.guild.id + loginfos.infospath[1]));
                        const loginfo = JSON.parse(loglog);

                        gain = blitz_info.mise * (blitz_info.nbJ - 1);
                        const scoreG1 = new EmbedBuilder()
                            .setColor("eb4034")
                            .setTitle("VICTOIRE")
                            .setDescription("Parmi tous ces harems, seulement un en est ressorti vainqueur !")
                            .setThumbnail("https://i.pinimg.com/736x/92/bd/dd/92bddda156b1b7c6c10304a20c1f2a24.jpg")
                            .addFields( {name: "Gagnant :", value: interaction.customId.split('|')[1]},
                                        {name: "Récompenses :", value: gain.toString() + "<:kakera:950050987412951051>"});
        
                        const buttons = new ActionRowBuilder()
                            .addComponents(new ButtonBuilder()
                                .setCustomId("GGb|" + interaction.customId.split('|')[1] + "|" + (gain).toString())
                                .setLabel("Obtenir ces gains")
                                .setStyle(ButtonStyle.Success)
                                .setEmoji("🏆"))
                            .addComponents(new ButtonBuilder()
                                .setCustomId("Synth_b")
                                .setLabel("Rejouer (et obtenier gain pour " + interaction.customId.split('|')[1] + ")")
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji("🔁"));
                                
                        blitz_info.replay = 1;
                        console.log(blitz_info.replay);
                        fs.writeFile(path.join(datapath, blitzinfos.infospath[0] + interaction.guild.id + blitzinfos.infospath[1]), JSON.stringify(blitz_info, null, 2), (err) => {
                            if (err) {
                                console.log("Problème lors du chargement des données dans le fichier blitz_info.json", err);
                                return;
                            }
                            console.log("blitz_info.json  updated");
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
                        
            for (const x of blitzList.get(interaction.guild).keys()) {
                listS += x.username;
                listS += " " + blitzList.get(interaction.guild).get(x);
                listS += "\n";
                buttons.addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Success)
                        .setCustomId('Start_b|' + x.username)
                        .setLabel(x.username)
                        .setEmoji('➕')
                    ,
                );
            }

            const scoreG1 = new EmbedBuilder()
                .setColor("821fcf")
                .setTitle("🔪 Progression du Blitz : ")
                .setDescription("Première manche, rien n'est encore joué !")
                .addFields( {name: 'Score à atteindre :', value: blitz_info.score},
                    {name: 'Rappel mise :', value: blitz_info.mise},
                    {name: 'Score : ', value: listS},{name: 'Evenement du round : ', value: eventList[Math.floor(Math.random() * eventList.length)]}
                );
                interaction.update({embeds: [scoreG1], components: [buttons]});
        }
    }
}