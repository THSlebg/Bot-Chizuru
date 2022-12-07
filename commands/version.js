const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');

const version = infos.version;

let datafile = version.errmsg;
fs.readFile(infos.patchnote.readme, infos.patchnote.charset, (err, datas) => {
    if (err) {
        console.error(err);
        return;
    }
    datas = datas.toString();
    const pos1 = datas.indexOf(version.sep[0]);
    const pos2 = datas.indexOf(version.sep[1]);
    datafile = datas.substring(pos1 + version.sep[0].length, pos2).trim();    
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName(version.name)
        .setDescription(version.description),
    async execute(interaction) {
        await interaction.reply(version.reply + datafile);
    }
}