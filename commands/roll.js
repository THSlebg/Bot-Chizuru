require('dotenv').config()

module.exports = {
    name: "patchnote",
    description: "Shows the patchnotes for the current version of the bot.",
    option: null,
    execute(interaction) {
        return interaction.reply({
            content: `this is diamond`
        });
    }
}