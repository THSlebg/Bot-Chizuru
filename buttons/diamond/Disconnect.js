
module.exports = {
    async execute(interaction) {
        if(interaction.message.interaction.user.id === interaction.member.user.id) {
            // interaction.update({content: "...", embeds : [], components: []});
            interaction.message.delete();
        }
        else 
        {
            interaction.reply({content: "Je suis sincèrement désolé mon adorable " + interaction.member.user.username + " mais cette instance est reservé à une personne que j'apprécie bien plus que toi...", ephemeral: true});
        }
    }
}