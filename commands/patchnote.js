const fs = require('fs');

const { SlashCommandBuilder } = require('discord.js');

const patchnote = infos.patchnote;

let datafile = patchnote.errmsg;
fs.readFile(patchnote.readme, patchnote.charset, (err, datas) => {
    if (err) {
        console.error(err);
        return;
    }
    datas = datas.toString();
    datafile = datas.substring(datas.indexOf(patchnote.sep));    
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName(patchnote.name)
        .setDescription(patchnote.description),
    async execute(interaction) { // should read the readme.md file
        await interaction.reply(datafile);
    }
}