const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require("discord.js");

module.exports = {
    async execute(interaction) {
        const Home = new EmbedBuilder()
                .setColor("843dff")
                .setTitle("ダイヤモンド - DIAMOND")
                .setDescription("*Diamond est une application de RGF, un service de location de petites-amies.*\n*Cherchez la copine de vos rêves, louez ses services et passez un moment idyllique que vous n'oublierez jamais...*")
                .setThumbnail("https://randomc.net/image/Kanojo%20Okarishimasu/Kanojo%20Okarishimasu%20-%2001%20-%20Large%2007.jpg")
                .addFields({name: ":mobile_phone: Navigation :", value: "> Home Page \n> Profile Page \n> Rent Page \n> Shop Page\n> Casino Page"}, {name: ":yen: Prix moyen : ", value: "17.500 ¥ / heure"})
                .setFooter({text:"Diamond Inc. © - Bringing the best for you"})
                .setTimestamp();

            var Navigation = new ActionRowBuilder()
                .addComponents(new ButtonBuilder()
                    .setCustomId("Profile")
                    .setLabel("Profile")
                    .setStyle(ButtonStyle.Success)
                    .setEmoji("🤹‍♀️"))
                .addComponents(new ButtonBuilder()
                    .setCustomId("GF")
                    .setLabel("GirlFriends")
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji("💃"))
                .addComponents(new ButtonBuilder()
                    .setCustomId("Shop")
                    .setLabel("Shop")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("🛒"))
                .addComponents(new ButtonBuilder()
                    .setCustomId("Lottery")
                    .setLabel("Lottery")
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji("🎊"))
                .addComponents(new ButtonBuilder()
                    .setCustomId("Disconnect")
                    .setLabel("Exit")
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji("❌"));
            
                    //paidDateUser[userDiamondID.indexOf(interaction.user.id)] = 0; - no double date or more per user
                if (interaction.isChatInputCommand()){
                    await interaction.reply({embeds:[Home], components: [Navigation]});
                }
                else {
                    await interaction.update({content: " ", embeds:[Home], components: [Navigation]});
                }
    }
}