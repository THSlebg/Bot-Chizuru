const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('alpha')
        .setDescription('Join the alpha, participate dand enjoy'),
    async execute(interaction) {
        interaction.reply("**Informations :** \nBienvenue sur l'alpha du bot, tout le staff vous remercie de votre participation.\nPour afficher la liste des commandes, faites /help.\nSi vous souhaitez nous partager vos retours, /feedback.\nPour commencer, faites /diamond.");
    }
}