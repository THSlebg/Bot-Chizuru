const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

    let commandTable = ["rent!date", "rent!hi", "rent!help", "rent!version", "rent!event", "rent!setEvent", "rent!log", "rent!testLog", "rent!makeLog", "rent!embedHelp", "rent!duel", "rent!roll", "rent!score", "rent!setEmoji", "rent!patchnote", "rent!feedback", "rent!alpha"];
    let descrTable = ["Basic command, you can check if the bot is working", "Say Hello to Chizuru", "Display all bot's commands", "Display bot version", "Display current event information", "Custom current event | Args : **eventTitle**|**eventPeriod**|**eventDetails**|**eventEligibilty** ", "Change the log channel for bot's logs", "Send a log", "Send a custom log. Args : **memberName**|**kakeraAmount**", "Display all bot's commands into an embed form", "Commence un combat de Harem entre différents membres du serveur", "Set la valeur max pour les rolls lors des duels de Harem", "Fixe le score maximal à atteindre lors des duels de Harem", "Change l'emoji resprésentant les kakeras lorsque le bot envoie un message l'utilisant", "Display latest Version patchnote", "Send feedback to the bot's owner. Args: **<message>**", "Display Alpha information"];

        let i = 0;

        const embed = new EmbedBuilder()
            .setColor("eb4034")
            .setTitle("Command List :")
            .setDescription("*Chizuru-san is so greatful, she lets you use all those following interactions freely with her !* ♥")
            .setThumbnail("https://i.pinimg.com/736x/09/06/bd/0906bdfcecb2a9665bde4d32879b92e5.jpg")
            .setTimestamp();
        
            commandTable.forEach(element => {
                embed.addFields({name: element.toString(), value: descrTable[i]});
                i++;
            });
            
module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedhelp')
        .setDescription('Command list for esthetical triggered people'),
    async execute(interaction) {
        await interaction.reply({ embeds: [embed]});
    }
}