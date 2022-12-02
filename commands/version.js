const version = require("../package.json").version;

module.exports = {
    name: "patchnote",
    description: "Shows the patchnotes for the current version of the bot.",
    option: null,
    execute(interaction) {
        return interaction.reply({
            content: `The current version of this bot is ${version}.`
        });
    }
}