require('dotenv').config()
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
const botVersion = "0.4.2";

var commands = "\n - date \n - hi \n - help \n - version \n - embedHelp \n - event \n - setEvent \n - duel \n - roll \n - score \n - log \n - testLog \n - makeLog \n - setEmoji \n - patchnote";

let commandTable = ["rent!date", "rent!hi", "rent!help", "rent!version", "rent!event", "rent!setEvent", "rent!log", "rent!testLog", "rent!makeLog", "rent!embedHelp", "rent!duel", "rent!roll", "rent!score", "rent!setEmoji", "rent!patchnote"];
let descrTable = ["Basic command, you can check if the bot is working", "Say Hello to Chizuru", "Display all bot's commands", "Display bot version", "Display current event information", "Custom current event | Args : **eventTitle**|**eventPeriod**|**eventDetails**|**eventEligibilty** ", "Change the log channel for bot's logs", "Send a log", "Send a custom log. Args : **memberName**|**kakeraAmount**", "Display all bot's commands into an embed form", "Commence un combat de Harem entre différents membres du serveur", "Set la valeur max pour les rolls lors des duels de Harem", "Fixe le score maximal à atteindre lors des duels de Harem", "Change l'emoji resprésentant les kakeras lorsque le bot envoie un message l'utilisant", "Display latest Version patchnote"];

let nbPlayer = ["2P", "3P", "4P", "5P"];
let descrPlayer = ["DUEL", "TRIANGLE AMOUREUX", "CLUB ECHANGISTE", "BATTLE ROYALE"];
let valuePlayer = ["2", "3", "4", "5"];

let bets = ["100", "250", "500", "1000", "5000"];
let descrBets = ["Petits joueurs", "Pari entre amis", "Classique", "Pari compétitif", "Tentative d'escroquerie légitime"];
let valueBets = ["100", "250", "500", "1000", "5000"];

let channelLogName = "log-event";
let usrName = "undefinedUserName";
let kkrValue = "undefinedKakeraAmount";
let kkrEmoji = "<:kakera:950050987412951051>";

let eventTitle = "Pierres précieuses";
let eventPeriod = "21/03/2022 | 00h00 (UTC+1) - 27/03/2022 | 23h59 (UTC+1)";
let eventDescr = "Les réacts turquoises rapportent x4" + kkrEmoji + "et les vertes x3" + kkrEmoji;
let eventAva = "Tous les joueurs sauf multi-comptes.";
let eventColor = "5bed07";
let kkrValueEvent = []; // Event Paramater
    
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
let priceGF = ["10000", "16000", "22000", "36000"];
let rentedImageGF = ["https://c.tenor.com/CggCyPOXQYkAAAAC/ruka.gif", "https://c.tenor.com/Q26Wo2nMfYgAAAAC/mami-mami-nanami.gif", "https://c.tenor.com/P3uVcdtRdmwAAAAC/sumi-sumi-sakurasawa.gif", "https://c.tenor.com/_8NSw3TnEgoAAAAC/chizuru-mizuhara-bokeh-mizuhara.gif"]
let rentedGF = ["No one", "No one", "No one", "No one"];
let ppGF = ["https://i.pinimg.com/originals/fd/6c/6b/fd6c6bb31b3a064c8cb3b3ec93ccf590.jpg", "https://i.pinimg.com/originals/d1/ce/ad/d1cead5ac226ba3e4147a6f140e9f912.jpg", "https://i.pinimg.com/originals/3c/1d/9d/3c1d9db983b585ab66ce18b4a6df6d1c.jpg", "https://i.pinimg.com/originals/97/dc/72/97dc72b5690142e50b8b820cf7973394.jpg"];
let likeChocolate =["Happy", "Neutral", "Happy", "Angry"];
let likeBook = ["Happy", "Angry", "Neutral", "Angry"];
let likeScarf = ["Angry", "Neutral", "Happy", "Happy"];
let likeRing = ["Happy", "Happy", "Angry", "Neutral"];
let likeRose = ["Happy", "Angry", "Neutral", "Happy"];
let likeKnife = ["Neutral", "Angry", "Neutral", "Angry"];
let likeTeddyBear = ["Happy", "Happy", "Happy", "Happy"];
let rentedImageGFHappy = ["https://i.imgur.com/KLUVb3v.gif", "https://media0.giphy.com/media/o6VIsU59zlFwaw5vsp/giphy.gif", "https://c.tenor.com/uhN9oVUXm6QAAAAC/kanokari-kanojo-okarishimasu.gif", "https://c.tenor.com/_JKiVTUp2_sAAAAd/rent-a-girlfriend-kanojo-okarishimasu.gif"];
let rentedImageGFAngry =["https://i.imgur.com/mbQzyHI.gif", "https://c.tenor.com/ST2QJoTEXcMAAAAC/mami-rent-a-girlfriend.gif", "https://imgur.com/w7Tl0nZ.gif", "https://c.tenor.com/OJ7dWLRs3JAAAAAC/mizuhara-chizuru.gif"];
let priceGFLP = [250, 800, 1250, 2525];
let marryGF = ["https://i.redd.it/xrktzpgsllj51.jpg", "https://i.imgur.com/zsDTMKA.jpg", "https://i.imgur.com/fRQWaqN.jpg", "https://i.pinimg.com/236x/10/e4/ca/10e4ca861d7ffa2edee4f6470f865a93.jpg"]
let ownedbyGF = ["No one", "No one", "No one", "No one"];
let ownedbyGFuserDiamondID = ["None", "None", "None", "None"];

let nameGFSecret = ["Itsuki Nakano", "Yukino Yukinoshita", "Yukana Yame", "Aki Adagaki", "Shuka Karino"];
let genderGFSecret = ["♀️", "♀️", "♀️", "♀️", "♀️"];
let ageGFSecret = ["17", "17", "17", "16", "16"];
let heightGFSecret = ["159 cm", "166 cm", "160 cm", "164 cm", "149 cm"];
let personnalityGFSecret = ["Serious, Well-manered, Rancorous, Glottonous", "Prideful, Talented, Extremely Smart, Outspoken", "Sweet, Carefree, Gal, Playful", "Cruel, Self-aware, Guzzler, Flat", "Friendly, Deadly, Jealous, Tameable"];
let imageGFSecret = ["https://i.imgur.com/WFJzBTC.gif", "https://i.imgur.com/HXRMEKd.gif", "https://i.imgur.com/GvuIgSJ.gif", "https://imgur.com/syJpkRe.gif", "https://imgur.com/UqmVKaP.gif"];
let priceGFSecret = ["20000", "26000", "18000", "24000", "28000"];
let rentedImageGFSecret = ["https://c.tenor.com/6DYdJKGxCdoAAAAC/nakano-itsuki-go-toubun-no-hanayome.gif", "https://i.pinimg.com/originals/e4/e8/bd/e4e8bddc5cf5bcb4b2a5d216da0a3b66.gif", "https://c.tenor.com/dciMBaLoRe0AAAAC/hajimete-no-gal-smile.gif", "https://data.whicdn.com/images/348245935/original.gif", "https://c.tenor.com/jVGbM5FRknsAAAAC/darwinsgame.gif"];
let ppGFSecret = ["https://i.redd.it/0pn4put2p8661.jpg", "https://www.nautiljon.com/images/perso/00/99/yukinoshita_yukino_9599.jpg", "https://i.pinimg.com/564x/69/fc/1b/69fc1b9a39afff73a74fb3049a61cc28.jpg", "https://i.pinimg.com/originals/e0/0a/85/e00a85d7e42f81b5ab0caea47bbb827a.jpg", "https://i.pinimg.com/originals/2b/07/e1/2b07e12a0da374810b8a66d2a5cff28b.png"];
let likeChocolateSecret = ["Happy", "Neutral", "Neutral", "Happy", "Angry"];
let likeBookSecret = ["Neutral", "Happy", "Angry", "Neutral", "Neutral"];
let likeScarfSecret = ["Angry", "Happy", "Happy", "Angry", "Neutral"];
let likeRingSecret = ["Neutral", "Angry", "Happy", "Happy", "Happy"];
let likeRoseSecret = ["Neutral", "Happy", "Neutral", "Angry", "Happy"];
let likeKnifeSecret = ["Angry", "Neutral", "Angry", "Happy", "Happy"];
let likeTeddyBearSecret = ["Neutral", "Happy", "Happy", "Angry", "Happy"];
let priceGFLPSecret = [1500, 1765, 1445, 1495, 1830];
let marryGFSecret = ["https://i.pinimg.com/736x/7c/6a/5b/7c6a5b57ebbbaf24b5c39df2e7f441c7.jpg", "https://static.zerochan.net/Yukinoshita.Yukino.full.2253104.jpg", "https://images5.alphacoders.com/103/1032303.jpg", "https://i.pinimg.com/236x/56/36/76/563676ea833afb5e22ee3fce83e14510--anime-meme-mom.jpg", "https://s3.zerochan.net/240/01/06/2812801.jpg"];
let rentedImageGFHappySecret =["https://i.pinimg.com/originals/8d/3c/26/8d3c26c691419c47c45c49b521b39568.gif", "https://38.media.tumblr.com/1008d0881e5e92fa9c8f18eb91c766df/tumblr_np52popXiM1u9f4wvo1_540.gif", "https://c.tenor.com/SND5birWDXkAAAAC/hajimete-no-gal-smile.gif", "https://i.pinimg.com/originals/49/fd/f9/49fdf9e93bd214542be60ab9c5c4ac7e.gif", "https://64.media.tumblr.com/5964c7f87f60aad9863777bf9092609c/1f50096f9d1b8dbc-6d/s540x810/ebb90503170e9b106ffd1a16a012aa3f32899564.gif"];
let rentedImageGFAngrySecret =["https://pa1.narvii.com/7097/dfcc2b8bc6c5818a78e320375a5b5cc7c51384f6r1-498-282_hq.gif", "https://64.media.tumblr.com/f7a62821963ea57b2e1510e667590591/tumblr_nmxml3T5Td1rcufwuo1_500.gif", "https://c.tenor.com/JDY8KhMlynwAAAAC/hajimete-no-gal-gal.gif", "https://c.tenor.com/JljBKC9XpawAAAAC/aki-adagaki.gif", "https://64.media.tumblr.com/975fa03a89c8ed737808d11a0a18d4a1/49f4ceb2ed5f82f6-5c/s400x600/1bde87deace3ce7be0cfba40ca8b49973f8759e7.gif"];



let gift = "";
let paidDateUser = [];

let userOwnedChocolate = [];
let userOwnedRing = [];
let userOwnedScarf = [];
let userOwnedBook = [];
let userLovePoint = [];
let userOwnedRose = [];
let userOwnedKnife = [];
let userOwnedTeddyBear = [];
let userFreeRentTicket = [];
let userFreeCasinoTicket = [];
let userCasinoToken = [];

let dice = 0;

let papyk = "<@!257534244048338944>";
let THS = "<@238332449367654401>";
let admin =  papyk;
let diamondUserConnected = [];

function addSecretGirl (GFname)
{
    if(nameGF.includes(GFname)){}
    else
    {
        var tableIndex = nameGFSecret.indexOf(GFname);
        rentedGF.push("No one");
        ownedbyGF.push("No one");
        ownedbyGFuserDiamondID.push("None");
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
        likeRose.push(likeRoseSecret[tableIndex]);
        likeKnife.push(likeKnifeSecret[tableIndex]);
        likeTeddyBear.push(likeTeddyBearSecret[tableIndex]);
        rentedImageGFHappy.push(rentedImageGFHappySecret[tableIndex]);
        rentedImageGFAngry.push(rentedImageGFAngrySecret[tableIndex]);
        priceGFLP.push(priceGFLPSecret[tableIndex]);
        marryGF.push(marryGFSecret[tableIndex]);
    }
}


Client.on("ready", () => {
    console.log("bot on")
        Client.user.setActivity('rent!', { type: 'PLAYING' })
});

Client.on("messageCreate", message => {
    //if (message.author.bot) return;
    // console.log(message.content);
    if(message.content === prefix)
    {
        message.channel.send("Uhm, you seem lost, try running rent!help :wink: ");
    }
    else if(message.content === prefix + "patchnote")
    {
        message.channel.send("**Version " + botVersion + ":**\nLatest release :\n\n> Casino Page\n> Coin system\n> Secret Girls (3) more Added\n> Gacha\n> Dice Game\n> New items available\n> Specific features : Free Ticket RENT/Casino Roll & Awkward Present \n\n*Now working on :*\n\n> Multi-Instance Handling\n> Add Own GirlFriend");
    }
    else if(message.content === prefix + "version")
    {
        message.channel.send("Bot version running on your server : " + botVersion);
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
        message.channel.send("This is something that you should had never discovered... But at this point, maybe i should let you get a try... 💎 \nI'll be waiting for you darling...");
    }
    else if (message.content === prefix + "help")
    {
        message.channel.send("**__List of commands :__**" + commands);
    }
    else if(message.content === prefix + "event")
    {
        const event = new Discord.MessageEmbed()
            .setColor(eventColor)
            .setTitle("**ÉVÈNEMENT ACTIF** : " + eventTitle)
            .setDescription("*Informations relatives à l'évènement en cours sur le serveur...*")
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
                    .setTitle("**ÉVÈNEMENT ACTIF** : " + eventTitle)
                    .setDescription("*Informations relatives à l'évènement en cours sur le serveur...*")
                    .setThumbnail("https://www.playerone.vg/wp-content/uploads/2020/08/Critica-de-Kanojo-Okarishimasu-destacada-El-Palomitron2-e1598033037864-370x305.jpg")
                    .addField("⌛ Période de l'évènement :", eventPeriod)
                    .addField("📃 Détails de l'évènement :", eventDescr)
                    .addField("🚹 Eligibilité : ", eventAva)
                    .setTimestamp();

                message.channel.send({content: "Vous pouvez paramétrer les informations de l'évènement en cours avec rent!setEvent **eventTitle**|**eventPeriod**|**eventDetails**|**eventEligibilty** \n**Évènement en cours :**", embeds:[eventT] });
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
                    .setTitle("**ÉVÈNEMENT ACTIF** : " + eventTitle)
                    .setDescription("*Informations relatives à l'évènement en cours sur le serveur...*")
                    .setThumbnail("https://www.playerone.vg/wp-content/uploads/2020/08/Critica-de-Kanojo-Okarishimasu-destacada-El-Palomitron2-e1598033037864-370x305.jpg")
                    .addField("⌛ Période de l'évènement :", eventPeriod)
                    .addField("📃 Détails de l'évènement :", eventDescr)
                    .addField("🚹 Eligibilité : ", eventAva)
                    .setTimestamp();

            message.channel.send({content:"**ÉVÈNEMENT CONFIGURE :**", embeds:[eventT] });
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
        channelLogT.send("J'ai autre chose à faire... tu vois bien que ça marche non ? abruti...");
    }
    else if(message.content.startsWith(prefix + "makeLog"))
    {
        if(isUndefined(message.content.split(" ")[1]))
            {
                message.channel.send("Vous pouvez envoyer un log personnalisé avec rent!makeLog **pseudoDuMembre**|**montantKakera**");
            }
        else
        {
        var time = new Date();
        usrName = message.content.split("g")[1];
        usrName = usrName.split("|")[0];
        kkrValue = message.content.split("|")[0,1];
        const channelLogP = Client.channels.cache.find(channel => channel.name === channelLogName );
        channelLogP.send(time.toLocaleString() + " :" + usrName + " + " + kkrValue + " " + kkrEmoji);

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
                .setCustomId("ConnectToDiamond" + message.author.id)
                .setLabel("INSTALLER DIAMOND")
                .setStyle("SUCCESS")
                .setEmoji("💎"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Disconnect" + message.author.id)
                .setLabel("Mauvaise idée")
                .setStyle("SECONDARY")
                .setEmoji("❎"));
        
        if(!diamondUserConnected.includes(message.author.id)){
        diamondUserConnected.push(message.author.id);
        
            if(!userDiamondID.includes(message.author.id))
                {
                userDiamondID[nbDiamondUser] = message.author.id;
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
                userOwnedKnife[nbDiamondUser] = 0;
                userOwnedRose[nbDiamondUser] = 0;
                userOwnedTeddyBear[nbDiamondUser] = 0;
                userFreeRentTicket[nbDiamondUser] = 1; // TESTO
                userFreeCasinoTicket[nbDiamondUser] = 1; 
                userCasinoToken[nbDiamondUser] = 500; // TESTO
                userLovePoint[nbDiamondUser] = 5000; //TESTO
                paidDateUser[nbDiamondUser] = 0;
                nbDiamondUser++;
                console.log(message.author.id);
                message.channel.send({content: "*Votre téléphone vibre étrangement ?\nDans un grand flash blanc, votre téléphone vous propose de vous rediriger vers le lien suivant : https://diamond.app/rent \nCe lien semble inaccessible, cependant il semblerait que vous puissiez installer l'application* **DIAMOND**", components: [logIn]});
                }
                else
                {
                    var Connect = new Discord.MessageActionRow()
                        .addComponents(new Discord.MessageButton()
                        .setCustomId("ConnectC" + message.author.id)
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

                    var diamondUserName = message.author.username + extra;

                    message.channel.send({content: "**INSTALLATION TERMINÉE** \nConnexion à DIAMOND.app \n**Login : [" + diamondUserName + "]** \n**Password : **⏹⏹⏹⏹⏹⏹⏹", components: [Connect]});
                }
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
                message.channel.send("Décidemment, vous faites vraiment pitié... Votre patron vous a foutu à la porte après que vous eûtes essayé d'enregistrer le numéro de votre collègue en prenant son téléphone en cachette... \nMalheureusement, ce dernier vous a lâché des mains, et il est désomais foutu !\n*Vous avez dû lui en racheter un, et en plus elle a pris le dernier modèle sorti...* - 25.000 :yen:");
                break
                case '2':
                case '3':
                case '4':
                var thune = Math.floor(Math.random() * 5000) + 10000;
                userBalance[index] = userBalance[index] + thune;
                message.channel.send("Vous vendez votre Tajine comme des petits pains... Qui l’eût cru ?\nLe résultat de cette journée vous a permis d'accumuler " + userBalance[index] + " :yen: au total !");
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
                message.channel.send("Quel taff épuisant... Vous avez malgré tout gagné un peu de faf\nVous possédez " + userBalance[index] + " :yen:");
                break
                case '20':
                var thune = Math.floor(Math.random() * 10000) + 50000;
                userBalance[index] = userBalance[index] + thune;
                message.channel.send("Travailler pour le président Macron n'a jamais été aussi fructueux ! Vous avez discrètement détourné quelques fonds publics, mais c'est pour la bonne cause...\nVotre coffre-fort compte maintenant " + userBalance[index] + " :yen: ");
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
    else if(message.content.startsWith("<:kakeraT:609264180851376132>"))
    {
        var extraction = Number((message.content.split("+")[1]).split("*")[0]);
        kkrValueEvent.push(extraction*4);
        console.log(message);
        {
            const eventPopUp = new Discord.MessageEmbed()
                .setColor("21eb13")
                .setTitle(eventTitle)
                .setURL("https://www.gouvernement.fr/argumentaire/mes-aidesgouvfr-un-site-pour-evaluer-ses-droits-aux-prestations-et-aides-sociales")
                .addField(eventDescr + "\n\n**Voulez-vous récupérez votre récompenses ? (" + extraction*4 + kkrEmoji + ")**", "*Les admins ont accès aux logs et messages, tout abus, même s'il s'agit d'un exploit ou usebug, sera puni*")
                .setTimestamp();
    
            var claim = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("Claim")
                    .setLabel("RECUPERER MES GAINS")
                    .setStyle("SUCCESS")
                    .setEmoji("💰"))
                .addComponents(new Discord.MessageButton()
                    .setCustomId("CancelClaim")
                    .setLabel("ANNULER")
                    .setStyle("SECONDARY")
                    .setEmoji("❌"));
    
            message.reply({embeds:[eventPopUp], components:[claim]});
        }
    }
    else if(message.content.startsWith("<:kakeraG:609264166381027329>"))
    {
        var extraction = Number((message.content.split("+")[1]).split("*")[0]);
        kkrValueEvent.push(extraction*3);
        console.log(message);
        {
            const eventPopUp = new Discord.MessageEmbed()
                .setColor("21eb13")
                .setTitle(eventTitle)
                .setURL("https://www.gouvernement.fr/argumentaire/mes-aidesgouvfr-un-site-pour-evaluer-ses-droits-aux-prestations-et-aides-sociales")
                .addField(eventDescr + "\n\n**Voulez-vous récupérez votre récompenses ? (" + extraction*3 + kkrEmoji + ")**", "*Les admins ont accès aux logs et messages, tout abus, même s'il s'agit d'un exploit ou usebug, sera puni*")
                .setTimestamp();
    
            var claim = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("Claim")
                    .setLabel("RECUPERER MES GAINS")
                    .setStyle("SUCCESS")
                    .setEmoji("💰"))
                .addComponents(new Discord.MessageButton()
                    .setCustomId("CancelClaim")
                    .setLabel("ANNULER")
                    .setStyle("SECONDARY")
                    .setEmoji("❌"));
    
            message.reply({embeds:[eventPopUp], components:[claim]});
        }
    }
    // else if(message.content.startsWith("<"))
    // {
    //     console.log(message.content);
    //     message.channel.send("j'ai recup l\'id");
    // }
});

// Client.on("messageReactionAdd", (reaction, user) => {
//     if(reaction.message.content === "$daily" && reaction.emoji.name === "✅" && (user.id === "238332449367654401" || user.id === "432610292342587392")) //first is THS admin id and second is Mudae id
//     {
//         const eventPopUp = new Discord.MessageEmbed()
//             .setColor("21eb13")
//             .setTitle(eventTitle)
//             .setURL("https://www.gouvernement.fr/argumentaire/mes-aidesgouvfr-un-site-pour-evaluer-ses-droits-aux-prestations-et-aides-sociales")
//             .addField(eventDescr + "\n\n**Voulez-vous récupérez votre récompenses ? **", "*Les admins ont accès aux logs et messages, tout abus, même s'il s'agit d'un exploit ou usebug, sera puni*")
//             .setTimestamp();

//         var claim = new Discord.MessageActionRow()
//             .addComponents(new Discord.MessageButton()
//                 .setCustomId("Claim")
//                 .setLabel("RECUPERER MES GAINS")
//                 .setStyle("SUCCESS")
//                 .setEmoji("💰"))
//             .addComponents(new Discord.MessageButton()
//                 .setCustomId("CancelClaim")
//                 .setLabel("ANNULER")
//                 .setStyle("SECONDARY")
//                 .setEmoji("❌"));

//         reaction.message.reply({embeds:[eventPopUp], components:[claim]});
//     }
// });

      
        
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Client.on("interactionCreate", async interaction => {


    if(interaction.isButton())
    {
        if(interaction.customId === "Go")
        {
            // interaction.reply("Début du combat !");

            const select = new Discord.MessageSelectMenu()
                        .setCustomId("Player")
                        .setPlaceholder("Nombre de Joueurs...");
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
                        .setLabel("Enfaite... non")
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
                            .setLabel("Ok j'arrête...")
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
            await interaction.update({content: "Vous avez misé **" + nbMise + "**" + kkrEmoji + "\nPour lancer le combat, tous les joueurs doivent cliquer sur **prêt** \n **" + rdyP + "/" + nbPlayers + "** prêts", embeds: [], components: [ready]});
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
                await interaction.update({content: "Vous avez misé **" + nbMise + "**" + kkrEmoji + "\nPour lancer le combat, tous les joueurs doivent cliquer sur **prêt** \n **" + rdyP + "/" + nbPlayers + "** prêts", embeds: [], components: [ready]});
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
            .setDescription("La tension est palpable...")
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
            .setDescription("La tension est palpable...")
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
                //await interaction.channel.send({content: "/mm /i <@" + userId[c] + "> " + random, components: []});
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
            await interaction.update({content : "C'était cool de me déranger pour ça en tout cas... ", embeds: [], components: []});
        }

        else if(interaction.customId === "Cancel")
        {
            await interaction.update({content : "Procédure annulée... Je retourne chez moi", components: []});
        }
        else if(interaction.customId === "ConnectToDiamond" + interaction.user.id)
        {
        var Connect = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC" + interaction.user.id)
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
        else if(interaction.customId === "Disconnect" + interaction.user.id)
        {
        if(diamondUserConnected.includes(interaction.user.id))
        {
            var ind = diamondUserConnected.indexOf(interaction.user.id);
            diamondUserConnected.splice(ind, 1);
            await interaction.update({content: "Disconnected from Diamond Network", embeds:[], components: []});
        }
        }
        else if(interaction.customId === "ConnectC" + interaction.user.id)
        {

        const Home = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("*Diamond est une application de RGF, un service de location de petites-amies.*\n*Cherchez la copine de vos rêves, louez ses services et passez un moment idyllique que vous n'oublierez jamais...*")
            .setThumbnail("https://randomc.net/image/Kanojo%20Okarishimasu/Kanojo%20Okarishimasu%20-%2001%20-%20Large%2007.jpg")
            .addField(":mobile_phone: Navigation :", "> Home Page \n> Profile Page \n> Rent Page \n> Shop Page")
            .addField(":yen: Prix moyen : ", "7.500 ¥ / heure")
            .setFooter("Diamond Inc. © - Bringing the best for you")
            .setTimestamp();

        var Navigation = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Profile" + interaction.user.id)
                .setLabel("Profile")
                .setStyle("SUCCESS")
                .setEmoji("🤹‍♀️"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("GF" + interaction.user.id)
                .setLabel("GirlFriends")
                .setStyle("PRIMARY")
                .setEmoji("💃"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Shop" + interaction.user.id)
                .setLabel("Shop")
                .setStyle("DANGER")
                .setEmoji("🛒"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Lottery" + interaction.user.id)
                .setLabel("Lottery")
                .setStyle("DANGER")
                .setEmoji("🎊"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Disconnect" + interaction.user.id)
                .setLabel("Exit")
                .setStyle("SECONDARY")
                .setEmoji("❌"));
        
                paidDateUser[userDiamondID.indexOf(interaction.user.id)] = 0;
        await interaction.update({content: "*Your phone is displaying this...*", embeds:[Home], components: [Navigation]});
        }
        else if(interaction.customId === "Profile" + interaction.user.id)
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
        let Rs = 0;
        let Kf = 0;
        let Tb = 0;
        let FrT =0;
        
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
        while(userOwnedRose[place] > Rs)
        {
            stuff += "🌹  ";
            Rs++
        }
        while(userOwnedKnife[place] > Kf)
        {
            stuff += "🔪  ";
            Kf++
        }
        while(userOwnedTeddyBear[place] > Tb)
        {
            stuff += "🧸  ";
            Tb++
        }
        while(userFreeRentTicket[place] > FrT)
        {
            stuff += "🎟️  ";
            FrT++;
        }
        
        const Profile = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("*Profil de " + interaction.user.username + "*")
            .setThumbnail(avatar)
            .addField("Genre :", userGenre[place])
            .addField("Taile :", userTaille[place].toString() + " cm")
            .addField("Porte-Feuille :", userBalance[place].toString() + " :yen:")
            .setFooter("Diamond Inc. © - Bringing the best for you")
            .setTimestamp();

        if(userOwnedChocolate[place] > 0 || userOwnedBook[place] > 0 || userOwnedScarf[place] > 0 || userOwnedRing[place] > 0 || userOwnedRose[place] > 0 || userOwnedKnife[place] > 0 || userOwnedTeddyBear > 0 || userFreeRentTicket[place] > 0)
        {
            Profile.addField("Inventaire :", stuff);
        }  
        if(userLovePoint[place] > 0)
        {
            Profile.addField("Love Points :", userLovePoint[place].toString());
        }

        var NavigationP = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC" + interaction.user.id)
                .setLabel("Back Home")
                .setStyle("SUCCESS")
                .setEmoji("🏡"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Succes" + interaction.user.id)
                .setLabel("Back Home")
                .setStyle("SUCCESS")
                .setEmoji("🏆"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Disconnect" + interaction.user.id)
                .setLabel("Exit")
                .setStyle("SECONDARY")
                .setEmoji("❌"));
            
        await interaction.update({content: "*Your phone is displaying this...*", embeds:[Profile], components: [NavigationP]});
    }}
    else if(interaction.customId === "GF" + interaction.user.id || interaction.customId === "Nxt" + interaction.user.id || interaction.customId === "Prv" + interaction.user.id)
    {

        if(interaction.customId === "Nxt" + interaction.user.id){indexGF++;}
        else if(interaction.customId === "Prv" + interaction.user.id){indexGF--;}
        var indexUser = userDiamondID.indexOf(interaction.user.id);
        if (indexGF >= nameGF.length) { indexGF = 0 }
        else if (indexGF < 0) {  indexGF = nameGF.length - 1}
        console.log(indexGF, imageGF[indexGF]);
        feelingGF = "Neutral";

        const GF = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .addField("Name:", nameGF[indexGF])
            .addField("Gender:", genderGF[indexGF])
            .addField("Age:", ageGF[indexGF])
            .addField("Height:", heightGF[indexGF])
            .addField("Personnality:", personnalityGF[indexGF])
            .setImage(imageGF[indexGF])
            .addField("Rental Price (per hour):", priceGF[indexGF] + " :yen:")
            .addField('Rented by:', rentedGF[indexGF])
            .setFooter("Diamond Inc. © - Bringing the best for you")
            .setTimestamp();

        if(ownedbyGF[indexGF] != "No one")
        {
            GF.addField("Owned by:", ownedbyGF[indexGF]);
        }
           
        var NavigationGF = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Prv" + interaction.user.id)
                .setLabel("PREVIOUS")
                .setStyle("SECONDARY")
                .setEmoji("◀"));
            if(userFreeRentTicket[indexUser] > 0)
            {
                NavigationGF.addComponents(new Discord.MessageButton()
                .setCustomId("RentGF" + interaction.user.id)
                .setLabel("FREE RENT !")
                .setStyle("SUCCESS")
                .setEmoji("🎟️"));
            }
            else
            {
            NavigationGF.addComponents(new Discord.MessageButton()
                .setCustomId("RentGF" + interaction.user.id)
                .setLabel("RENT HER !")
                .setStyle("SUCCESS")
                .setEmoji("💲"));
            }
            if(userLovePoint[indexUser] >= priceGFLP[indexGF] && ownedbyGF[indexGF] === "No one")
            {
                NavigationGF.addComponents(new Discord.MessageButton()
                    .setCustomId("Marry" + interaction.user.id)
                    .setLabel("MARRY HER")
                    .setStyle("DANGER")
                    .setEmoji("👰"));
            }
            NavigationGF.addComponents(new Discord.MessageButton()
                .setCustomId("Nxt" + interaction.user.id)
                .setLabel("NEXT")
                .setStyle("SECONDARY")
                .setEmoji("▶")); 
        var HomeGF = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC" + interaction.user.id)
                .setLabel("Back Home Page")
                .setStyle("PRIMARY")
                .setEmoji("🏡"));

        

        await interaction.update({content: "*Your phone is displaying this...*", embeds:[GF], components: [NavigationGF, HomeGF]});
    }
    else if(interaction.customId === "RentGF" + interaction.user.id)
    {
        var index = userDiamondID.indexOf(interaction.user.id);
        console.log(index);
        console.log(userBalance[index]);
        if(ownedbyGFuserDiamondID[indexGF] === interaction.user.id)
        {
            paidDateUser[index] = 1;
        }
        else if(userFreeRentTicket[index] > 0 && !paidDateUser[index])
        {
            paidDateUser[index] = 1;
            userFreeRentTicket[index]--;
        }
        else if(userBalance[index] >= priceGF[indexGF] && !paidDateUser[index])
        {
            paidDateUser[index] = 1;
            userBalance[index] -= priceGF[indexGF];

            if(ownedbyGFuserDiamondID[indexGF] != "None")
            {
                var idUsrtmp = ownedbyGFuserDiamondID[indexGF];
                var idUsr = userDiamondID.indexOf(idUsrtmp);
                userBalance[idUsr] = userBalance[idUsr] + priceGF[indexGF]/2;
            };
        }
        if(paidDateUser[index] == 1)
        {   
            rentedGF[indexGF] = interaction.user.username;

            const RGF = new Discord.MessageEmbed()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND - Date overview ")
                .addField("Purchase:", "You have rented " + nameGF[indexGF] + " for one hour.")
                .addField("Paiement Recap:", priceGF[indexGF] + " :yen:")
                .addField('Rented by:', rentedGF[indexGF])
                .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
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
                    RGF.setDescription(nameGF[indexGF] + " semble confuse...");
                    RGF.setImage(rentedImageGFAngry[indexGF]);
                    break
                default:
                    break
            }

            var BackHome = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("Gift" + interaction.user.id)
                    .setLabel("Give a present")
                    .setStyle("PRIMARY")
                    .setEmoji("🎁"))
            if(userOwnedRose[index] > 0 || userOwnedKnife[index] > 0 || userOwnedTeddyBear[index] > 0)
            {
                BackHome.addComponents(new Discord.MessageButton()
                    .setCustomId("GiftA" + interaction.user.id)
                    .setLabel("Give an awkward present")
                    .setStyle("DANGER")
                    .setEmoji("🎒"))
            }
                    BackHome.addComponents(new Discord.MessageButton()
                    .setCustomId("ConnectC" + interaction.user.id)
                    .setLabel("Back Home Page")
                    .setStyle("SUCCESS")
                    .setEmoji("🏡"));
            
        await interaction.update({content: "*I'm yours now...*", embeds:[RGF], components: [BackHome]});
        }
        else
        {
            var BackHome = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("ConnectC" + interaction.user.id)
                    .setLabel("Back Home Page")
                    .setStyle("SUCCESS")
                    .setEmoji("🏡"));
            
            await interaction.update({content: "*Not enough money, maybe you can think by yousrself finding a way to earn some money.*", embeds:[], components: [BackHome]});
        }
    }
    else if(interaction.customId === "Shop" + interaction.user.id)
    {
        var indexDiamondUser = userDiamondID.indexOf(interaction.user.id);

        const Profile = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Bienvenue au magasin DIAMOND Corp.\n*Ici, vous pouvez acheter toutes sortes d'articles directement depuis votre smartphone.*\n***Aucun remboursement possible***")
            .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoxETY5SVyRHCp_uegfkPgmKB5GeIgJUtC-1V7H2kdHnG9L7IsDRwpUCvW7b3YSpHuupA&usqp=CAU")
            .addField("Article 1 : :chocolate_bar:", "Description : Une tablette de chocolat au lait, 250g.\nPrix : 2000 :yen:")
            .addField("Article 2 : :notebook_with_decorative_cover:", "Description : Un livre sur l'histoire contemporaine du Japon. Plutôt ennuyant...\nPrix : 4000 :yen:")
            .addField("Article 3 : :scarf:", "Description : Une belle écharpe rouge vif.\nPrix : 7000 :yen:")
            .addField("Article 4 : :ring:", "Description : Une magnifique bague, ornée d'une pierre précieuse rare.\nPrix : 10.000 :yen:")
            .addField("Porte-Monnaie :", userBalance[indexDiamondUser] + " :yen:")
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();

        var NavigationP = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Chocolate" + interaction.user.id)
                .setLabel("Buy 1")
                .setStyle("PRIMARY")
                .setEmoji("🍫"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Book" + interaction.user.id)
                .setLabel("Buy 1")
                .setStyle("PRIMARY")
                .setEmoji("📔"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Scarf" + interaction.user.id)
                .setLabel("Buy 1")
                .setStyle("PRIMARY")
                .setEmoji("🧣"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Ring" + interaction.user.id)
                .setLabel("Buy 1")
                .setStyle("PRIMARY")
                .setEmoji("💍"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC" + interaction.user.id)
                .setLabel("Back Home")
                .setStyle("SUCCESS")
                .setEmoji("🏡"));
            
        await interaction.update({content: "*Your phone is displaying this...*", embeds:[Profile], components: [NavigationP]});
    }
    else if(interaction.customId === "Chocolate" + interaction.user.id || interaction.customId === "Book" + interaction.user.id || interaction.customId === "Scarf" + interaction.user.id || interaction.customId === "Ring" + interaction.user.id)
    {
        var indexDiamondUser = userDiamondID.indexOf(interaction.user.id);
        const achat = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();

        if(interaction.customId.startsWith('Chocolate'))
        {
            if(userBalance[indexDiamondUser] >= 2000)
            {
                userBalance[indexDiamondUser] = userBalance[indexDiamondUser] - 2000;
                achat.setDescription("DIAMOND Corp. vous remercie de votre achat.\nDétails de votre commission :");
                achat.addField("Article acheté :", "1 tablette de chocolat 🍫");
                achat.addField("Porte-Monnaie :", userBalance[indexDiamondUser] + " :yen:");
                userOwnedChocolate[indexDiamondUser] = userOwnedChocolate[indexDiamondUser] + 1; 
                if(userOwnedChocolate[indexDiamondUser] == 10){addSecretGirl("Itsuki Nakano");}
            }
            else{achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé...");}
        }
        else if(interaction.customId.startsWith('Book'))
        {
            if(userBalance[indexDiamondUser] >= 4000)
            {
                userBalance[indexDiamondUser] = userBalance[indexDiamondUser] - 4000;
                achat.setDescription("DIAMOND Corp. vous remercie de votre achat.\nDétails de votre commission :");
                achat.addField("Article acheté :", "1 livre d'histoire 📔");
                achat.addField("Porte-Monnaie :", userBalance[indexDiamondUser] + " :yen:");
                userOwnedBook[indexDiamondUser] = userOwnedBook[indexDiamondUser] + 1;
                if(userOwnedBook[indexDiamondUser] == 10){addSecretGirl("Yukino Yukinoshita");} 
            }
            else{achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé...");}
        }
        else if(interaction.customId.startsWith('Scarf'))
        {
            if(userBalance[indexDiamondUser] >= 7000)
            {
                userBalance[indexDiamondUser] = userBalance[indexDiamondUser] - 7000;
                achat.setDescription("DIAMOND Corp. vous remercie de votre achat.\nDétails de votre commission :");
                achat.addField("Article acheté :", "1 écharpe rouge :scarf:");
                achat.addField("Porte-Monnaie :", userBalance[indexDiamondUser] + " :yen:");
                userOwnedScarf[indexDiamondUser] = userOwnedScarf[indexDiamondUser] + 1;
            }
            else{achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé...");}
        }
        else if(interaction.customId.startsWith('Ring'))
        {
            if(userBalance[indexDiamondUser] >= 10000)
            {
                userBalance[indexDiamondUser] = userBalance[indexDiamondUser] - 10000;
                achat.setDescription("DIAMOND Corp. vous remercie de votre achat.\nDétails de votre commission :");
                achat.addField("Article acheté :", "1 magnifique bague :ring:");
                achat.addField("Porte-Monnaie :", userBalance[indexDiamondUser] + " :yen:");
                userOwnedRing[indexDiamondUser] = userOwnedRing[indexDiamondUser] + 1; 
            }
            else{achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé...");}
        }
        else 
        {
            achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé...");
        }

        var shopB = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
                .setCustomId("Shop" + interaction.user.id)
                .setLabel("Back to Shop")
                .setStyle("DANGER")
                .setEmoji("🛒"))
        .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC" + interaction.user.id)
                .setLabel("Back Home")
                .setStyle("SUCCESS")
                .setEmoji("🏡"));

        await interaction.update({content: "*Your phone is displaying this...*", embeds:[achat], components: [shopB]});
    }
    else if(interaction.customId === "Gift" + interaction.user.id)
    {
        var stuff = "";
        var place = userDiamondID.indexOf(interaction.user.id);
        let Ch = 0;
        let Rg = 0;
        let Sc = 0;
        let Bk = 0;

        var ChooseG = new Discord.MessageActionRow();

        if(userOwnedChocolate[place] > Ch){
        ChooseG.addComponents(new Discord.MessageButton()
            .setCustomId("ChocolateG" + interaction.user.id)
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
            .setCustomId("BookG" + interaction.user.id)
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
            .setCustomId("ScarfG" + interaction.user.id)
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
            .setCustomId("RingG" + interaction.user.id)
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
                .setCustomId("RentGF" + interaction.user.id)
                .setLabel("Back to Date")
                .setStyle("SUCCESS")
                .setEmoji("🌆"));

        if(userOwnedChocolate[place] > 0 || userOwnedBook[place] > 0 || userOwnedScarf[place] > 0 || userOwnedRing[place] > 0)
        {
            Profile.addField("Inventaire", stuff);
        }
        else{Profile.addField("Inventaire", "Vous ne possédez rien...");}
            
        await interaction.update({content: "*You seem to hesitate...*", embeds:[Profile], components: [ChooseG]});
    }
    else if(interaction.customId === "ChocolateG" + interaction.user.id || interaction.customId === "BookG" + interaction.user.id || interaction.customId === "ScarfG" + interaction.user.id || interaction.customId === "RingG" + interaction.user.id || interaction.customId === "RoseG" + interaction.user.id || interaction.customId === "KnifeG" + interaction.user.id || interaction.customId === "TeddyBearG" + interaction.user.id )
    {   
        paidDateUser[userDiamondID.indexOf(interaction.user.id)] = 1; // useless ?
        if(interaction.customId.startsWith('ChocolateG'))
        {
            feelingGFtmp = likeChocolate[indexGF];
            gift = "du chocolat";
        }
        else if(interaction.customId.startsWith('BookG'))
        {
            feelingGFtmp = likeBook[indexGF];
            gift = "un livre";
        }   
        else if(interaction.customId.startsWith('ScarfG'))
        {
            feelingGFtmp = likeScarf[indexGF];
            gift = "une écharpe";
        } 
        else if(interaction.customId.startsWith('RingG'))
        {
            feelingGFtmp = likeRing[indexGF];
            gift = "une bague";
        }
        else if(interaction.customId.startsWith('RoseG'))
        {
            feelingGFtmp = likeRose[indexGF];
            gift = "une rose";
        }
        else if(interaction.customId.startsWith('KnifeG'))
        {
            feelingGFtmp = likeKnife[indexGF];
            gift = "un couteau";
        }
        else if(interaction.customId.startsWith('TeddyBearG'))
        {
            feelingGFtmp = likeTeddyBear[indexGF];
            gift = "une peluche";
        }  
        const giftC = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Voulez-vous vraiment offrir " + gift + " à " + nameGF[indexGF] + " ?")
            .setThumbnail(ppGF[indexGF])
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();

        var confirmGift = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConfirmGift" + interaction.user.id)
                .setLabel("Yes")
                .setStyle("SUCCESS")
                .setEmoji("✔"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("RentGF" + interaction.user.id)
                .setLabel("No, back to Date")
                .setStyle("SECONDARY")
                .setEmoji("❌"));

        await interaction.update({content: "*You are hiding the gift behind your back, will you do it... ?*", embeds:[giftC], components: [confirmGift]});
    }
    else if(interaction.customId === "ConfirmGift" + interaction.user.id)
    {
        var place = userDiamondID.indexOf(interaction.user.id);
        feelingGF = feelingGFtmp;
        paidDateUser[place] = 1; // useless ?
        if(feelingGF === "Happy")
        {
            var aleaLP = Math.floor(Math.random() * 4)+ 1;
            userLovePoint[place] = aleaLP*(priceGF[indexGF]/2000) + userLovePoint[place];
            console.log("LovePoint: " + userLovePoint[place] + " Alea: " + aleaLP);
        }
        
        switch(gift){
            case 'du chocolat':
                userOwnedChocolate[place]--;
                break
            case 'un livre':
                userOwnedBook[place]--;
                break
            case 'une écharpe':
                userOwnedScarf[place]--;
                break
            case 'une bague':
                userOwnedRing[place]--;
                break
            case 'une rose':
                userOwnedRose[place]--;
                break
            case 'un couteau':
                userOwnedKnife[place]--;
                break
            case 'une peluche':
                userOwnedTeddyBear[place]--;
                break
            default:
                break
        }
        const giftCD = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Vous avez offert " + gift + " à " + nameGF[indexGF] + ".")
            .addField("Love point :", userLovePoint[place].toString()) // TESTO
            .setThumbnail(ppGF[indexGF])
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();
        
        var backDate = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
            .setCustomId("RentGF" + interaction.user.id)
            .setLabel("Back to Date")
            .setStyle("SECONDARY")
            .setEmoji("🌆"));
        
        await interaction.update({content: "*No one expects you doing this... Pretty courageous.*", embeds:[giftCD], components: [backDate]});
    }
    else if(interaction.customId === "Marry" + interaction.user.id)
    {
        let place = userDiamondID.indexOf(interaction.user.id);
        let cout = (indexGF+1) * 100000;

        let marryP = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Vous êtes sur le point de vous marier avec " + nameGF[indexGF] + ".\n*N'oubliez pas la* :ring:*...* ")
            .addField("Love points nécéssaires : " + priceGFLP[indexGF], "Vous avez : " + userLovePoint[place].toString())
            .addField("Coût : " + cout, "Vous avez : " + userBalance[place].toString())
            .setThumbnail("https://thedeadtoons.com/wp-content/uploads/2021/10/golden-time.jpg")
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();

        let marryB = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Married" + interaction.user.id)
                .setLabel("Put the ring on her finger")
                .setStyle("SUCCESS")
                .setEmoji("💍"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("GF" + interaction.user.id)
                .setLabel("No way")
                .setStyle("DANGER")
                .setEmoji("💨"));

        await interaction.update({content: "Ce jour va-t-il être un grand jour ?", embeds:[marryP], components: [marryB]});
    }
    else if(interaction.customId === "Married" + interaction.user.id && userOwnedRing[userDiamondID.indexOf(interaction.user.id)] > 0 && userBalance[userDiamondID.indexOf(interaction.user.id)] >= ((indexGF+1) * 100000))
    {
        ownedbyGF[indexGF] = interaction.user.username;
        ownedbyGFuserDiamondID[indexGF] = interaction.user.id;
        userLovePoint[userDiamondID.indexOf(interaction.user.id)] = userLovePoint[userDiamondID.indexOf(interaction.user.id)] - priceGFLP[indexGF];
        userOwnedRing[userDiamondID.indexOf(interaction.user.id)] = userOwnedRing[userDiamondID.indexOf(interaction.user.id)] - 1;
        userBalance[userDiamondID.indexOf(interaction.user.id)] = userBalance[userDiamondID.indexOf(interaction.user.id)] - ((indexGF+1) * 100000);

        const marry = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Le mariage est une réussite !\n" + nameGF[indexGF] + " et vous êtes désormais unis par des liens inébranlables !")
            .setImage(marryGF[indexGF])
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();

        var BackHomeM = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC" + interaction.user.id)
                .setLabel("Clôturer la cérémonie")
                .setStyle("SUCCESS")
                .setEmoji("⛪"));

        await interaction.update({content: "Félicitations", embeds:[marry], components: [BackHomeM]});
    }
    else if(interaction.customId === "Lottery" + interaction.user.id)
    {
        var place = userDiamondID.indexOf(interaction.user.id);
        const Gacha = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("*Bienvenue au Casino DIAMOND.Corp !\nVous pouvez tenter votre chance ici pour remporter de formidables gains et dépenser vos jetons dans la boutique DIAMOND*")
            .setThumbnail("https://cdn.otakutale.com/wp-content/uploads/2022/01/Kanojo-Okarishimasu-Season-2-Slated-for-July-New-Visual-Promotional-Video-Revealed.jpg")
            .addField("🎰 Lucky 7 :", "Tentez votre chance à la roulette ! Chaque Tirage coûte 10.000 :yen:, et de formidables lots sont à gagner !")
            .addField("🎲 Jeu des dés :", "Pariez 15 jetons sur un chiffre du dé. Remportez 50 jetons si votre chiffre est le bon !")
            .addField("🪙 Boutique de Jetons :", "Échangez vos jetons Casino-DIAMOND contre divers lots !")
            .addField("Porte-Monnaie :", userBalance[place] + " :yen:")
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();

        var gachaOpt = new Discord.MessageActionRow();
            if(userFreeCasinoTicket[place] > 0)
            {   
                gachaOpt.addComponents(new Discord.MessageButton()
                    .setCustomId("CasinoFree" + interaction.user.id)
                    .setLabel("Free Lucky 7")
                    .setStyle("SUCCESS")
                    .setEmoji("🎫"));
            }
            else
            {
                gachaOpt.addComponents(new Discord.MessageButton()
                    .setCustomId("Casino" + interaction.user.id)
                    .setLabel("Try Lucky 7")
                    .setStyle("DANGER")
                    .setEmoji("🎰"));
            }
            gachaOpt.addComponents(new Discord.MessageButton()
                .setCustomId("DiceGame" + interaction.user.id)
                .setLabel("Throw dice")
                .setStyle("PRIMARY")
                .setEmoji("🎲"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("CoinShop" + interaction.user.id)
                .setLabel("Coin Shop")
                .setStyle("SECONDARY")
                .setEmoji("🪙"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC" + interaction.user.id)
                .setLabel("Back Home")
                .setStyle("SUCCESS")
                .setEmoji("🏡"));
               
        await interaction.update({content: "Un gacha, comme c'est étonnant...", embeds:[Gacha], components: [gachaOpt]});
    }
    else if((interaction.customId === "Casino" + interaction.user.id &&  userBalance[userDiamondID.indexOf(interaction.user.id)] > 9999) || interaction.customId === "CasinoFree" + interaction.user.id)
    {
        var casinoRoll = Math.floor(Math.random() * 100);
        console.log("CasinoRoll alea : " + casinoRoll);
        var place = userDiamondID.indexOf(interaction.user.id);

        if(interaction.customId == "CasinoFree" + interaction.user.id)
        {
            userFreeCasinoTicket[place] --;
            console.log(userFreeCasinoTicket[place]);
        }
        else
        {
            userBalance[place] -= 10000;
        }

        var casinoBtn = new Discord.MessageActionRow();
        const pullREsult = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("*Voici votre gain lors du tirage Lucky 7 !! N'hésitez pas à retenter votre chance pour de meilleurs lots !*")
            .setThumbnail("https://m.media-amazon.com/images/I/71b6mIOpILL._AC_SY606_.jpg")
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();

        if(!casinoRoll)
        {
            pullREsult.addField("Vos gains :", "\n*Rien...*");
            addSecretGirl("Aki Adagaki");
        }
        else if(casinoRoll < 7)
        {
            pullREsult.addField("Vos gains :", "\n5.000 :yen:");
            userBalance[place] += 5000;
        }
        else if(casinoRoll < 12)
        {
            pullREsult.addField("Vos gains :", "\n9.999 :yen:");
            userBalance[place] += 9999;
        }
        else if(casinoRoll < 16)
        {
            pullREsult.addField("Vos gains :", "\n16.666 :yen:");
            userBalance[place] += 16666;
        }
        else if(casinoRoll < 19)
        {
            pullREsult.addField("Vos gains :", "\n25.000 :yen:");
            userBalance[place] += 25000;
        }
        else if(casinoRoll < 21)
        {
            pullREsult.addField("Vos gains :", "\n77.777 :yen:");
            userBalance[place] += 77777;
        }
        else if(casinoRoll < 22)
        {
            pullREsult.addField("Vos gains :", "\n**JACKPOT !** Vous avez gagné **500.000** :yen:");
            userBalance[place] += 500000;
        }
        else if(casinoRoll < 28)
        {
            pullREsult.addField("Vos gains :", "\n1 🪙");
            userCasinoToken[place]++;
        }
        else if(casinoRoll < 34)
        {
            pullREsult.addField("Vos gains :", "\n2 🪙");
            userCasinoToken[place] += 2;
        }
        else if(casinoRoll < 39)
        {
            pullREsult.addField("Vos gains :", "\n3 🪙");
            userCasinoToken[place] += 3;
        }
        else if(casinoRoll < 44)
        {
            pullREsult.addField("Vos gains :", "\n5 🪙");
            userCasinoToken[place] += 5;
        }
        else if(casinoRoll < 48)
        {
            pullREsult.addField("Vos gains :", "\n10 🪙");
            userCasinoToken[place] += 10;
        }
        else if(casinoRoll < 51)
        {
            pullREsult.addField("Vos gains :", "\n15 🪙");
            userCasinoToken[place] += 15;
        }
        else if(casinoRoll < 54)
        {
            pullREsult.addField("Vos gains :", "\n25 🪙");
            userCasinoToken[place] += 25;
        }
        else if(casinoRoll < 56)
        {
            pullREsult.addField("Vos gains :", "\n50 🪙");
            userCasinoToken[place] += 50;
        }
        else if(casinoRoll < 57)
        {
            pullREsult.addField("Vos gains :", "\n**JACKPOT !** Vous avez gagné **500** 🪙");
            userCasinoToken[place] += 500;
        }
        else if(casinoRoll < 59)
        {
            pullREsult.addField("Vos gains :", "\n1 🎟️ Ticket Location Offerte, à utiliser avec n'importe quelle fille disponible dans l'application DIAMOND !");
            userFreeRentTicket[place]++;
        }
        else if(casinoRoll < 64)
        {
            pullREsult.addField("Vos gains :", "\n1 🎫 Ticket Tirage offert au Casino DIAMOND !");
            userFreeCasinoTicket[place]++;
        }
        else if(casinoRoll < 67)
        {
            pullREsult.addField("Vos gains :", "\n2 🎫 Tickets Tirage offerts au Casino DIAMOND !");
            userFreeCasinoTicket[place] += 2;
        }
        else if(casinoRoll < 69)
        {
            pullREsult.addField("Vos gains :", "\n5 🎫 Tickets Tirage offerts au Casino DIAMOND !");
            userFreeCasinoTicket[place] += 5;
        }
        else if(casinoRoll < 73)
        {
            pullREsult.addField("Vos gains :", "\n2 🍫");
            userOwnedChocolate[place] += 2;
        }
        else if(casinoRoll < 76)
        {
            pullREsult.addField("Vos gains :", "\n2 📔");
            userOwnedBook[place] += 2;
        }
        else if(casinoRoll < 79)
        {
            pullREsult.addField("Vos gains :", "\n2 🧣");
            userOwnedScarf[place] += 2;
        }
        else if(casinoRoll < 82)
        {
            pullREsult.addField("Vos gains :", "\n 💍");
            userOwnedRing[place]++;
        }
        else if(casinoRoll < 84)
        {
            pullREsult.addField("Vos gains :", "\n1 🧸");
            userOwnedTeddyBear[place]++;
        }
        else if(casinoRoll < 86)
        {
            pullREsult.addField("Vos gains :", "\n1 🔪");
            userOwnedKnife[place]++;
        }
        else if(casinoRoll < 88)
        {
            pullREsult.addField("Vos gains :", "\n1 🌹");
            userOwnedRose[place]++;
        }
        else if(casinoRoll < 90)
        {
            pullREsult.addField("Vos gains :", "\n**1 Pack St Valentin** ! Ce pack comprend les objets suivants : 🍫 + 🌹 + 💍");
            userOwnedRing[place]++;
            userOwnedRose[place]++;
            userOwnedChocolate[place]++;
        }
        else if(casinoRoll < 92)
        {
            pullREsult.addField("Vos gains :", "\n**1 Pack Tuto Cuisine** ! Ce pack comprend les objets suivants : 🍫 + 🔪 + 📔");
            userOwnedKnife[place]++;
            userOwnedBook[place]++;
            userOwnedChocolate[place]++;
        }
        else if(casinoRoll < 95)
        {
            pullREsult.addField("Vos gains :", "\n1 🪙 et 5.000 :yen:");
            userBalance[place] += 5000;
            userCasinoToken[place]++;
        }
        else if(casinoRoll < 97)
        {
            pullREsult.addField("Vos gains :", "\n3 🪙 et 10.000 :yen:");
            userBalance[place] += 10000;
            userCasinoToken[place] += 3;
        }
        else if(casinoRoll < 99)
        {
            pullREsult.addField("Vos gains :", "\n5 🪙 et 15.000 :yen:");
            userBalance[place] += 15000;
            userCasinoToken[place] += 5;
        }
        else
        {
            pullREsult.addField("Vos gains :", "\n33 🪙 et 33.333 :yen:");
            userBalance[place] += 33333;
            userCasinoToken[place] += 33;
        }

        if(userFreeCasinoTicket[place] > 0)
            {   
                casinoBtn.addComponents(new Discord.MessageButton()
                    .setCustomId("CasinoFree" + interaction.user.id)
                    .setLabel("Free Lucky 7")
                    .setStyle("SUCCESS")
                    .setEmoji("🎫"));
            }
            else
            {
                casinoBtn.addComponents(new Discord.MessageButton()
                    .setCustomId("Casino" + interaction.user.id)
                    .setLabel("Try again Lucky 7")
                    .setStyle("DANGER")
                    .setEmoji("🎰"));
            }
        casinoBtn.addComponents(new Discord.MessageButton()
            .setCustomId("Lottery" + interaction.user.id)
            .setLabel("Back Lottery Page")
            .setStyle("PRIMARY")
            .setEmoji("🎊"))
        .addComponents(new Discord.MessageButton()
            .setCustomId("Disconnect" + interaction.user.id)
            .setLabel("Exit App")
            .setStyle("SECONDARY")
            .setEmoji("❌"));

        await interaction.update({content: "Un gacha, comme c'est étonnant...", embeds:[pullREsult], components: [casinoBtn]});

    }
    else if(interaction.customId === "DiceGame" + interaction.user.id || interaction.customId === "DiceGame1" + interaction.user.id)
    {
        var place = userDiamondID.indexOf(interaction.user.id);

        const diceG = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("*Chaque lancer de dé coûte 15 🪙\nSi vous prédisez lequel des 6 chiffres va être obtenu au lancer du dé, vous remportez* ***50*** 🪙")
            .setThumbnail("https://i.pinimg.com/originals/f9/ae/52/f9ae5279e198738ac1dab5bf36d2f337.jpg")
            .addField("🎲 Valeur possible au dé :", "1 - 2 - 3 - 4 - 5 - 6")
            .addField("🪙 possédé :", userCasinoToken[place].toString())
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();


        diceBtn = new Discord.MessageActionRow();

        if(interaction.customId === "DiceGame" + interaction.user.id)
        {
        diceBtn
        .addComponents(new Discord.MessageButton()
            .setCustomId("D1" + interaction.user.id)
            .setStyle("PRIMARY")
            .setEmoji("1️⃣"))
        .addComponents(new Discord.MessageButton()
            .setCustomId("D2" + interaction.user.id)
            .setStyle("PRIMARY")
            .setEmoji("2️⃣"))
        .addComponents(new Discord.MessageButton()
            .setCustomId("D3" + interaction.user.id)
            .setStyle("PRIMARY")
            .setEmoji("3️⃣"))
        .addComponents(new Discord.MessageButton()
            .setCustomId("DiceGame1" + interaction.user.id)
            .setLabel("4 - 5 - 6")
            .setStyle("SUCCESS")
            .setEmoji("▶"))
        .addComponents(new Discord.MessageButton()
            .setCustomId("Lottery" + interaction.user.id)
            .setLabel("Back Lottery Page")
            .setStyle("SECONDARY")
            .setEmoji("🎊"));

        }
        else if(interaction.customId === "DiceGame1" + interaction.user.id)
        {
            diceBtn
        .addComponents(new Discord.MessageButton()
            .setCustomId("D4" + interaction.user.id)
            .setStyle("PRIMARY")
            .setEmoji("4️⃣"))
        .addComponents(new Discord.MessageButton()
            .setCustomId("D5" + interaction.user.id)
            .setStyle("PRIMARY")
            .setEmoji("5️⃣"))
        .addComponents(new Discord.MessageButton()
            .setCustomId("D6" + interaction.user.id)
            .setStyle("PRIMARY")
            .setEmoji("6️⃣"))
        .addComponents(new Discord.MessageButton()
            .setCustomId("DiceGame" + interaction.user.id)
            .setLabel("1 - 2 - 3")
            .setStyle("SUCCESS")
            .setEmoji("◀"))
        .addComponents(new Discord.MessageButton()
            .setCustomId("Lottery" + interaction.user.id)
            .setLabel("Back Lottery Page")
            .setStyle("SECONDARY")
            .setEmoji("🎊"));
        }
        else
        {
            diceBtn.addComponents(new Discord.MessageButton()
            .setCustomId("Disconnect" + interaction.user.id)
            .setLabel("Exit App")
            .setStyle("SECONDARY")
            .setEmoji("❌"));
        }
        await interaction.update({content: "Mais ça va trop loin...", embeds:[diceG], components: [diceBtn]});
    }
    else if(interaction.customId === "D1" + interaction.user.id || interaction.customId === "D2" + interaction.user.id ||interaction.customId === "D3" + interaction.user.id || interaction.customId === "D4" + interaction.user.id || interaction.customId === "D5" + interaction.user.id || interaction.customId === "D6" + interaction.user.id)
    {
        dice = Math.floor(Math.random() * 6) + 1;
        var valueU = interaction.customId.charAt(1);
        var place = userDiamondID.indexOf(interaction.user.id);
        diceTBtn = new Discord.MessageActionRow();

        const diceT = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("*Le dé est lancé, rien ne va plus !*")
            .setThumbnail("https://i.pinimg.com/originals/f9/ae/52/f9ae5279e198738ac1dab5bf36d2f337.jpg")
            .addField("🔢 Valeur prédite :", "** " + valueU + "**")
            .addField("🎲 Valeur du lancer par le croupier :", "**" + dice.toString() + "**")
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();

        if(valueU == dice)
        {
            userCasinoToken[place] = userCasinoToken[place] +50;
            diceT.addField("♠ Résultat :", "*Votre prédiction était la bonne !*\nVous remportez **50** 🪙\n\nVous avez désormais : **" + userCasinoToken[place] + "** 🪙\n");
        }
        else
        {
            userCasinoToken[place] = userCasinoToken[place] -15;
            diceT.addField("♠ Résultat :", "*Votre prédiction était complètement erronée !*\nVous perdez **15** 🪙\n\nVous avez désormais : **" + userCasinoToken[place] + "** 🪙\n");
        }
        
        diceTBtn.
        addComponents(new Discord.MessageButton()
            .setCustomId("Lottery" + interaction.user.id)
            .setLabel("Back Lottery Page")
            .setStyle("SECONDARY")
            .setEmoji("🎊"))
        .addComponents(new Discord.MessageButton()
            .setCustomId("Disconnect" + interaction.user.id)
            .setLabel("Exit App")
            .setStyle("SECONDARY")
            .setEmoji("❌"));

        await interaction.update({content: "J'ai pas les mots là...", embeds:[diceT], components: [diceTBtn]});

    }
    else if(interaction.customId === "CoinShop" + interaction.user.id)
    {
        var place = userDiamondID.indexOf(interaction.user.id);
        const CoinS = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Bienvenue à la boutique d'échange de jetons DIAMOND Corp.\n*Ici, vous pouvez utiliser les jetons obtenus au Casino pour obtenir des articles exclusifs !*\n***Aucun remboursement possible***")
            .setThumbnail("https://financerewind.com/wp-content/uploads/2020/09/Rent-a-Girlfriend-Episode-10-Release-Date-Preview-and-Spoilers-768x439-1.jpg")
            .addField("Article 1 : 🌹", "Description : Une rose, brillant d'un rouge écarlate scintillant.\nPrix : 20 🪙")
            .addField("Article 2 : 🔪", "Description : Un couteau extrèmement coupant. On dirait presque une arme...\nPrix : 35 🪙")
            .addField("Article 3 : 🧸", "Description : Un ours en peluche avec un nez bleu. Drôle de conception, mais il est mignon !\nPrix : 65 🪙")
            .addField("Jetons possédés :", userCasinoToken[place] + " 🪙")
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();

        var NavigationCS = new Discord.MessageActionRow()
            .addComponents(new Discord.MessageButton()
                .setCustomId("Rose" + interaction.user.id)
                .setLabel("Buy 1")
                .setStyle("PRIMARY")
                .setEmoji("🌹"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Knife" + interaction.user.id)
                .setLabel("Buy 1")
                .setStyle("PRIMARY")
                .setEmoji("🔪"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("TeddyBear" + interaction.user.id)
                .setLabel("Buy 1")
                .setStyle("PRIMARY")
                .setEmoji("🧸"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("Lottery" + interaction.user.id)
                .setLabel("Back Lottery Page")
                .setStyle("SECONDARY")
                .setEmoji("🎊"))
            .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC" + interaction.user.id)
                .setLabel("Back Home")
                .setStyle("SUCCESS")
                .setEmoji("🏡"));
            
        await interaction.update({content: "*Let's see what the token exchange shop provides...*", embeds:[CoinS], components: [NavigationCS]});
    }
    else if(interaction.customId === "Rose" + interaction.user.id || interaction.customId === "Knife" + interaction.user.id || interaction.customId === "TeddyBear" + interaction.user.id)
    {
        var indexDiamondUser = userDiamondID.indexOf(interaction.user.id);
        const achat = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            achat.setDescription("DIAMOND Corp. vous remercie pour cet échange.\nDétails de votre lot :")
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();
    if(interaction.customId.startsWith('Rose'))
    {
        if(userCasinoToken[indexDiamondUser] >= 20)
        {
            userCasinoToken[indexDiamondUser] -= 20;
            achat.addField("Article acheté :", "1 rose rouge 🌹");
            achat.addField("Jetons restants :", userCasinoToken[indexDiamondUser] + " 🪙");
            userOwnedRose[indexDiamondUser]++; 
            if(userOwnedRose[indexDiamondUser] > 6){addSecretGirl("Yukana Yame");}
        }
        else{achat.setDescription("Une erreur s'est produite lors de la transaction entre votre compte de jeton Casino et DIAMOND Corp.\nVotre achat a été annulé...");}
    }
    else if(interaction.customId.startsWith('Knife'))
    {
        if(userCasinoToken[indexDiamondUser] >= 35)
        {
            userCasinoToken[indexDiamondUser] -= 35;
            achat.addField("Article acheté :", "1 couteau 🔪");
            achat.addField("Jetons restants :", userCasinoToken[indexDiamondUser] + " 🪙");
            userOwnedKnife[indexDiamondUser]++; 
            if(userOwnedKnife[indexDiamondUser] > 2){addSecretGirl("Shuka Karino");} 
        }
        else{achat.setDescription("Une erreur s'est produite lors de la transaction entre votre compte de jeton Casino et DIAMOND Corp.\nVotre achat a été annulé...");}
    }
    else if(interaction.customId.startsWith('TeddyBear'))
    {
        if(userCasinoToken[indexDiamondUser] >= 65)
        {
            userCasinoToken[indexDiamondUser] -= 65;
            achat.addField("Article acheté :", "1 ours en peluche 🧸");
            achat.addField("Jetons restants :", userCasinoToken[indexDiamondUser] + " 🪙");
            userOwnedTeddyBear[indexDiamondUser]++; 
        }
        else{achat.setDescription("Une erreur s'est produite lors de la transaction entre votre compte de jeton Casino et DIAMOND Corp.\nVotre achat a été annulé...");}
    }else
    {
        achat.setDescription("Une erreur s'est produite lors de la transaction entre votre compte de jeton Casino et DIAMOND Corp.\nVotre achat a été annulé...");
    }

        var shopB = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
                .setCustomId("CoinShop" + interaction.user.id)
                .setLabel("Back to Coin Shop")
                .setStyle("SECONDARY")
                .setEmoji("🪙"))
        .addComponents(new Discord.MessageButton()
                .setCustomId("Lottery" + interaction.user.id)
                .setLabel("Back Lottery Page")
                .setStyle("SECONDARY")
                .setEmoji("🎊"))
        .addComponents(new Discord.MessageButton()
                .setCustomId("ConnectC" + interaction.user.id)
                .setLabel("Back Home")
                .setStyle("SUCCESS")
                .setEmoji("🏡"));

        await interaction.update({content: "*You actually love this app...*", embeds:[achat], components: [shopB]});
    }
    else if(interaction.customId === "GiftA" + interaction.user.id)
    {
        var stuff = "";
        var place = userDiamondID.indexOf(interaction.user.id);
        let Rs = 0;
        let Kf = 0;
        let Tb = 0;
        var ChooseG = new Discord.MessageActionRow();

        if(userOwnedRose[place] > Rs){
        ChooseG.addComponents(new Discord.MessageButton()
            .setCustomId("RoseG" + interaction.user.id)
            .setLabel("Offer 1")
            .setStyle("PRIMARY")
            .setEmoji("🌹"))
            while(userOwnedRose[place] > Rs)
            {
            stuff += "🌹  ";
            Rs++
            }}

        if(userOwnedKnife[place] > Kf){
        ChooseG.addComponents(new Discord.MessageButton()
            .setCustomId("KnifeG" + interaction.user.id)
            .setLabel("Offer 1")
            .setStyle("PRIMARY")
            .setEmoji("🔪"))
            while(userOwnedKnife[place] >Kf)
            {
            stuff += "🔪  ";
            Kf++
            }}
        
        if(userOwnedTeddyBear[place] > Tb){
        ChooseG.addComponents(new Discord.MessageButton()
            .setCustomId("TeddyBearG" + interaction.user.id)
            .setLabel("Offer 1")
            .setStyle("PRIMARY")
            .setEmoji("🧸"))
            while(userOwnedTeddyBear[place] > Tb)
            {
            stuff += "🧸  ";
            Tb++
            }}

        const Profile = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Vous êtes sur le point d'offrir un cadeau à " + nameGF[indexGF] + ".")
            .setThumbnail(ppGF[indexGF])
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();

        ChooseG.addComponents(new Discord.MessageButton()
                .setCustomId("RentGF" + interaction.user.id)
                .setLabel("Back to Date")
                .setStyle("SUCCESS")
                .setEmoji("🌆"));

        if(userOwnedRose[place] > 0 || userOwnedKnife[place] > 0 || userOwnedTeddyBear[place] > 0 )
        {
            Profile.addField("Inventaire", stuff);
        }
        else{Profile.addField("Inventaire", "Vous ne possédez rien...");}
            
        await interaction.update({content: "*You seem to hesitate...*", embeds:[Profile], components: [ChooseG]});
    }
    else if(interaction.customId === "Succes" + interaction.user.id)
    {
        const Succes = new Discord.MessageEmbed()
            .setColor("843dff")
            .setTitle("ダイヤモンド - DIAMOND")
            .setDescription("Terminez différentes tâches pour améliorer l'expérience des utilisateurs sur l'app DIMAOND et toucher des récompenses !")
            .setThumbnail(ppGF[indexGF])
            .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
            .setTimestamp();
    }
    // suite GF











    else if(interaction.customId === "Claim")
    {
        var time = new Date();
        kkrReward = kkrValueEvent.pop();
        // kkrReward = kkrValueEvent[kkrValueEvent.length-1];
        await interaction.update({content:"☑ Un admin va être notifié afin que vous obteniez votre récompense !\n" + admin + " " + interaction.user.tag + " aimerait toucher : " + kkrReward + kkrEmoji, embeds:[], components:[]});
        const channelLogE = Client.channels.cache.find(channel => channel.name === channelLogName );
        channelLogE.send(time.toLocaleString() + " : " + interaction.user.tag + " + " + kkrReward + " " + kkrEmoji);
        // kkrValueEvent.splice(kkrValueEvent.length-1, 1);
        console.log(kkrValueEvent);

    }
    else if(interaction.customId === "CancelClaim")
    {
        await interaction.update({content:"Récompense refusée...", embeds:[], components:[]});
    }

    }

    else if(interaction.isSelectMenu()){
        if(interaction.customId === "Player"){

            console.log(interaction.values);

            const mise = new Discord.MessageSelectMenu()
                        .setCustomId("Bet")
                        .setPlaceholder("Montant de la mise...");
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
                await interaction.update({content: "Something might went wrong...", components: []});
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
                await interaction.update({content: "Vous avez misé **" + nbMise + "**" + kkrEmoji + "\nPour lancer le combat, tous les joueurs doivent cliquer sur **prêt** \n **" + rdyP + "/" + nbPlayers + "** prêts", components: [ready]});
                break;
                default :
                await interaction.update({content: "Something might went wrong...", components: []});
            }
        }
    }
});

Client.login(process.env.TOKEN);