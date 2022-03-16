const { table } = require("console");
const { channel } = require("diagnostics_channel");
const Discord = require("discord.js");
const { isUndefined } = require("util");
const { late } = require("zod");
const Client = new Discord.Client({
    intents: 
    [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});


const prefix = "rent!";

var commands = "\n - date \n - hi \n - help \n - embedHelp \n - event \n - setEvent \n - duel \n - roll \n - score \n - log \n - testLog \n - makeLog \n - setEmoji \n - patchnote";

let commandTable = ["rent!date", "rent!hi", "rent!help", "rent!event", "rent!setEvent", "rent!log", "rent!testLog", "rent!makeLog", "rent!embedHelp", "rent!duel", "rent!roll", "rent!score", "rent!setEmoji", "rent!patchnote"];
let descrTable = ["Basic command, you can check if the bot is working", "Say Hello to Chizuru", "Display all bot's commands", "Display current event information", "Custom current event | Args : **eventTitle**|**eventPeriod**|**eventDetails**|**eventEligibilty** ", "Change the log channel for bot's logs", "Send a log", "Send a custom log. Args : **memberName** **kakeraAmount**", "Display all bot's commands into an embed form", "Commence un combat de Harem entre différents membres du serveur", "Set la valeur max pour les rolls lors des duels de Harem", "Fixe le score maximal à atteindre lors des duels de Harem", "Change l'emoji resprésentant les kakeras lorsque le bot envoie un message l'utilisant", "Display latest Version patchnote"];

let nbPlayer = ["2P", "3P", "4P", "5P"];
let descrPlayer = ["DUEL", "TRIANGLE AMOUREUX", "CLUB ECHANGISTE", "BATTLE ROYALE"];
let valuePlayer = ["2", "3", "4", "5"];

let bets = ["100", "250", "500", "1000", "5000"];
let descrBets = ["Petits joueurs", "Paris entre amis", "Classique", "Pari compétitif", "Tentative d'escroquerie légitime"];
let valueBets = ["100", "250", "500", "1000", "5000"];

let channelLogName = "log-event";
let usrName = "undefinedUserName";
let kkrValue = "undefinedKakeraAmount";
let kkrEmoji = "<:kakera:950050987412951051>";

let eventTitle = "Allocations";
let eventPeriod = "14/03/2022 | 00h00 (UTC+1) - 20/03/2022 | 23h59 (UTC+1)";
let eventDescr = "Chaque $daily octroie + 3000 " + kkrEmoji;
let eventAva = "Tous les joueurs sauf multi-comptes.";
let kkrValueEvent = 3000;
    
let nbPlayers = 0;
let nbMise = 0;
let score = [];
let idPlayers = [];
let rdyP = 0;
let userId = [];
let username = [];
let gain = 0;

let idPlayersTmp;
let usernameTmp;
let userIdTmp;

let maxroll = 100;
let maxscore = 5;

let random = 0;
let winner = "";
let winnerId = " ";

let userDiamondID = [];
let userTaille = [];
let userGenre = [];
let userBalance =[];
let nbDiamondUser = 0;

let indexGF = 0;
let feelingGF = "Neutral";
let feelingGFtmp = "Neutral";

let nameGF = ["Ruka Sarashina", "Mami Nanami", "Sumi Sakurasawa", "Chizuru Mizuhara"];
let genderGF = ["♀️", "♀️", "♀️", "♀️"];
let ageGF = ["17", "20", "19", "19"];
let heightGF = ["153 cm", "158", "159 cm", "162 cm"];
let personnalityGF = ["Cheerful, Determined, Passionate, Yandere", "Sweet, Friendly, Honest, Sociopathic", "Shy, Inconspicuous, Lackadaisical, Selfless", "Cute, Kind, Confident, Debonair"];
let imageGF = ["https://i.imgur.com/tmAcCCq.gif", "https://i.imgur.com/LmfTrKo.gif", "https://i.imgur.com/Yum7mNk.gif", "https://i.imgur.com/nPnWleO.gif"];
let priceGF = ["9000", "13000", "18000", "25000"];
let rentedImageGF = ["https://c.tenor.com/CggCyPOXQYkAAAAC/ruka.gif", "https://c.tenor.com/Q26Wo2nMfYgAAAAC/mami-mami-nanami.gif", "https://c.tenor.com/P3uVcdtRdmwAAAAC/sumi-sumi-sakurasawa.gif", "https://c.tenor.com/_8NSw3TnEgoAAAAC/chizuru-mizuhara-bokeh-mizuhara.gif"]
let rentedGF = ["No one", "No one", "No one", "No one"];
let ppGF = ["https://i.pinimg.com/originals/fd/6c/6b/fd6c6bb31b3a064c8cb3b3ec93ccf590.jpg", "https://i.pinimg.com/originals/d1/ce/ad/d1cead5ac226ba3e4147a6f140e9f912.jpg", "https://i.pinimg.com/originals/3c/1d/9d/3c1d9db983b585ab66ce18b4a6df6d1c.jpg", "https://i.pinimg.com/originals/97/dc/72/97dc72b5690142e50b8b820cf7973394.jpg"];
let likeChocolate =["Happy", "Neutral", "Happy", "Angry"];
let likeBook = ["Happy", "Angry", "Neutral", "Angry"];
let likeScarf = ["Angry", "Neutral", "Happy", "Happy"];
let likeRing = ["Happy", "Happy", "Angry", "Neutral"];
let rentedImageGFHappy = ["https://i.imgur.com/KLUVb3v.gif", "https://media0.giphy.com/media/o6VIsU59zlFwaw5vsp/giphy.gif", "https://c.tenor.com/uhN9oVUXm6QAAAAC/kanokari-kanojo-okarishimasu.gif", "https://c.tenor.com/_JKiVTUp2_sAAAAd/rent-a-girlfriend-kanojo-okarishimasu.gif"];
let rentedImageGFAngry =["https://i.imgur.com/mbQzyHI.gif", "https://c.tenor.com/ST2QJoTEXcMAAAAC/mami-rent-a-girlfriend.gif", "https://imgur.com/w7Tl0nZ.gif", "https://c.tenor.com/OJ7dWLRs3JAAAAAC/mizuhara-chizuru.gif"];
let ownedbyGF = ["No one", "No one", "No one", "No one"];

let nameGFSecret = ["Itsuki Nakano", "Yukino Yukinoshita"];
let genderGFSecret = ["♀️", "♀️"];
let ageGFSecret = ["17", "17"];
let heightGFSecret = ["159 cm", "166 cm"];
let personnalityGFSecret = ["Serious, Well-manered, Rancorous, Glottonous", "Prideful, Talented, Extremely Smart, Outspoken"];
let imageGFSecret = ["https://i.imgur.com/WFJzBTC.gif", "https://i.imgur.com/HXRMEKd.gif"];
let priceGFSecret = ["15000", "21000"];
let rentedImageGFSecret = ["https://c.tenor.com/6DYdJKGxCdoAAAAC/nakano-itsuki-go-toubun-no-hanayome.gif", "https://i.pinimg.com/originals/e4/e8/bd/e4e8bddc5cf5bcb4b2a5d216da0a3b66.gif"];
let ppGFSecret = ["https://i.redd.it/0pn4put2p8661.jpg", "https://www.nautiljon.com/images/perso/00/99/yukinoshita_yukino_9599.jpg"];
let likeChocolateSecret = ["Happy", "Neutral"];
let likeBookSecret = ["Neutral", "Happy"];
let likeScarfSecret = ["Angry", "Happy"];
let likeRingSecret = ["Neutral", "Angry"];
let rentedImageGFHappySecret =["https://i.pinimg.com/originals/8d/3c/26/8d3c26c691419c47c45c49b521b39568.gif", "https://38.media.tumblr.com/1008d0881e5e92fa9c8f18eb91c766df/tumblr_np52popXiM1u9f4wvo1_540.gif"];
let rentedImageGFAngrySecret =["https://pa1.narvii.com/7097/dfcc2b8bc6c5818a78e320375a5b5cc7c51384f6r1-498-282_hq.gif", "https://64.media.tumblr.com/f7a62821963ea57b2e1510e667590591/tumblr_nmxml3T5Td1rcufwuo1_500.gif"];



let gift = "";
let paidDate = 0;

let userOwnedChocolate = [];
let userOwnedRing = [];
let userOwnedScarf = [];
let userOwnedBook = [];
let userLovePoint = [];

let admin =  "<@238332449367654401>";
let diamondUserConnected = [];

function addSecretGirl (GFname)
{
    if(nameGF.includes(GFname)){}
    else
    {
        var tableIndex = nameGFSecret.indexOf(GFname);
        rentedGF.push("No one");
        ownedbyGF.push("Admin");
        nameGF.push(nameGFSecret[tableIndex]);
        genderGF.push(genderGFSecret[tableIndex]);
        ageGF.push(ageGFSecret[tableIndex]);
        heightGF.push(heightGFSecret[tableIndex]);
        personnalityGF.push(personnalityGFSecret[tableIndex]);
        imageGF.push(imageGFSecret[tableIndex]);
        priceGF.push(priceGFSecret[tableIndex]);
        rentedImageGF.push(rentedImageGFSecret[tableIndex]);
        ppGF.push(ppGFSecret[tableIndex]);
        likeChocolate.push(likeChocolateSecret[tableIndex]);
        likeBook.push(likeBookSecret[tableIndex]);
        likeScarf.push(likeScarfSecret[tableIndex]);
        likeRing.push(likeRingSecret[tableIndex]);
        rentedImageGFHappy.push(rentedImageGFHappySecret[tableIndex]);
        rentedImageGFAngry.push(rentedImageGFAngrySecret[tableIndex]);
    }
}


Client.on("ready", () => {
    console.log("bot on")
        Client.user.setActivity('rent!', { type: 'PLAYING' })
});

Client.on("messageCreate", message => {
    if (message.author.bot) return;
    if(message.content === prefix)
    {
        message.channel.send("Uhm, you seem lost, try running rent!help :wink: ");
    }
    else if(message.content === prefix + "patchnote")
    {
        message.channel.send("**Version 0.3.1 :**\nLatest release :\n\n> Extended Shop Interest\n> Love point System Added\n> Secret Girls (2) Added \n*Now working on :*\n\n> Multi-Instance Handling\n> LovePoint Gameplay\n> Add Own GirlFriend\n> Get married");
    }
    else if(message.content === prefix + "hi")
    {
        message.channel.send("Hey, I'm Chizuru Ichinose, nice to meet you ♥\nI would love to get to know you more, call me whenever you want 👋");
    }
    else if (message.content === prefix + "date")
    {
        message.channel.send("I'm all yours for now!");
    }
    else if (message.content === prefix + "secret")
    {
        message.channel.send("This is something that you should had never discovered ... But at this point, maybe i should let you get a try ... 💎 \nI'll we be waiting for you darling ...");
    }
    else if (message.content === prefix + "help")
    {
        message.channel.send("**__List of commands :__**" + commands);
    }
    else if(message.content === prefix + "event")
    {
        const event = new Discord.MessageEmbed()
            .setColor("0bd3e6")
            .setTitle("**EVENEMENT ACTIF** : " + eventTitle)
            .setDescription("*Informations relatives à l'évenement en cours sur le serveur ...*")
            .setThumbnail("https://www.playerone.vg/wp-content/uploads/2020/08/Critica-de-Kanojo-Okarishimasu-destacada-El-Palomitron2-e1598033037864-370x305.jpg")
            .addField("⌛ Période de l'évènement :", eventPeriod)
            .addField("📃 Détails de l'évènement :", eventDescr)
            .addField("🚹 Eligibilité : ", eventAva)
            .setTimestamp();

        message.channel.send({embeds:[event]});
    }
    else if(message.content.startsWith(prefix + "setEvent"))
    {
        var eventPeriodTmp = message.content.split("|")[0,1];
        var eventDescrTmp = message.content.split("|")[1,2];
        var eventAvaTmp = message.content.split("|")[2,3];
        var titreTest = message.content.split("|")[0];
        console.log(titreTest);

        if(isUndefined(message.content.split(" ")[1]) || isUndefined(eventPeriodTmp) || isUndefined(eventDescrTmp) || isUndefined(eventAvaTmp) || eventPeriodTmp === '' || eventDescrTmp === '' || eventAvaTmp === '' || titreTest === "rent!setEvent ")
            {
                console.log("je suis au bon endroit");
                const eventT = new Discord.MessageEmbed()
                    .setColor("0bd3e6")
                    .setTitle("**EVENEMENT ACTIF** : " + eventTitle)
                    .setDescription("*Informations relatives à l'évenement en cours sur le serveur ...*")
                    .setThumbnail("https://www.playerone.vg/wp-content/uploads/2020/08/Critica-de-Kanojo-Okarishimasu-destacada-El-Palomitron2-e1598033037864-370x305.jpg")
                    .addField("⌛ Période de l'évènement :", eventPeriod)
                    .addField("📃 Détails de l'évènement :", eventDescr)
                    .addField("🚹 Eligibilité : ", eventAva)
                    .setTimestamp();

                message.channel.send({content: "Vous pouvez paramétrer les informations de l'évenement en cours avec rent!setEvent **eventTitle**|**eventPeriod**|**eventDetails**|**eventEligibilty** \n **Evènement en cours :**", embeds:[eventT] });
            }
        else 
        {
            var eventTitleTmp = message.content.split("|")[0];
            console.log(eventTitleTmp);
            eventTitle = eventTitleTmp.replace('rent!setEvent ', '');
            console.log(eventTitle);
            eventPeriod = message.content.split("|")[0,1];
            eventDescr = message.content.split("|")[1,2];
            eventAva = message.content.split("|")[2,3];

            const eventT = new Discord.MessageEmbed()
                    .setColor("0bd3e6")
                    .setTitle("**EVENEMENT ACTIF** : " + eventTitle)
                    .setDescription("*Informations relatives à l'évenement en cours sur le serveur ...*")
                    .setThumbnail("https://www.playerone.vg/wp-content/uploads/2020/08/Critica-de-Kanojo-Okarishimasu-destacada-El-Palomitron2-e1598033037864-370x305.jpg")
                    .addField("⌛ Période de l'évènement :", eventPeriod)
                    .addField("📃 Détails de l'évènement :", eventDescr)
                    .addField("🚹 Eligibilité : ", eventAva)
                    .setTimestamp();

            message.channel.send({content:"**EVENEMENT CONFIGURE :**", embeds:[eventT] });
        }
    }
    else if(message.content.startsWith(prefix + "log"))
    {
        if(isUndefined(message.content.split(" ")[1]))
            {
                message.channel.send("Vous pouvez changer le channel par défaut des logs du bot avec rent!log **nomDuChannel** \n**Channel par défaut actuel : **" + channelLogName);
            }
        else {
            channelLogName = message.content.split(" ")[1];
            const channelLogS = Client.channels.cache.find(channel => channel.name === channelLogName );
            if(isUndefined(channelLogS))
            {
                message.channel.send("**Nom inapproprié**");
            }
            else {
            message.channel.send("Log Channel : " + channelLogName);
            channelLogS.send("Logs are now sent here");}
        }
    }
    else if(message.content === prefix + "testLog")
    {
        const channelLogT = Client.channels.cache.find(channel => channel.name === channelLogName );
        channelLogT.send("J'ai autre chose à faire ... tu vois bien que ça marche non ? abruti ...");
    }
    else if(message.content.startsWith(prefix + "makeLog"))
    {
        if(isUndefined(message.content.split(" ")[1]))
            {
                message.channel.send("Vous pouvez envoyé un log personnalisé avec rent!makeLog **pseudoDuMembre** **montantKakera**");
            }
        else
        {
        var time = new Date();
        usrName = message.content.split(" ")[0,1];
        kkrValue = message.content.split(" ")[2];
        const channelLogP = Client.channels.cache.find(channel => channel.name === channelLogName );
        channelLogP.send(time.toLocaleString() + " : " + usrName + " + " + kkrValue + " " + kkrEmoji);

        usrName = " ";
        kkrValue = " ";
        }
    }
    else if(message.content.startsWith(prefix + "setEmoji"))
    {
        if(isUndefined(message.content.split(" ")[1]) || message.content.length > 45)
            {
                message.channel.send("Vous pouvez changer l'emoji représentant les kakeras avec rent!setEmoji **<:Emoji:ID>**");
            }
        else
        {
            kkrEmoji = message.content.split(" ")[1];
            message.channel.send("Nouvel Emoji : " + kkrEmoji);
        }
    }
    else if (message.content === prefix + "embedHelp")
    {
        const embed = new Discord.MessageEmbed()
            .setColor("eb4034")
            .setTitle("Command List :")
            .setURL("https://pornhub.com")
            .setDescription("*Chizuru-san is so greatful, she lets you use all those following interactions freely with her !* ♥")
            .setThumbnail("https://i.pinimg.com/736x/09/06/bd/0906bdfcecb2a9665bde4d32879b92e5.jpg")
            .setTimestamp();

        let i = 0;
        commandTable.forEach(element => {
            embed.addField(element, descrTable[i]);
            i++;
        });
            
        message.channel.send({embeds:[embed]});
    }
    else if (message.content.startsWith(prefix + "roll"))
    {
        maxrolltmp = Number(message.content.split(" ")[1]);
        console.log(message.content.split(" ")[1]);
        console.log(maxroll);
        if(isNaN(maxrolltmp) || !Number.isSafeInteger(maxrolltmp) || maxrolltmp <= 0)
        {
            if(isUndefined(message.content.split(" ")[1]))
            {
                message.channel.send("Vous pouvez changer la valeur max des rolls lors des duels de Harem avec rent!roll **valeur** \n**Valeur actuelle : **" + maxroll);
            }
            else {message.channel.send("Saisis une valeur cohérente bolos \n**Valeur saisie : **" + message.content.split(" ")[1]);}
        }
        else {maxroll = Number(message.content.split(" ")[1]);message.channel.send("Rolls set on " + maxroll);}
    }
    else if (message.content.startsWith(prefix + "score"))
    {
        maxscoretmp = Number(message.content.split(" ")[1]);
        console.log(message.content.split(" ")[1]);
        console.log(maxscore);
        if(isNaN(maxscoretmp) || !Number.isSafeInteger(maxscoretmp) || maxscoretmp <= 0)
        {
            if(isUndefined(message.content.split(" ")[1]))
            {
                message.channel.send("Vous pouvez changer la valeur du score à atteindre lors des duels de Harem avec rent!score **valeur** \n**Valeur actuelle : **" + maxscore);
            }
            else {message.channel.send("Saisis une valeur cohérente bolos \n**Valeur saisie : **" + message.content.split(" ")[1]);}
        }
        else {maxscore = Number(message.content.split(" ")[1]);message.channel.send("Score Maximum : " + maxscore);}
    }
    else if (message.content === prefix + "duel")
    {
        var fight = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Go")
                .setLabel("Combat !")
                .setStyle("SUCCESS")
                .setEmoji("⚔"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Cancel")
                .setLabel("J'ai pas les couilles enfaite")
                .setStyle("DANGER")
                .setEmoji("🐓")
            );
            
        nbPlayers = 0;
        nbMise = 0;
        score = [];
        idPlayers = [];
        rdyP = 0;
        userId = [];
        username = [];

        message.channel.send({content: "Ready to fight ?", components: [fight]});
    }
    else if(message.content === prefix + "diamond")
    {
        indexGF = 0;

        var logIn = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectToDiamond")
                .setLabel("INSTALLER DIAMOND")
                .setStyle("SUCCESS")
                .setEmoji("💎"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Disconnect")
                .setLabel("Mauvaise idée")
                .setStyle("SECONDARY")
                .setEmoji("❎"));
        
        if(!diamondUserConnected.includes(message.author.id)){
        diamondUserConnected.push(message.author.id);
        console.log(message.author.id);
        message.channel.send({content: "*Votre télephone vibre étrangement? \nDans un grand flash blanc, votre téléphone vous propose de vous rediriger vers le lien suivant : https://diamond.app/rent \nCe lien semble innacessible, cependant il semblerait que vous puissiez installer l'application* **DIAMOND**", components: [logIn]});
        }
        else{message.channel.send("T'as deux vies tocard ?")}
}
    else if(message.content === prefix + "work")
    {
        var index = userDiamondID.indexOf(message.author.id);

        if(!userDiamondID.includes(message.author.id)){}

        else 
        {
            var alea = Math.floor(Math.random() * 21);
            console.log(alea);
            switch(alea.toString())
            {
                case '0':
                case '1':
                userBalance[index] = userBalance[index] - 25000;
                message.channel.send("Décidemment, vous faites vraiment pitié ... Votre patron vous a foutu à la porte après que vous eûtes essayé d'enregistrer le numéro de votre collègue en prenant son téléphone en cachette ... \nMalheureusement, ce dernier vous a lâché des mains, et il est désomais foutu !\n*Vous avez dû lui en racheter un, et en plus elle a pris le dernier modèle sorti...* - 25.000 :yen:");
                break
                case '2':
                case '3':
                case '4':
                var thune = Math.floor(Math.random() * 5000) + 10000;
                userBalance[index] = userBalance[index] + thune;
                message.channel.send("Vous vendez votre Tajine comme des petits pains ... Qui l’eût cru ?\n Le résultat de cette journée vous a permis d'accumuler " + userBalance[index] + " :yen: au total !");
                break
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '10':
                var thune = Math.floor(Math.random() * 3000) + 3000;
                userBalance[index] = userBalance[index] + thune;
                message.channel.send("Bon boulot ça ! \nTon porte-monnaie se rempli bien ! Tu as " + userBalance[index] + " :yen:");
                break
                case '11':
                case '12':
                case '13':
                case '14':
                case '15':
                case '16':
                case '17':
                case '18':
                case '19':
                var thune = Math.floor(Math.random() * 3000) + 1500;
                userBalance[index] = userBalance[index] + thune;
                message.channel.send("Quel taff épuisant ... Vous avez malgré tout gagné un peu de faf\nVous possédez " + userBalance[index] + " :yen:");
                break
                case '20':
                var thune = Math.floor(Math.random() * 10000) + 50000;
                userBalance[index] = userBalance[index] + thune;
                message.channel.send("Travailler pour le président Macron n'a jamais été aussi fructueux ! Vous avez discrètement détourné quelques fonds publics, mais c'est pour la bonne cause ...\nVotre coffre-fort compte maintenant " + userBalance[index] + " :yen: ");
                break;
                default :
                break
            }
        }
    }
    else if(message.content === prefix + "motherlode")
    {
        var index = userDiamondID.indexOf(message.author.id);

        if(!userDiamondID.includes(message.author.id)){}

        else 
        {
        userBalance[index] = userBalance[index] + 100000000000000;
        message.channel.send("<@" + message.author.id + "> t'as pas honte de tricher comme ça ! Tu te rends compte qu'avoir " + userBalance[index] + " :yen: c'est louche ?!");
        }
    }
});

Client.on("messageReactionAdd", (reaction, user) => {
    if(reaction.message.content === "$daily" && reaction.emoji.name === "✅" && (user.id === "238332449367654401" || user.id === "432610292342587392")) //first is THS admin id and second is Mudae id
    {
        const eventPopUp = new Discord.MessageEmbed()
            .setColor("21eb13")
            .setTitle(eventTitle)
            .setURL("https://www.gouvernement.fr/argumentaire/mes-aidesgouvfr-un-site-pour-evaluer-ses-droits-aux-prestations-et-aides-sociales")
            .addField(eventDescr + "\n\n**Voulez-vous récupérez votre récompenses ? **", "*Les admins ont accès aux logs et messages, tout abus, même s'il s'agit d'un exploit ou usebug, sera puni*")
            .setTimestamp();

        var claim = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Claim")
                .setLabel("RECUPERER MES GAINS")
                .setStyle("SUCCESS")
                .setEmoji("💰"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Disconnect")
                .setLabel("ANNULER")
                .setStyle("SECONDARY")
                .setEmoji("❌"));

        reaction.message.reply({embeds:[eventPopUp], components:[claim]});
    }
});

      
        
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Client.on("interactionCreate", async interaction => {


    if(interaction.isButton())
    {
        if(interaction.customId === "Go")
        {
            // interaction.reply("Début du combat !");

            const select = new Discord.MessageSelectMenu()
                        .setCustomId("Player")
                        .setPlaceholder("Nombre de Joueurs ...");
            let j = 0;
            nbPlayer.forEach(element => {
                select.addOptions({
                    label: element,
                    description: descrPlayer[j],
                    value: valuePlayer[j]
                });
            j++;
            });  
            const nbJ = new Discord.MessageActionRow()
                .addComponents(select);
            
            await interaction.update({content: '**Sélectionnez le nombre de joueurs pour ce combat :**', components: [nbJ]});
                
        }

        else if(interaction.customId === "Ready")
        {
            let pp = interaction.user.avatarURL();
            let pseudo = interaction.user.tag;

            if(rdyP <= nbPlayers)
            {
                idPlayersTmp = interaction.user.tag;
                usernameTmp = interaction.user.username;
                userIdTmp = interaction.user.id;

                var confirm = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("ReadyC")
                        .setLabel("OUI")
                        .setStyle("SUCCESS")
                        .setEmoji("✔"))
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("CancelC")
                        .setLabel("Enfaite ... non")
                        .setStyle("DANGER")
                        .setEmoji("💨")
            );

                if(!idPlayers.includes(pseudo))
                {
                    const embedPlayer = new Discord.MessageEmbed()
                        .setColor("000000")
                        .setTitle("Nouveau Joueur")
                        .setDescription(interaction.user.username + " es-tu prêt à en découdre ?")
                        .setThumbnail(pp)
                        .setTimestamp();

                    
                await interaction.update({embeds: [embedPlayer], components: [confirm]});
                }

                else if (idPlayers.includes(pseudo))
                {
                    const relouPlayer = new Discord.MessageEmbed()
                        .setColor("DCDDCD")
                        .setTitle("Mate le gros relou :")
                        .setDescription(interaction.user.username + ", vous êtes déjà préparé à ce combat épique, stop spam guignol !")
                        .setThumbnail(pp)
                        .setTimestamp();

                    var clc = new Discord.MessageActionRow()
                        .addComponents(new Discord.MessageButton()
                            .setCustomId("clc")
                            .setLabel("Ok j'arrête ...")
                            .setStyle("SECONDARY")
                            .setEmoji("🆗")
            );
                        
                await interaction.update({embeds: [relouPlayer], components: [clc]});
                }
            }
        }
        else if(interaction.customId === "CancelC" || interaction.customId === "clc")
        {
            var ready = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Ready")
                .setLabel("Prêt !")
                .setStyle("SUCCESS")
                .setEmoji("🗡"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Stop")
                .setLabel("Annuler le combat")
                .setStyle("SECONDARY")
                .setEmoji("❌")
            );
            await interaction.update({content: "Vous avez misé **" + nbMise + "** " + kkrEmoji + "\n Pour lancer le combat, tous les joueurs clique sur **prêt** \n **" + rdyP + "/" + nbPlayers + "** prêts", embeds: [], components: [ready]});
        }
        else if(interaction.customId === "ReadyC")
        {
            if(interaction.user.id != userIdTmp){}
            else{
            score[rdyP] = 0;
            idPlayers[rdyP] = idPlayersTmp;
            username[rdyP] = usernameTmp;
            userId[rdyP] = userIdTmp;
            rdyP++;

            var ready = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Ready")
                .setLabel("Prêt !")
                .setStyle("SUCCESS")
                .setEmoji("🗡"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Stop")
                .setLabel("Annuler le combat")
                .setStyle("SECONDARY")
                .setEmoji("❌")
            );
        
            if(rdyP != nbPlayers)
            {
                await interaction.update({content: "Vous avez misé **" + nbMise + "** " + kkrEmoji + "\n Pour lancer le combat, tous les joueurs clique sur **prêt** \n **" + rdyP + "/" + nbPlayers + "** prêts", embeds: [], components: [ready]});
            }
            else if (rdyP == nbPlayers)
            {
                var done = new Discord.MessageActionRow()
                        .addComponents(new Discord.MessageButton()
                            .setCustomId("done")
                            .setLabel("C'est fait !")
                            .setStyle("SUCCESS")
                            .setEmoji("✅")
                        );      

                await interaction.update({content: "Avant de commencer, faites **rent!roll** suivi d'un nombre pour set la valeur max lors des rolls et **rent!score** suivi d'un nombre pour set le score à atteindre", embeds: [], components: [done]});
            }
        }
        }
        
        else if (interaction.customId === "done")
        {
            let concat = "";
            username.forEach(element =>
                {
                    concat += element + "\n"; 
            });

            const resume = new Discord.MessageEmbed()
                .setColor("eb4034")
                .setTitle("🔪 Détails du combat : ")
                .setDescription("Pour modifier les valeurs max de score et de rolls, utilisez respectivement les commandes **rent!score** et **rent!roll**.")
                .setThumbnail("https://i0.wp.com/9tailedkitsune.com/wp-content/uploads/2020/08/Snimka-obrazovky-394.png")
                .addField("Score à atteindre :", maxscore.toString())
                .addField("Roll max :", maxroll.toString())
                .addField("Mise :", nbMise.toString())
                .addField("Joueurs :", concat)
                .setTimestamp();

            var Gogo = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("Start")
                    .setLabel("Commencer le DUEL !")
                    .setStyle("SUCCESS")
                    .setEmoji("⚔"))
                .addComponents(new Discord.MessageButton()
                    .setCustomId("Stop")
                    .setLabel("Annuler le combat")
                    .setStyle("SECONDARY")
                    .setEmoji("❌")
                );

            await interaction.update({embeds:[resume], components: [Gogo]});
        }
        else if(interaction.customId === "Start")
        {
            const scoreG = new Discord.MessageEmbed()
            .setColor("eb4034")
            .setTitle("🔪 Progression du Duel : ")
            .setDescription("La bataille vient de commencer, voyons qui sera à la hauteur.")
            .addField("Score à atteindre :", maxscore.toString())
            .addField("Rappel mise :", nbMise.toString());

            let s = 0;
            username.forEach(element =>
            {
                scoreG.addField(element.toString(), score[s].toString());
                s++;
            });

            var suivant = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("Next")
                        .setLabel("Première manche !")
                        .setStyle("SECONDARY")
                        .setEmoji("▶"));

            await interaction.update({content: "Que le meilleur gagne !", embeds: [scoreG], components: [suivant]});

        }
        else if(interaction.customId === "0" || interaction.customId === "1" || interaction.customId === "2" || interaction.customId === "3" || interaction.customId === "4")
        {
            score[interaction.customId]++;
            console.log(score[interaction.customId]);
            console.log(maxscore);

            if(score[interaction.customId] == maxscore)
            {
                gain = nbMise * (nbPlayers - 1);
                const endG = new Discord.MessageEmbed()
                    .setColor("eb4034")
                    .setTitle("VICTOIRE")
                    .setDescription("Parmi tous ces harems, seulement un en est ressorti vainqueur !")
                    .setThumbnail("https://i.pinimg.com/736x/92/bd/dd/92bddda156b1b7c6c10304a20c1f2a24.jpg")
                    .addField("Gagnant :", username[interaction.customId].toString())
                    .addField("Récompenses :", gain.toString());

                var victory = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("GG")
                        .setLabel("Obtenir ces gains")
                        .setStyle("SUCCESS")
                        .setEmoji("🏆"));

                winner = username[interaction.customId];
                winnerId = userId[interaction.customId];

                await interaction.update({content: "**FIN DE DUEL ! **", embeds: [endG], components: [victory]});
            }
            else if (score[interaction.customId] < maxscore)
            {
            const scoreG1 = new Discord.MessageEmbed()
            .setColor("eb4034")
            .setTitle("🔪 Progression du Duel : ")
            .setDescription("La Tension est palpable ...")
            .addField("Score à atteindre :", maxscore.toString())
            .addField("Rappel mise :", nbMise.toString());

            var suivant = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("Next")
                        .setLabel("Manche suivante")
                        .setStyle("SECONDARY")
                        .setEmoji("⏭"));

            let t = 0;
            username.forEach(element =>
            {
                scoreG1.addField(element.toString(), score[t].toString());
                t++;
            });

            await interaction.update({content: "Que le meilleur gagne !", embeds: [scoreG1], components: [suivant]});
            }
            else {console.log("ça beug");}
        }
        else if(interaction.customId === "Next")
        {
            console.log(score);
            console.log(idPlayers);
            console.log(userId);
            console.log(username);

            random = Math.floor(Math.random() * maxroll) + 1;

            const test = new Discord.MessageEmbed()
            .setColor("eb4034")
            .setTitle("🔪 Progression du Duel : ")
            .setDescription("La Tension est palpable ...")
            .addField("Score à atteindre :", maxscore.toString())
            .addField("Rappel mise :", nbMise.toString());

            let o = 0;
            username.forEach(element =>
            {
                test.addField(element.toString(), score[o].toString());
                o++;
            });
            
            await interaction.update({content: "Que le meilleur gagne !", embeds:[test], components:[]});

            let c = 0;
            while (c < nbPlayers)
            {
                await interaction.channel.send({content: "$mmi <@" + userId[c] + "> " + random, components: []});
                await interaction.channel.send({content: "/mm /i <@" + userId[c] + "> " + random, components: []});
                c++;
            }

            var playR = new Discord.MessageActionRow();
            let k = 0;
            username.forEach(element => {
                playR.addComponents(new Discord.MessageButton()
                        .setCustomId(k.toString())
                        .setLabel(element)
                        .setStyle("SUCCESS")
                        .setEmoji("➕"));
                k++;
            })

            await interaction.channel.send({content: "**Sélectionner le gagnant de la manche !**", components: [playR]});
        }
        else if(interaction.customId === "GG")
        {   
            if(interaction.user.id == winnerId){
            interaction.update({content: "Congratulations " + winner + " !" , embeds: [], components: []});
            await interaction.channel.send("$givescrap <@" + winnerId + "> " + gain);

            var timeW = new Date();
            const channelLogWtmp = Client.channels.cache.find(channel => channel.name === channelLogName );
            channelLogWtmp.send(timeW.toLocaleString() + " : " + winner + " a gagné " + gain + " " +  kkrEmoji + " lors d'un Duel de Harem !");

            nbPlayers = 0;
            nbMise = 0;
            score = [];
            idPlayers = [];
            rdyP = 0;
            userId = [];
            username = [];
            winner = " ";
            winnerId = " ";
            gain = 0;}
            
            else {await interaction.reply("<@" + interaction.user.id + "> tu t'amuses bien bouffon ?");}

        }
        else if(interaction.customId === "StopC")
        {
        }
        else if(interaction.customId === "Stop")
        {
            await interaction.update({content : "C'était cool de me déranger pour ça en tout cas ... ", embeds: [], components: []});
        }

        else if(interaction.customId === "Cancel")
        {
            await interaction.update({content : "Procédure annulée ... Je retourne chez moi", components: []});
        }
        else if(interaction.customId === "ConnectToDiamond")
        {
        var Connect = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC")
                .setLabel("Log To DIAMOND")
                .setStyle("SUCCESS")
                .setEmoji("💎"))
            
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

        var diamondUserName = interaction.user.username + extra;

        await interaction.update({content: "**INSTALLATION TERMINEE** \nConnexion à DIAMOND.app \n**Login : [" + diamondUserName + "]** \n**Password : **⏹⏹⏹⏹⏹⏹⏹", components: [Connect]});
        }
        else if(interaction.customId === "Disconnect")
        {
        if(diamondUserConnected.includes(interaction.user.id))
        {
            var ind = diamondUserConnected.indexOf(interaction.user.id);
            diamondUserConnected.splice(ind, 1);
            await interaction.update({content: "...", embeds:[], components: []});
        }
        }
        else if(interaction.customId === "ConnectC")
        {
            paidDate = 0;
            if(!userDiamondID.includes(interaction.user.id))
            {
                userDiamondID[nbDiamondUser] = interaction.user.id;
                userTaille[nbDiamondUser] = Math.floor(Math.random() * 71) + 140;
                userBalance[nbDiamondUser] = Math.floor(Math.random() * 50000) + 2500;
                if(Math.floor(Math.random() * 2) == 0)
                {
                    userGenre[nbDiamondUser] = ":male_sign:";
                }
                else
                {
                    userGenre[nbDiamondUser] = "♀️";
                }
                userOwnedChocolate[nbDiamondUser] = 0;
                userOwnedRing[nbDiamondUser] = 0;
                userOwnedScarf[nbDiamondUser] = 0;
                userOwnedBook[nbDiamondUser] = 0;
                userLovePoint[nbDiamondUser] = 0;
                nbDiamondUser++;
            }

        const Home = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("*Diamond est une application de RGF, un service de location de petites-amies* \n *Cherchez la copine de vos rêves, louez ces services et passez un moment idyllique que vous n'oublierez jamais ...*")
            .setThumbnail("https://randomc.net/image/Kanojo%20Okarishimasu/Kanojo%20Okarishimasu%20-%2001%20-%20Large%2007.jpg")
            .addField(":mobile_phone: Navigation :", "> Home page \n> Profile Page \n> Rent Page \n> Shop Page")
            .addField(":yen: Prix moyen : ", "7.500 ¥ / heure")
            .setFooter("Diamond Inc. © - Bringing the best for you")
            .setTimestamp();

        var Navigation = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Profile")
                .setLabel("See Profile")
                .setStyle("SUCCESS")
                .setEmoji("🤹‍♀️"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("GF")
                .setLabel("See Available GirlFriends")
                .setStyle("PRIMARY")
                .setEmoji("💃"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Shop")
                .setLabel("Shop")
                .setStyle("DANGER")
                .setEmoji("🛒"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Disconnect")
                .setLabel("Exit")
                .setStyle("SECONDARY")
                .setEmoji("❌"));
        
        
        await interaction.update({content: "*Your phone is displaying this ...*", embeds:[Home], components: [Navigation]});
        }
        else if(interaction.customId === "Profile")
        {
        if(!userDiamondID.includes(interaction.user.id)){}
        else{
        let avatar = interaction.user.avatarURL();
        var stuff = "";

        var place = userDiamondID.indexOf(interaction.user.id);
        console.log(place);
        console.log(userGenre[place]);
        console.log(userTaille[place]);
        console.log(userBalance[place]);
        let Ch =0;
        let Rg = 0;
        let Sc = 0;
        let Bk = 0;
        
        while(userOwnedChocolate[place] > Ch)
        {
            stuff += "🍫  ";
            Ch++
        }
        while(userOwnedBook[place] > Bk)
        {
            stuff += "📔  ";
            Bk++
        }
        while(userOwnedScarf[place] > Sc)
        {
            stuff += "🧣  ";
            Sc++
        }
        while(userOwnedRing[place] > Rg)
        {
            stuff += "💍  ";
            Rg++
        }
        
        const Profile = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("*Profile de " + interaction.user.username + "*")
            .setThumbnail(avatar)
            .addField("Genre : ", userGenre[place])
            .addField("Taile : ", userTaille[place].toString() + " cm")
            .addField("Porte-Feuille :", userBalance[place].toString() + " :yen:")
            .setFooter("Diamond Inc. © - Bringing the best for you")
            .setTimestamp();

        if(userOwnedChocolate[place] > 0 || userOwnedBook[place] > 0 || userOwnedScarf[place] > 0 || userOwnedRing[place] > 0)
        {
            Profile.addField("Inventaire :", stuff);
        }  
        if(userLovePoint[place] > 0)
        {
            Profile.addField("Love Points :", userLovePoint[place].toString());
        }

        var NavigationP = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC")
                .setLabel("Back Home")
                .setStyle("SUCCESS")
                .setEmoji("🏡"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Disconnect")
                .setLabel("Exit")
                .setStyle("SECONDARY")
                .setEmoji("❌"));
            
        await interaction.update({content: "*Your phone is displaying this ...*", embeds:[Profile], components: [NavigationP]});
    }}
    else if(interaction.customId === "GF" || interaction.customId === "Nxt" || interaction.customId === "Prv")
    {

        if(interaction.customId === "Nxt"){indexGF++;}
        else if(interaction.customId === "Prv"){indexGF--;}

        if (indexGF >= nameGF.length) { indexGF = 0 }
        else if (indexGF < 0) {  indexGF = nameGF.length - 1}
        console.log(indexGF, imageGF[indexGF]);
        feelingGF = "Neutral";

        const GF = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .addField("Name : ", nameGF[indexGF])
            .addField("Gender : ", genderGF[indexGF])
            .addField("Age :", ageGF[indexGF])
            .addField("Height :", heightGF[indexGF])
            .addField("Personnality :", personnalityGF[indexGF])
            .setImage(imageGF[indexGF])
            .addField("Rental Price (per hour)", priceGF[indexGF] + " :yen:")
            .addField('Rented by :', rentedGF[indexGF])
            .setFooter("Diamond Inc. © - Bringing the best for you")
            .setTimestamp();

        if(ownedbyGF[indexGF] != "No one")
        {
            GF.addField("Owned by : ", ownedbyGF[indexGF]);
        }   
        var NavigationGF = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Prv")
                .setLabel("PREVIOUS")
                .setStyle("SECONDARY")
                .setEmoji("◀"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("RentGF")
                .setLabel("RENT HER !")
                .setStyle("SUCCESS")
                .setEmoji("💲"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Nxt")
                .setLabel("NEXT")
                .setStyle("SECONDARY")
                .setEmoji("▶")); 
        var HomeGF = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC")
                .setLabel("Back Home Page")
                .setStyle("PRIMARY")
                .setEmoji("🏡"));

        await interaction.update({content: "*Your phone is displaying this ...*", embeds:[GF], components: [NavigationGF, HomeGF]});
    }
    else if(interaction.customId === "RentGF")
    {
        var index = userDiamondID.indexOf(interaction.user.id);
        console.log(index);
        console.log(userBalance[index]);
        if(userBalance[index] >= priceGF[indexGF] && paidDate == 0)
        {
            paidDate = 1;
            userBalance[index] = userBalance[index] - priceGF[indexGF];
        }
        if(paidDate == 1)
        {   
            rentedGF[indexGF] = interaction.user.username;

            const RGF = new Discord.MessageEmbed()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND - Date overview ")
                .addField("Purchase: ", "You have rented " + nameGF[indexGF] + " for one hour")
                .addField("Paiement Recap : ", priceGF[indexGF] + " :yen:")
                .addField('Rented by :', rentedGF[indexGF])
                .setFooter("Diamond Inc. © - Bringing the best for you")
                .setTimestamp();
            
            switch(feelingGF)
            {
                case 'Neutral':
                    RGF.setDescription(nameGF[indexGF] + " sort avec vous !");
                    RGF.setImage(rentedImageGF[indexGF]);
                    break
                case 'Happy':
                    RGF.setDescription(nameGF[indexGF] + " est heureuse de passer ce moment avec vous !");
                    RGF.setImage(rentedImageGFHappy[indexGF]);
                    break
                case 'Angry':
                    RGF.setDescription(nameGF[indexGF] + " semble confuse ...");
                    RGF.setImage(rentedImageGFAngry[indexGF]);
                    break
                default:
                    break
            }

            var BackHome = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("Gift")
                    .setLabel("Give a present")
                    .setStyle("PRIMARY")
                    .setEmoji("🎁"))
                .addComponents(new Discord.MessageButton()
                    .setCustomId("ConnectC")
                    .setLabel("Back Home Page")
                    .setStyle("SUCCESS")
                    .setEmoji("🏡"));
            
        await interaction.update({content: "*I'm yours now ...*", embeds:[RGF], components: [BackHome]});
        }
        else
        {
            var BackHome = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("ConnectC")
                    .setLabel("Back Home Page")
                    .setStyle("SUCCESS")
                    .setEmoji("🏡"));
            
            await interaction.update({content: "*Not enough money, maybe you can think by yousrself finding a way to earn some money*", embeds:[], components: [BackHome]});
        }
    }
    else if(interaction.customId === "Shop")
    {
        var indexDiamondUser = userDiamondID.indexOf(interaction.user.id);

        const Profile = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Bienvenue au magasin DIAMOND Corp.\n*Ici, vous pouvez acheter toutes sortes d'articles directement depuis votre smartphone.*\n***Aucun remboursement possible***")
            .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoxETY5SVyRHCp_uegfkPgmKB5GeIgJUtC-1V7H2kdHnG9L7IsDRwpUCvW7b3YSpHuupA&usqp=CAU")
            .addField("Article 1 : :chocolate_bar:", "Description : Un tablette de chocolat au lait, 250g.\nPrix : 2000 :yen:")
            .addField("Article 2 : :notebook_with_decorative_cover:", "Description : Un livre sur l'histoire contemporaine du Japon. Plutôt ennuyant...\nPrix : 4000 :yen:")
            .addField("Article 3 : :scarf:", "Description : Une belle écharpe rouge vif.\nPrix : 7000 :yen:")
            .addField("Article 4 : :ring:", "Description : Une magnifique bague, ornée d'une pierre précieuse rare.\nPrix : 10.000 :yen:")
            .addField("Porte-Monnaie :", userBalance[indexDiamondUser] + " :yen:")
            .setFooter("Diamond Inc. © - Bringing the best for you")
            .setTimestamp();

        var NavigationP = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Chocolate")
                .setLabel("Buy 1")
                .setStyle("PRIMARY")
                .setEmoji("🍫"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Book")
                .setLabel("Buy 1")
                .setStyle("PRIMARY")
                .setEmoji("📔"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Scarf")
                .setLabel("Buy 1")
                .setStyle("PRIMARY")
                .setEmoji("🧣"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Ring")
                .setLabel("Buy 1")
                .setStyle("PRIMARY")
                .setEmoji("💍"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC")
                .setLabel("Back Home")
                .setStyle("SUCCESS")
                .setEmoji("🏡"));
            
        await interaction.update({content: "*Your phone is displaying this ...*", embeds:[Profile], components: [NavigationP]});
    }
    else if(interaction.customId === "Chocolate" || interaction.customId === "Book" || interaction.customId === "Scarf" || interaction.customId === "Ring")
    {
        var indexDiamondUser = userDiamondID.indexOf(interaction.user.id);
        const achat = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setFooter("Diamond Inc. © - Bringing the best for you")
            .setTimestamp();

        switch(interaction.customId)
        {
            case 'Chocolate' :
                if(userBalance[indexDiamondUser] >= 2000)
                {
                    userBalance[indexDiamondUser] = userBalance[indexDiamondUser] - 2000;
                    achat.setDescription("DIAMOND Corp. vous remercie de votre achat.\nDétails de votre commission :");
                    achat.addField("Article acheté :", "1 tablette de chocolat 🍫");
                    achat.addField("Porte-Monnaie :", userBalance[indexDiamondUser] + " :yen:");
                    userOwnedChocolate[indexDiamondUser] = userOwnedChocolate[indexDiamondUser] + 1; 
                    if(userOwnedChocolate[indexDiamondUser] == 10){addSecretGirl("Itsuki Nakano");}
                }
                else{achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé ...");}
                break
            case 'Book' :
                if(userBalance[indexDiamondUser] >= 4000)
                {
                    userBalance[indexDiamondUser] = userBalance[indexDiamondUser] - 4000;
                    achat.setDescription("DIAMOND Corp. vous remercie de votre achat.\nDétails de votre commission :");
                    achat.addField("Article acheté :", "1 livre d'histoire 📔");
                    achat.addField("Porte-Monnaie :", userBalance[indexDiamondUser] + " :yen:");
                    userOwnedBook[indexDiamondUser] = userOwnedBook[indexDiamondUser] + 1;
                    if(userOwnedBook[indexDiamondUser] == 10){addSecretGirl("Yukino Yukinoshita");}
                }
                else{achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé ...");}
                break
            case 'Scarf' :
                if(userBalance[indexDiamondUser] >= 7000)
                {
                    userBalance[indexDiamondUser] = userBalance[indexDiamondUser] - 7000;
                    achat.setDescription("DIAMOND Corp. vous remercie de votre achat.\nDétails de votre commission :");
                    achat.addField("Article acheté :", "1 écharpe rouge :scarf:");
                    achat.addField("Porte-Monnaie :", userBalance[indexDiamondUser] + " :yen:");
                    userOwnedScarf[indexDiamondUser] = userOwnedScarf[indexDiamondUser] + 1;
                }
                else{achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé ...");}
                break   
            case 'Ring' :
                if(userBalance[indexDiamondUser] >= 10000)
                {
                    userBalance[indexDiamondUser] = userBalance[indexDiamondUser] - 10000;
                    achat.setDescription("DIAMOND Corp. vous remercie de votre achat.\nDétails de votre commission :");
                    achat.addField("Article acheté :", "1 magnifique bague :ring:");
                    achat.addField("Porte-Monnaie :", userBalance[indexDiamondUser] + " :yen:");
                    userOwnedRing[indexDiamondUser] = userOwnedRing[indexDiamondUser] + 1;
                }
                else{achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé ...");}
                break
            default:
                achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé ...");
                break
        }

        var shopB = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
                .setCustomId("Shop")
                .setLabel("Back to Shop")
                .setStyle("DANGER")
                .setEmoji("🛒"))
        .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC")
                .setLabel("Back Home")
                .setStyle("SUCCESS")
                .setEmoji("🏡"));

        await interaction.update({content: "*Your phone is displaying this ...*", embeds:[achat], components: [shopB]});
    }
    else if(interaction.customId === "Gift")
    {
        var stuff = "";
        var place = userDiamondID.indexOf(interaction.user.id);
        let Ch =0;
        let Rg = 0;
        let Sc = 0;
        let Bk = 0;

        var ChooseG = new Discord.MessageActionRow();

        if(userOwnedChocolate[place] > Ch){
        ChooseG.addComponents(new Discord.MessageButton()
            .setCustomId("ChocolateG")
            .setLabel("Offer 1")
            .setStyle("PRIMARY")
            .setEmoji("🍫"))
            while(userOwnedChocolate[place] > Ch)
            {
            stuff += "🍫  ";
            Ch++
            }}

        if(userOwnedBook[place] > Bk){
        ChooseG.addComponents(new Discord.MessageButton()
            .setCustomId("BookG")
            .setLabel("Offer 1")
            .setStyle("PRIMARY")
            .setEmoji("📔"))
            while(userOwnedBook[place] > Bk)
            {
            stuff += "📔  ";
            Bk++
            }}
        
        if(userOwnedScarf[place] > Sc){
        ChooseG.addComponents(new Discord.MessageButton()
            .setCustomId("ScarfG")
            .setLabel("Offer 1")
            .setStyle("PRIMARY")
            .setEmoji("🧣"))
            while(userOwnedScarf[place] > Sc)
            {
            stuff += "🧣  ";
            Sc++
            }}
        
        if(userOwnedRing[place] > Rg){
        ChooseG.addComponents(new Discord.MessageButton()
            .setCustomId("RingG")
            .setLabel("Offer 1")
            .setStyle("PRIMARY")
            .setEmoji("💍"))
            while(userOwnedRing[place] > Rg)
            {
            stuff += "💍  ";
            Rg++
            }}

        const Profile = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Vous êtes sur le point d'offrir un cadeau à " + nameGF[indexGF] + ".")
            .setThumbnail(ppGF[indexGF])
            .setFooter("Diamond Inc. © - Bringing the best for you")
            .setTimestamp();

        ChooseG.addComponents(new Discord.MessageButton()
                .setCustomId("RentGF")
                .setLabel("Back to Date")
                .setStyle("SUCCESS")
                .setEmoji("🌆"));

        if(userOwnedChocolate[place] > 0 || userOwnedBook[place] > 0 || userOwnedScarf[place] > 0 || userOwnedRing[place] > 0)
        {
            Profile.addField("Inventaire", stuff);
        }
        else{Profile.addField("Inventaire", "Vous ne possédez rien ...");}
            
        await interaction.update({content: "*You seem to hesitate ...*", embeds:[Profile], components: [ChooseG]});
    }
    else if(interaction.customId === "ChocolateG" || interaction.customId === "BookG" || interaction.customId === "ScarfG" || interaction.customId === "RingG")
    {   
        paidDate = 1;
        switch(interaction.customId)
        {
            case 'ChocolateG':
                feelingGFtmp = likeChocolate[indexGF];
                gift = "du chocolat";
                break
            case 'BookG':
                feelingGFtmp = likeBook[indexGF];
                gift = "un livre";
                break
            case 'ScarfG':
                feelingGFtmp = likeScarf[indexGF];
                gift = "une écharpe";
                break
            case 'RingG':
                feelingGFtmp = likeRing[indexGF];
                gift = "une bague";
                break
            default:
                break
        }
        const giftC = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Voulez-vous vraiment offrir " + gift + " à " + nameGF[indexGF] + ".")
            .setThumbnail(ppGF[indexGF])
            .setFooter("Diamond Inc. © - Bringing the best for you")
            .setTimestamp();

        var confirmGift = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConfirmGift")
                .setLabel("Yes")
                .setStyle("SUCCESS")
                .setEmoji("✔"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("RentGF")
                .setLabel("No, back to Date")
                .setStyle("SECONDARY")
                .setEmoji("❌"));

        await interaction.update({content: "*You are hiding the gift behind your back, will you do it ... ?*", embeds:[giftC], components: [confirmGift]});
    }
    else if(interaction.customId === "ConfirmGift")
    {
        var place = userDiamondID.indexOf(interaction.user.id);
        feelingGF = feelingGFtmp;
        paidDate = 1;
        if(feelingGF === "Happy")
        {
            var aleaLP = Math.floor(Math.random() * 4)+ 1;
            userLovePoint[place] = aleaLP*(indexGF+1) + userLovePoint[place];
            console.log("LovePoint : " + userLovePoint[place] + " Alea : " + aleaLP);
        }
        
        switch(gift){
            case 'du chocolat':
                userOwnedChocolate[place] = userOwnedChocolate[place] -1;
                break
            case 'un livre':
                userOwnedBook[place] = userOwnedBook[place] -1;
                break
            case 'une écharpe':
                userOwnedScarf[place] = userOwnedScarf[place] -1;
                break
            case 'une bague':
                userOwnedRing[place] = userOwnedRing[place] -1;
            default:
                break
        }
        const giftCD = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Vous avez offert " + gift + " à " + nameGF[indexGF] + ".")
            .addField("Love point :", userLovePoint[place].toString())
            .setThumbnail(ppGF[indexGF])
            .setFooter("Diamond Inc. © - Bringing the best for you")
            .setTimestamp();
        
        var backDate = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
            .setCustomId("RentGF")
            .setLabel("Back to Date")
            .setStyle("SECONDARY")
            .setEmoji("🌆"));
        
        await interaction.update({content: "*No one expects you doing this ... pretty courageous.*", embeds:[giftCD], components: [backDate]});
    }
    // suite GF











    else if(interaction.customId === "Claim")
    {
        var time = new Date();
        await interaction.update({content:"☑ Un admin va être notifié afin que vous obteniez votre récompense !\n" + admin + " " + interaction.user.tag + " aimerait toucher sa récompense !", embeds:[], components:[]});
        const channelLogE = Client.channels.cache.find(channel => channel.name === channelLogName );
        channelLogE.send(time.toLocaleString() + " : " + interaction.user.tag + " + " + kkrValueEvent + " " + kkrEmoji);
    }

    }

    else if(interaction.isSelectMenu()){
        if(interaction.customId === "Player"){

            console.log(interaction.values);

            const mise = new Discord.MessageSelectMenu()
                        .setCustomId("Bet")
                        .setPlaceholder("Montant de la mise ...");
            let h = 0;
            bets.forEach(element => {
                mise.addOptions({
                    label: element + " " + kkrEmoji ,
                    description: descrBets[h],
                    value: valueBets[h]
                });
            h++;
            }); 

            const msgMise = new Discord.MessageActionRow()
                .addComponents(mise);

            switch(interaction.values[0])
            {
                case '2' :
                case '3' :
                case '4' :
                case '5' :
                console.log(interaction.values + " Joueurs");
                nbPlayers = interaction.values;
                await interaction.update({content: "Ok, vous allez jouer à " + nbPlayers, components: [msgMise]});
                break;
                default :
                await interaction.update({content: "Something might went wrong ...", components: []});
            }
        }
        if(interaction.customId == "Bet")
        {
            var ready = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Ready")
                .setLabel("Prêt !")
                .setStyle("SUCCESS")
                .setEmoji("🗡"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Stop")
                .setLabel("Annuler le combat")
                .setStyle("SECONDARY")
                .setEmoji("❌")
            );

            switch(interaction.values[0])
            {
                case '100' :
                case '250' :
                case '500' :
                case '1000' :
                case '5000' :
                console.log("Mise : " + interaction.values);
                nbMise = Number(interaction.values);
                await interaction.update({content: "Vous avez misé **" + nbMise + "** " + kkrEmoji + "\n Pour lancer le combat, tous les joueurs clique sur **prêt** \n **" + rdyP + "/" + nbPlayers + "** prêts", components: [ready]});
                break;
                default :
                await interaction.update({content: "Something might went wrong ...", components: []});
            }
        }
    }
});

Client.login("OTUxOTA3MDkyMzA0ODkxOTU1.YiuSkA.W7HSVDmvl2CCMpyzsRvKn8ybXT0");