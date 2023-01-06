const { SlashCommandBuilder, ChannelType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const datapath = path.join(__dirname, "..").normalize()

const log = infos.log;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(log.name)
        .setDescription(log.description)
        .addChannelOption(option => option.setName(log.channeloption.name)
            .setDescription(log.channeloption.description)
            .setRequired(log.channeloption.required)
            .addChannelTypes(log.channeloption.types)),
    async execute(interaction) {
        const rawdata = fs.readFileSync(path.join(datapath, log.infospath[0] + interaction.guild.id + log.infospath[1]));
        const data = JSON.parse(rawdata);
        const old = data.id;
        console.log(old);

        //j'aime pas trop ça, mais ça marche
        data.id = interaction.options.getChannel(log.channeloption.name).id;
        data.name = interaction.options.getChannel(log.channeloption.name).name;
        data.type = interaction.options.getChannel(log.channeloption.name).type;
        
        fs.writeFile(path.join(datapath, log.infospath[0] + interaction.guild.id + log.infospath[1]), JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.log(log.errmsg, err);
                return;
            }
            console.log(log.successmsg);
        });
        await interaction.reply(log.reply[0] + data.id + log.reply[1] + old + log.reply[2]);
    }
}