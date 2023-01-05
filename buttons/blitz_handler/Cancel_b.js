module.exports = {
    async execute(interaction) {
        console.log("Duel canceled →" + blitzList.delete(interaction.guild));
        await interaction.update({ content: "C'était cool de me déranger pour ça en tout cas... ", embeds: [], components: [] });
    }
}