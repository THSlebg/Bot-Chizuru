require('dotenv').config()
const Discord = require("discord.js");
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

//Joueurs duel de hareme
let nbPlayer = ["2P", "3P", "4P", "5P"];
let descrPlayer = ["DUEL", "TRIANGLE AMOUREUX", "CLUB ECHANGISTE", "BATTLE ROYALE"];
let valuePlayer = ["2", "3", "4", "5"];

//Mises duel de harem
let bets = ["100", "250", "500", "1000", "5000"];
let descrBets = ["Petits joueurs", "Pari entre amis", "Classique", "Pari compétitif", "Tentative d'escroquerie légitime"];
let valueBets = ["100", "250", "500", "1000", "5000"];

//Logs
let channelLogName = "log-event";
let usrName = "undefinedUserName";
let kkrValue = "undefinedKakeraAmount";
let kkrEmoji = "<:kakera:950050987412951051>";

//Évènement en cours
let eventTitle = "Allocations";
let eventPeriod = "14/03/2022 | 00h00 (UTC+1) - 20/03/2022 | 23h59 (UTC+1)";
let eventDescr = "Chaque $daily octroie + 3000 " + kkrEmoji;
let eventAva = "Tous les joueurs sauf multi-comptes.";
let kkrValueEvent = 3000;

//Duel de harem
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

let maxRoll = 100;
let maxScore = 5;

let random = 0;
let winner = "";
let winnerId = " ";


//Diamond
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
    if(!nameGF.includes(GFname))
    {
        let tableIndex = nameGFSecret.indexOf(GFname);
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

function event()
{
    let event = new Discord.MessageEmbed()
        .setColor("0bd3e6")
        .setTitle("**EVENEMENT ACTIF** : " + eventTitle)
        .setDescription("*Informations relatives à l'évenement en cours sur le serveur...*")
        .setThumbnail("https://www.playerone.vg/wp-content/uploads/2020/08/Critica-de-Kanojo-Okarishimasu-destacada-El-Palomitron2-e1598033037864-370x305.jpg")
        .addField("⌛ Période de l'évènement :", eventPeriod)
        .addField("📃 Détails de l'évènement :", eventDescr)
        .addField("🚹 Eligibilité : ", eventAva)
        .setTimestamp();
    return event;
}

function setEvent(title, period, descr, ava)
{
    eventTitle = title.replace('rent!setEvent ', '');
    eventPeriod = period;
    eventAva = ava;
    eventDescr = descr;
}

function changeRollScore(type, msg)
{
    let strTmp = msg.content.split(" ")[1];
    let maxTmp = Number(strTmp);

    if(isNaN(maxTmp) || !Number.isSafeInteger(maxTmp) || maxTmp <= 0)
    {
        if(isUndefined(strTmp))
        {
            let max;
            let str;
            if(type == "roll")
            {
                max = maxRoll;
                str = "a valeur max des rolls";
            }
            else
            {
                max = maxScore;
                str = "e score maximum";
            }
            msg.channel.send("Vous pouvez changer l" + str + " lors des duels de Harem avec rent!" + type + " **valeur** \n**Valeur actuelle :** " + max);
        }
            
        else
            msg.channel.send("Saisis une valeur cohérente bolos \n**Valeur saisie :** " + strTmp);
    }
    else 
    {
        let finalMsg;
        if(type == "roll")
        {
            maxRoll = maxTmp;
            finalMsg = "Rolls set on ";
        }
        else
        {
            maxScore = maxTmp;
            finalMsg = "Score maximum : ";
        }
            
        msg.channel.send(finalMsg + maxTmp);
    }
}

function isUndefined(param)
{
    return param === undefined;
}

async function showGF(inter)
{
    indexGF = (((indexGF) % nameGF.length) + nameGF.length) % nameGF.length;
    feelingGF = "Neutral";
    let GF = new Discord.MessageEmbed()
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
        .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
        .setTimestamp();

    if(ownedbyGF[indexGF] != "No one")
        GF.addField("Owned by : ", ownedbyGF[indexGF]);

    let NavigationGF = new Discord.MessageActionRow()
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
    let HomeGF = new Discord.MessageActionRow()
        .addComponents(new Discord.MessageButton()
            .setCustomId("ConnectC")
            .setLabel("Back Home Page")
            .setStyle("PRIMARY")
            .setEmoji("🏡"));

    await inter.update({content: "*Your phone is displaying this ...*", embeds:[GF], components: [NavigationGF, HomeGF]});
}

function buyItem(price, name, emote, usrId, inter)
{
    let res = 0;
    let achat = new Discord.MessageEmbed()
        .setColor("843dff")
        .setTitle("ダイヤモンド - DIAMOND")
        .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
        .setTimestamp();
    
    if(userBalance[usrId] >= price)
    {
        userBalance[usrId] -= price;
        achat.setDescription("DIAMOND Corp. vous remercie de votre achat.\nDétails de votre commission :");
        achat.addField("Article acheté :", "1 " + name + " " + emote);
        achat.addField("Porte-Monnaie :", userBalance[usrId] + " :yen:");
    }
    else
    {
        achat.setDescription("Une erreur s'est produite lors de la transaction entre votre banque et DIAMOND Corp.\nVotre achat a été annulé...");
        res = 1;
    }
    let shopB = new Discord.MessageActionRow()
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

    inter.update({content: "*Your phone is displaying this ...*", embeds:[achat], components: [shopB]});
    return res;
}

Client.on("ready", () => {
    console.log("bot on")
        Client.user.setActivity('rent!', { type: 'PLAYING' })
});

Client.on("messageCreate", message => {
    console.log(message.content);
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    
    switch(message.content)
    {
        case prefix:
            message.channel.send("Uhm, you seem lost, try running rent!help :wink: ");
            break;
        case prefix + "patchnote":
            message.channel.send("**Version " + botVersion + ":**\nLatest release :\n\n> Casino Page\n> Coin system\n> Secret Girls (3) more Added\n> Gacha\n> Dice Game\n> New items available\n> Specific features : Free Ticket RENT/Casino Roll & Awkward Present \n\n*Now working on :*\n\n> Multi-Instance Handling\n> Add Own GirlFriend");
            break;
        case prefix + "version":
            message.channel.send("Bot version running on your server : " + botVersion);
            break;
        case prefix + "hi":
            message.channel.send("Hey, I'm Chizuru Ichinose, nice to meet you ♥\nI would love to get to know you more, call me whenever you want 👋");
            break;
        case prefix + "date":
            message.channel.send("I'm all yours for now!");
            break;
        case prefix + "secret":
            message.channel.send("This is something that you should had never discovered... But at this point, maybe i should let you get a try... 💎 \nI'll we be waiting for you darling...");
            break;
        case prefix + "help":
            message.channel.send("**__List of commands :__**" + commands);
            break;
        case prefix + "event":
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
            break;
        case prefix + "testLog":
            Client.channels.cache.find(channel => channel.name === channelLogName ).send("J'ai autre chose à faire... Tu vois bien que ça marche non ? Abruti...");
            break;
        case prefix + "embedHelp":
            let embed = new Discord.MessageEmbed()
                .setColor("eb4034")
                .setTitle("Command List :")
                .setURL("https://pornhub.com")
                .setDescription("*Chizuru-san is so greatful, she lets you use all those following interactions freely with her !* ♥")
                .setThumbnail("https://i.pinimg.com/736x/09/06/bd/0906bdfcecb2a9665bde4d32879b92e5.jpg")
                .setTimestamp();

            let nBoucle = 0;
            commandTable.forEach(element => {
                embed.addField(element, descrTable[nBoucle]);
                nBoucle++;
            });
            
            message.channel.send({embeds:[embed]});
            break;
        case prefix + "duel":
            let fight = new Discord.MessageActionRow()
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
            break;
        case prefix + "diamond":
            if(diamondUserConnected.includes(message.author.id))
                message.channel.send("T'as deux vies tocard ?");
            else
            {
                indexGF = 0;

                let logIn = new Discord.MessageActionRow()
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

                diamondUserConnected.push(message.author.id);
                console.log(message.author.id);
                message.channel.send({content: "*Votre télephone vibre étrangement? \nDans un grand flash blanc, votre téléphone vous propose de vous rediriger vers le lien suivant : https://diamond.app/rent \nCe lien semble innacessible, cependant il semblerait que vous puissiez installer l'application* **DIAMOND**", components: [logIn]});
            }
            break;
        case prefix + "work":
            if(userDiamondID.includes(message.author.id))
            {
                let index = userDiamondID.indexOf(message.author.id);
                let alea = Math.floor(Math.random() * 21);
    
                if (alea < 2)
                {
                    userBalance[index] -= 25000;
                    message.channel.send("Décidemment, vous faites vraiment pitié... Votre patron vous a foutu à la porte après que vous eûtes essayé d'enregistrer le numéro de votre collègue en prenant son téléphone en cachette... \nMalheureusement, ce dernier vous a échappé des mains, et il est désormais foutu !\n*Vous avez dû lui en racheter un, et en plus elle a pris le dernier modèle sorti...* - 25.000 :yen:");
                }
                else if (alea < 5)
                {
                    userBalance[index] += Math.floor(Math.random() * 5000) + 10000;
                    message.channel.send("Vous vendez votre Tajine comme des petits pains ... Qui l’eût cru ?\n Le résultat de cette journée vous a permis d'accumuler " + userBalance[index] + " :yen: au total !");
                }
                else if (alea < 11)
                {
                    userBalance[index] += Math.floor(Math.random() * 3000) + 3000;
                    message.channel.send("Bon boulot ça ! \nTon porte-monnaie se remplit bien ! Tu as " + userBalance[index] + " :yen:");
                }
                else if (alea < 20)
                {
                    userBalance[index] += Math.floor(Math.random() * 3000) + 1500;
                    message.channel.send("Quel taff épuisant ... Vous avez malgré tout gagné un peu de faf\nVous possédez " + userBalance[index] + " :yen:");
                }
                else
                {
                    userBalance[index] += Math.floor(Math.random() * 10000) + 50000;
                    message.channel.send("Travailler pour le président Macron n'a jamais été aussi fructueux ! Vous avez discrètement détourné quelques fonds publics, mais c'est pour la bonne cause...\nVotre coffre-fort compte maintenant " + userBalance[index] + " :yen: ");
                }
            }
            break;
        case prefix + "motherlode":
            if(userDiamondID.includes(message.author.id)){}
            {
                let index = userDiamondID.indexOf(message.author.id);
                userBalance[index] += 100000000000000;
                message.channel.send("<@" + message.author.id + "> t'as pas honte de tricher comme ça ! Tu te rends compte qu'avoir " + userBalance[index] + " :yen: c'est louche ?!");
            }
            break;
        default:
            if(message.content.startsWith(prefix + "setEvent"))
            {
                let eventPeriodTmp = message.content.split("|")[0,1];
                let eventDescrTmp = message.content.split("|")[1,2];
                let eventAvaTmp = message.content.split("|")[2,3];
                let eventTitleTmp = message.content.split("|")[0];

                if(isUndefined(message.content.split(" ")[1]) || isUndefined(eventPeriodTmp) || isUndefined(eventDescrTmp) || isUndefined(eventAvaTmp) || eventPeriodTmp === '' || eventDescrTmp === '' || eventAvaTmp === '' || eventTitleTmp === "rent!setEvent ")
                    message.channel.send({content: "Vous pouvez paramétrer les informations de l'évènement en cours avec rent!setEvent **eventTitle**|**eventPeriod**|**eventDetails**|**eventEligibilty** \n **Evènement en cours :**", embeds:[event()] });
                else 
                {
                    setEvent(eventTitleTmp, eventPeriodTmp, eventDescrTmp, eventAvaTmp)
                    message.channel.send({content:"**EVENEMENT CONFIGURE :**", embeds:[event()]});
                }      
            }
            else if(message.content.startsWith(prefix + "log"))
            {
                let channelLogNameTmp = message.content.split(" ")[1];
                if(isUndefined(channelLogNameTmp))
                    message.channel.send("Vous pouvez changer le channel par défaut des logs du bot avec rent!log **nomDuChannel** \n**Channel par défaut actuel :** " + channelLogName);
                else 
                {
                    channelLogName = channelLogNameTmp;
                    let channelLogS = Client.channels.cache.find(channel => channel.name === channelLogName );
                    if(isUndefined(channelLogS))
                        message.channel.send("**Nom inapproprié**");
                    else 
                    {
                        message.channel.send("Log Channel : " + channelLogName);
                        channelLogS.send("Logs are now sent here.");
                    }
                }
            }
            else if(message.content.startsWith(prefix + "makeLog"))
            {
                if(isUndefined(message.content.split(" ")[1]))
                    message.channel.send("Vous pouvez envoyé un log personnalisé avec rent!makeLog **pseudoDuMembre** **montantKakera**");
                else
                    Client.channels.cache.find(channel => channel.name === channelLogName ).send(new Date().toLocaleString() + " : " + message.content.split(" ")[0,1] + " + " + message.content.split(" ")[2] + " " + kkrEmoji);
            }
            else if(message.content.startsWith(prefix + "setEmoji"))
            {
                let kkrEmojiTmp = message.content.split(" ")[1];
                if(isUndefined(kkrEmojiTmp) || message.content.length > 45)
                    message.channel.send("Vous pouvez changer l'emoji représentant les kakeras avec rent!setEmoji **<:Emoji:ID>**");
                else
                {
                    kkrEmoji = kkrEmojiTmp;
                    message.channel.send("Nouvel Emoji : " + kkrEmoji);
                }
            }
            else if (message.content.startsWith(prefix + "roll"))
                changeRollScore("roll", message);
            else if (message.content.startsWith(prefix + "score"))
                changeRollScore("score", message);
            break;
    }
});

Client.on("messageReactionAdd", (reaction, user) => {
    if(reaction.message.content === "$daily" && reaction.emoji.name === "✅" && (user.id === "238332449367654401" || user.id === "432610292342587392")) //first is THS admin id and second is Mudae id
    {
        let eventPopUp = new Discord.MessageEmbed()
            .setColor("21eb13")
            .setTitle(eventTitle)
            .setURL("https://www.gouvernement.fr/argumentaire/mes-aidesgouvfr-un-site-pour-evaluer-ses-droits-aux-prestations-et-aides-sociales")
            .addField(eventDescr + "\n\n**Voulez-vous récupérez votre récompenses ? **", "*Les admins ont accès aux logs et messages, tout abus, même s'il s'agit d'un exploit ou usebug, sera puni*")
            .setTimestamp();

        let claim = new Discord.MessageActionRow()
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

            let select = new Discord.MessageSelectMenu()
                        .setCustomId("Player")
                        .setPlaceholder("Nombre de Joueurs ...");
            let nBoucle = 0;
            nbPlayer.forEach(element => {
                select.addOptions({
                    label: element,
                    description: descrPlayer[nBoucle],
                    value: valuePlayer[nBoucle]
                });
                nBoucle++;
            });  
            let nbJ = new Discord.MessageActionRow()
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

                let confirm = new Discord.MessageActionRow()
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
                    let embedPlayer = new Discord.MessageEmbed()
                        .setColor("000000")
                        .setTitle("Nouveau Joueur")
                        .setDescription(interaction.user.username + " es-tu prêt à en découdre ?")
                        .setThumbnail(pp)
                        .setTimestamp();

                    
                    await interaction.update({embeds: [embedPlayer], components: [confirm]});
                }

                else
                {
                    let relouPlayer = new Discord.MessageEmbed()
                        .setColor("DCDDCD")
                        .setTitle("Mate le gros relou :")
                        .setDescription(interaction.user.username + ", vous êtes déjà préparé à ce combat épique, stop spam guignol !")
                        .setThumbnail(pp)
                        .setTimestamp();

                    let clc = new Discord.MessageActionRow()
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
            let ready = new Discord.MessageActionRow()
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
            if(interaction.user.id == userIdTmp)
            {
                score[rdyP] = 0;
                idPlayers[rdyP] = idPlayersTmp;
                username[rdyP] = usernameTmp;
                userId[rdyP] = userIdTmp;
                rdyP++;

                let ready = new Discord.MessageActionRow()
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
                    await interaction.update({content: "Vous avez misé **" + nbMise + "** " + kkrEmoji + "\n Pour lancer le combat, tous les joueurs clique sur **prêt** \n **" + rdyP + "/" + nbPlayers + "** prêts", embeds: [], components: [ready]});
                else
                {
                    let done = new Discord.MessageActionRow()
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

            let resume = new Discord.MessageEmbed()
                .setColor("eb4034")
                .setTitle("🔪 Détails du combat : ")
                .setDescription("Pour modifier les valeurs max de score et de rolls, utilisez respectivement les commandes **rent!score** et **rent!roll**.")
                .setThumbnail("https://i0.wp.com/9tailedkitsune.com/wp-content/uploads/2020/08/Snimka-obrazovky-394.png")
                .addField("Score à atteindre :", maxScore.toString())
                .addField("Roll max :", maxRoll.toString())
                .addField("Mise :", nbMise.toString())
                .addField("Joueurs :", concat)
                .setTimestamp();

            let Gogo = new Discord.MessageActionRow()
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
            let scoreG = new Discord.MessageEmbed()
                .setColor("eb4034")
                .setTitle("🔪 Progression du Duel : ")
                .setDescription("La bataille vient de commencer, voyons qui sera à la hauteur.")
                .addField("Score à atteindre :", maxScore.toString())
                .addField("Rappel mise :", nbMise.toString());

            let nBoucle = 0;
            username.forEach(element =>
            {
                scoreG.addField(element.toString(), score[nBoucle].toString());
                nBoucle++;
            });

            let suivant = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("Next")
                        .setLabel("Première manche !")
                        .setStyle("SECONDARY")
                        .setEmoji("▶"));

            await interaction.update({content: "Que le meilleur gagne !", embeds: [scoreG], components: [suivant]});
        }
        else if(Number(interaction.customId) >= 0 && Number(interaction.customId) <= 4)
        {
            score[interaction.customId]++;

            if(score[interaction.customId] >= maxScore)
            {
                gain = nbMise * (nbPlayers - 1);
                let endG = new Discord.MessageEmbed()
                    .setColor("eb4034")
                    .setTitle("VICTOIRE")
                    .setDescription("Parmi tous ces harems, seulement un en est ressorti vainqueur !")
                    .setThumbnail("https://i.pinimg.com/736x/92/bd/dd/92bddda156b1b7c6c10304a20c1f2a24.jpg")
                    .addField("Gagnant :", username[interaction.customId].toString())
                    .addField("Récompenses :", gain.toString());

                let victory = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("GG")
                        .setLabel("Obtenir ces gains")
                        .setStyle("SUCCESS")
                        .setEmoji("🏆"));

                winner = username[interaction.customId];
                winnerId = userId[interaction.customId];

                await interaction.update({content: "**FIN DE DUEL ! **", embeds: [endG], components: [victory]});
            }
            else if (score[interaction.customId] < maxScore)
            {
                let scoreG1 = new Discord.MessageEmbed()
                    .setColor("eb4034")
                    .setTitle("🔪 Progression du Duel : ")
                    .setDescription("La Tension est palpable ...")
                    .addField("Score à atteindre :", maxScore.toString())
                    .addField("Rappel mise :", nbMise.toString());

                let suivant = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("Next")
                        .setLabel("Manche suivante")
                        .setStyle("SECONDARY")
                        .setEmoji("⏭"));

                let nBoucle = 0;
                username.forEach(element =>
                {
                    scoreG1.addField(element.toString(), score[nBoucle].toString());
                    nBoucle++;
                });

                await interaction.update({content: "Que le meilleur gagne !", embeds: [scoreG1], components: [suivant]});
            }
        }
        else if(interaction.customId === "Next")
        {
            // console.log(score);
            // console.log(idPlayers);
            // console.log(userId);
            // console.log(username);

            random = Math.floor(Math.random() * maxRoll) + 1;

            let test = new Discord.MessageEmbed()
                .setColor("eb4034")
                .setTitle("🔪 Progression du Duel : ")
                .setDescription("La Tension est palpable ...")
                .addField("Score à atteindre :", maxScore.toString())
                .addField("Rappel mise :", nbMise.toString());

            let nBoucle = 0;
            username.forEach(element =>
            {
                test.addField(element.toString(), score[nBoucle].toString());
                nBoucle++;
            });
            
            await interaction.update({content: "Que le meilleur gagne !", embeds:[test], components:[]});

            // nBoucle = 0;
            // while (nBoucle < nbPlayers)
            // {
            //     await interaction.channel.send({content: "$mmi <@" + userId[nBoucle] + "> " + random, components: []});
            //     await interaction.channel.send({content: "/mm /i <@" + userId[nBoucle] + "> " + random, components: []});
            //     nBoucle++;
            // }
            await interaction.channel.send({content: "Le numéro est " + random, components: []});

            let playR = new Discord.MessageActionRow();
            nBoucle = 0;
            username.forEach(element => {
                playR.addComponents(new Discord.MessageButton()
                        .setCustomId(k.toString())
                        .setLabel(element)
                        .setStyle("SUCCESS")
                        .setEmoji("➕"));
                nBoucle++;
            })

            await interaction.channel.send({content: "**Sélectionner le gagnant de la manche !**", components: [playR]});
        }
        else if(interaction.customId === "GG")
        {   
            if(interaction.user.id == winnerId)
            {
                interaction.update({content: "Congratulations " + winner + " !" , embeds: [], components: []});
                await interaction.channel.send("$givescrap <@" + winnerId + "> " + gain);

                Client.channels.cache.find(channel => channel.name === channelLogName ).send(new Date().toLocaleString() + " : " + winner + " a gagné " + gain + " " +  kkrEmoji + " lors d'un Duel de Harem !");

                nbPlayers = 0;
                nbMise = 0;
                score = [];
                idPlayers = [];
                rdyP = 0;
                userId = [];
                username = [];
                winner = " ";
                winnerId = " ";
                gain = 0;
            }
            else
                await interaction.reply("<@" + interaction.user.id + "> tu t'amuses bien bouffon ?");

        }
        else if(interaction.customId === "Stop")
        {
            await interaction.update({content : "C'était cool de me déranger pour ça en tout cas...", embeds: [], components: []});
        }
        else if(interaction.customId === "Cancel")
        {
            await interaction.update({content : "Procédure annulée... Je retourne chez moi.", components: []});
        }
        else if(interaction.customId === "ConnectToDiamond")
        {
            let Connect = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("ConnectC")
                    .setLabel("Log To DIAMOND")
                    .setStyle("SUCCESS")
                    .setEmoji("💎"))
                
            let extra = "";
            let extraAlea = Math.floor(Math.random() * 5); 
            switch(extraAlea)
            {
                case 0: 
                    extra = "lebg"; 
                    break;
                case 1:
                    extra = "diño"; 
                    break;
                case 2:
                    extra = "letombeur"; 
                    break;
                case 3:
                    extra = "aulait"; 
                    break;
                case 4:
                    extra = "leboulet"; 
                    break;
                default:
                    break;
            }

            let diamondUserName = interaction.user.username + extra;

            await interaction.update({content: "**INSTALLATION TERMINEE** \nConnexion à DIAMOND.app \n**Login : [" + diamondUserName + "]** \n**Password : **⏹⏹⏹⏹⏹⏹⏹", components: [Connect]});
        }
        else if(interaction.customId === "Disconnect")
        {
            if(diamondUserConnected.includes(interaction.user.id))
            {
                diamondUserConnected.splice(diamondUserConnected.indexOf(interaction.user.id), 1);
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

                if(Math.floor(Math.random() * 2))
                    userGenre[nbDiamondUser] = "♀️";
                else
                    userGenre[nbDiamondUser] = ":male_sign:";

                userOwnedChocolate[nbDiamondUser] = 0;
                userOwnedRing[nbDiamondUser] = 0;
                userOwnedScarf[nbDiamondUser] = 0;
                userOwnedBook[nbDiamondUser] = 0;
                userLovePoint[nbDiamondUser] = 0;
                nbDiamondUser++;
            }

            let Home = new Discord.MessageEmbed()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND")
                .setDescription("*Diamond est une application de RGF, un service de location de petites-amies* \n *Cherchez la copine de vos rêves, louez ces services et passez un moment idyllique que vous n'oublierez jamais ...*")
                .setThumbnail("https://randomc.net/image/Kanojo%20Okarishimasu/Kanojo%20Okarishimasu%20-%2001%20-%20Large%2007.jpg")
                .addField(":mobile_phone: Navigation :", "> Home page \n> Profile Page \n> Rent Page \n> Shop Page")
                .addField(":yen: Prix moyen : ", "7.500 ¥ / heure")
                .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                .setTimestamp();

            let Navigation = new Discord.MessageActionRow()
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
                if(userDiamondID.includes(interaction.user.id))
                {
                let avatar = interaction.user.avatarURL();
                let stuff = "";

                let place = userDiamondID.indexOf(interaction.user.id);
                // console.log(place);
                // console.log(userGenre[place]);
                // console.log(userTaille[place]);
                // console.log(userBalance[place]);
                let Ch =0;
                let Rg = 0;
                let Sc = 0;
                let Bk = 0;
                
                while(userOwnedChocolate[place] > Ch)
                {
                    stuff += "🍫  ";
                    Ch++;
                }
                while(userOwnedBook[place] > Bk)
                {
                    stuff += "📔  ";
                    Bk++;
                }
                while(userOwnedScarf[place] > Sc)
                {
                    stuff += "🧣  ";
                    Sc++;
                }
                while(userOwnedRing[place] > Rg)
                {
                    stuff += "💍  ";
                    Rg++;
                }
                
                let Profile = new Discord.MessageEmbed()
                    .setColor("843dff")
                    .setTitle("ダイヤモンド - DIAMOND")
                    .setDescription("*Profil de " + interaction.user.username + "*")
                    .setThumbnail(avatar)
                    .addField("Genre : ", userGenre[place])
                    .addField("Taille : ", userTaille[place].toString() + " cm")
                    .addField("Porte-Feuille : ", userBalance[place].toString() + " :yen:")
                    .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                    .setTimestamp();

                if(userOwnedChocolate[place] || userOwnedBook[place] || userOwnedScarf[place] || userOwnedRing[place])
                {
                    Profile.addField("Inventaire :", stuff);
                }  
                if(userLovePoint[place])
                {
                    Profile.addField("Love Points :", userLovePoint[place].toString());
                }

                let NavigationP = new Discord.MessageActionRow()
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
                    
                await interaction.update({content: "*Your phone is displaying this...*", embeds:[Profile], components: [NavigationP]});
            }
        }
        else if(interaction.customId === "GF")
            showGF(interaction);
        else if(interaction.customId === "Nxt")
        {
            indexGF++;
            showGF(interaction);
        }
        else if(interaction.customId === "Prv")
        {
            indexGF--;
            showGF(interaction); 
        }
        else if(interaction.customId === "RentGF")
        {
            let index = userDiamondID.indexOf(interaction.user.id);

            if(userBalance[index] >= priceGF[indexGF] && !paidDate)
            {
                paidDate = 1;
                userBalance[index] -= priceGF[indexGF];
            }
            if(paidDate)
            {   
                rentedGF[indexGF] = interaction.user.username;

                let RGF = new Discord.MessageEmbed()
                    .setColor("843dff")
                    .setTitle("ダイヤモンド - DIAMOND - Date overview ")
                    .addField("Purchase: ", "You have rented " + nameGF[indexGF] + " for one hour")
                    .addField("Paiement Recap : ", priceGF[indexGF] + " :yen:")
                    .addField('Rented by :', rentedGF[indexGF])
                    .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                    .setTimestamp();
                
                switch(feelingGF)
                {
                    case 'Neutral':
                        RGF.setDescription(nameGF[indexGF] + " sort avec vous !");
                        RGF.setImage(rentedImageGF[indexGF]);
                        break;
                    case 'Happy':
                        RGF.setDescription(nameGF[indexGF] + " est heureuse de passer ce moment avec vous !");
                        RGF.setImage(rentedImageGFHappy[indexGF]);
                        break;
                    case 'Angry':
                        RGF.setDescription(nameGF[indexGF] + " semble confuse...");
                        RGF.setImage(rentedImageGFAngry[indexGF]);
                        break;
                    default:
                        break;
                }

                let BackHome = new Discord.MessageActionRow()
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
                
                await interaction.update({content: "*I'm yours now...*", embeds:[RGF], components: [BackHome]});
            }
            else
            {
                let BackHome = new Discord.MessageActionRow()
                    .addComponents(new Discord.MessageButton()
                        .setCustomId("ConnectC")
                        .setLabel("Back Home Page")
                        .setStyle("SUCCESS")
                        .setEmoji("🏡"));
                
                await interaction.update({content: "*Not enough money, maybe you can think by yousrself finding a way to earn some money.*", embeds:[], components: [BackHome]});
            }
        }
        else if(interaction.customId === "Shop")
        {
            let indexDiamondUser = userDiamondID.indexOf(interaction.user.id);

            let Profile = new Discord.MessageEmbed()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND")
                .setDescription("Bienvenue au magasin DIAMOND Corp.\n*Ici, vous pouvez acheter toutes sortes d'articles directement depuis votre smartphone.*\n***Aucun remboursement possible***")
                .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoxETY5SVyRHCp_uegfkPgmKB5GeIgJUtC-1V7H2kdHnG9L7IsDRwpUCvW7b3YSpHuupA&usqp=CAU")
                .addField("Article 1 : :chocolate_bar:", "Description : Un tablette de chocolat au lait, 250g.\nPrix : 2000 :yen:")
                .addField("Article 2 : :notebook_with_decorative_cover:", "Description : Un livre sur l'histoire contemporaine du Japon. Plutôt ennuyant...\nPrix : 4000 :yen:")
                .addField("Article 3 : :scarf:", "Description : Une belle écharpe rouge vif.\nPrix : 7000 :yen:")
                .addField("Article 4 : :ring:", "Description : Une magnifique bague, ornée d'une pierre précieuse rare.\nPrix : 10.000 :yen:")
                .addField("Porte-Monnaie :", userBalance[indexDiamondUser] + " :yen:")
                .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                .setTimestamp();

            let NavigationP = new Discord.MessageActionRow()
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
                
            await interaction.update({content: "*Your phone is displaying this...*", embeds:[Profile], components: [NavigationP]});
        }
        else if(interaction.customId === "Chocolate" || interaction.customId === "Book" || interaction.customId === "Scarf" || interaction.customId === "Ring")
        {
            let indexDiamondUser = userDiamondID.indexOf(interaction.user.id);
            switch(interaction.customId)
            {
                case 'Chocolate' :
                    if(!buyItem(2000, "tablette de chocolat", "🍫", indexDiamondUser, interaction))
                    {
                        userOwnedChocolate[indexDiamondUser]++; 
                        if(userOwnedChocolate[indexDiamondUser] == 10){addSecretGirl("Itsuki Nakano");}
                    }
                    break;
                case 'Book' :
                    if(!buyItem(4000, "livre d'histoire", "📔", indexDiamondUser, interaction))
                    {
                        userOwnedBook[indexDiamondUser]++;
                        if(userOwnedBook[indexDiamondUser] == 10){addSecretGirl("Yukino Yukinoshita");}
                    }
                    break;
                case 'Scarf' :
                    if(!buyItem(7000, "écharpe rouge", ":scarf:", indexDiamondUser, interaction))
                        userOwnedScarf[indexDiamondUser]++;
                    break;
                case 'Ring' :
                    if(!buyItem(10000, "magnifique bague", ":ring:", indexDiamondUser, interaction))
                        userOwnedRing[indexDiamondUser]++;
                    break;
                default:
                    break;
            }
            console.log(userOwnedRing[indexDiamondUser]);
            
        }
        else if(interaction.customId === "Gift")
        {
            let stuff = "";
            let place = userDiamondID.indexOf(interaction.user.id);
            let Ch = 0;
            let Rg = 0;
            let Sc = 0;
            let Bk = 0;

            let ChooseG = new Discord.MessageActionRow();

            if(userOwnedChocolate[place])
            {
                ChooseG.addComponents(new Discord.MessageButton()
                    .setCustomId("ChocolateG")
                    .setLabel("Offer 1")
                    .setStyle("PRIMARY")
                    .setEmoji("🍫"));
                while(userOwnedChocolate[place] > Ch)
                {
                    stuff += "🍫  ";
                    Ch++;
                }
            }
            if(userOwnedBook[place])
            {
                ChooseG.addComponents(new Discord.MessageButton()
                    .setCustomId("BookG")
                    .setLabel("Offer 1")
                    .setStyle("PRIMARY")
                    .setEmoji("📔"));
                while(userOwnedBook[place] > Bk)
                {
                    stuff += "📔  ";
                    Bk++;
                }
            }
            if(userOwnedScarf[place])
            {
                ChooseG.addComponents(new Discord.MessageButton()
                    .setCustomId("ScarfG")
                    .setLabel("Offer 1")
                    .setStyle("PRIMARY")
                    .setEmoji("🧣"));
                while(userOwnedScarf[place] > Sc)
                {
                    stuff += "🧣  ";
                    Sc++;
                }
            }
            if(userOwnedRing[place])
            {
                ChooseG.addComponents(new Discord.MessageButton()
                    .setCustomId("RingG")
                    .setLabel("Offer 1")
                    .setStyle("PRIMARY")
                    .setEmoji("💍"));
                while(userOwnedRing[place] > Rg)
                {
                    stuff += "💍  ";
                    Rg++;
                }
            }

            let Profile = new Discord.MessageEmbed()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND")
                .setDescription("Vous êtes sur le point d'offrir un cadeau à " + nameGF[indexGF] + ".")
                .setThumbnail(ppGF[indexGF])
                .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                .setTimestamp();

            ChooseG.addComponents(new Discord.MessageButton()
                    .setCustomId("RentGF")
                    .setLabel("Back to Date")
                    .setStyle("SUCCESS")
                    .setEmoji("🌆"));

            if(userOwnedChocolate[place] || userOwnedBook[place] || userOwnedScarf[place] || userOwnedRing[place])
                Profile.addField("Inventaire", stuff);
            else
                Profile.addField("Inventaire", "Vous ne possédez rien...");
                
            await interaction.update({content: "*You seem to hesitate...*", embeds:[Profile], components: [ChooseG]});
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
            let giftC = new Discord.MessageEmbed()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND")
                .setDescription("Voulez-vous vraiment offrir " + gift + " à " + nameGF[indexGF] + ".")
                .setThumbnail(ppGF[indexGF])
                .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                .setTimestamp();

            let confirmGift = new Discord.MessageActionRow()
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

            await interaction.update({content: "*You are hiding the gift behind your back, will you do it... ?*", embeds:[giftC], components: [confirmGift]});
        }
        else if(interaction.customId === "ConfirmGift")
        {
            let place = userDiamondID.indexOf(interaction.user.id);
            feelingGF = feelingGFtmp;
            paidDate = 1;
            if(feelingGF === "Happy")
                userLovePoint[place] =  (Math.floor(Math.random() * 4) + 1) * (indexGF + 1) + userLovePoint[place];
            
            switch(gift)
            {
                case 'du chocolat':
                    userOwnedChocolate[place] = userOwnedChocolate[place] -1;
                    break;
                case 'un livre':
                    userOwnedBook[place] = userOwnedBook[place] -1;
                    break;
                case 'une écharpe':
                    userOwnedScarf[place] = userOwnedScarf[place] -1;
                    break;
                case 'une bague':
                    userOwnedRing[place] = userOwnedRing[place] -1;
                default:
                    break;
            }
            let giftCD = new Discord.MessageEmbed()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND")
                .setDescription("Vous avez offert " + gift + " à " + nameGF[indexGF] + ".")
                .addField("Love point :", userLovePoint[place].toString())
                .setThumbnail(ppGF[indexGF])
                .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                .setTimestamp();
            
            let backDate = new Discord.MessageActionRow()
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
            await interaction.update({content:"☑ Un admin va être notifié afin que vous obteniez votre récompense !\n" + admin + " " + interaction.user.tag + " aimerait toucher sa récompense !", embeds:[], components:[]});
            Client.channels.cache.find(channel => channel.name === channelLogName ).send(new Date().toLocaleString() + " : " + interaction.user.tag + " + " + kkrValueEvent + " " + kkrEmoji);
        }
    }

    else if(interaction.isSelectMenu())
    {
        if(interaction.customId === "Player")
        {

            let mise = new Discord.MessageSelectMenu()
                .setCustomId("Bet")
                .setPlaceholder("Montant de la mise ...");
            let nBoucle = 0;
            bets.forEach(element => {
                mise.addOptions({
                    label: element + " " + kkrEmoji ,
                    description: descrBets[nBoucle],
                    value: valueBets[nBoucle]
                    });
                nBoucle++;
            }); 

            let msgMise = new Discord.MessageActionRow()
                .addComponents(mise);

            if(Number(interaction.values[0]) >= 2)
            {
                nbPlayers = interaction.values;
                await interaction.update({content: "Ok, vous allez jouer à " + nbPlayers, components: [msgMise]});
            }
            else
                await interaction.update({content: "Something might went wrong...", components: []});
        }
        if(interaction.customId == "Bet")
        {
            let ready = new Discord.MessageActionRow()
                .addComponents(new Discord.MessageButton()
                    .setCustomId("Ready")
                    .setLabel("Prêt !")
                    .setStyle("SUCCESS")
                    .setEmoji("🗡"))
                .addComponents(new Discord.MessageButton()
                    .setCustomId("Stop")
                    .setLabel("Annuler le combat")
                    .setStyle("SECONDARY")
                    .setEmoji("❌"));

            if(Number(interaction.values[0]) >= 100)
            {
                nbMise = Number(interaction.values);
                await interaction.update({content: "Vous avez misé **" + nbMise + "** " + kkrEmoji + "\n Pour lancer le combat, tous les joueurs clique sur **prêt** \n **" + rdyP + "/" + nbPlayers + "** prêts", components: [ready]});
            }
            else
                await interaction.update({content: "Something might went wrong...", components: []});
        }
    }
});

Client.login(process.env.TOKEN);