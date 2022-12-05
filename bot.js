require('dotenv').config()
const { REST } = require('@discordjs/rest');
const { Client, SlashCommandBuilder, GatewayIntentBits, Routes } = require("discord.js");
const fs = require("fs");
const Discord = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.commands = new Discord.Collection();

let clientId = '951907092304891955';
let guildId = '238332843602739213';

const commandFiles = fs.readdirSync(`${__dirname}/commands/`).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`${__dirname}/commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", async () => {
    client.user.setActivity('Bon rétablissement', { type: 'CUSTOM' })
    let commandMap = client.commands.map(element => {
        return new SlashCommandBuilder()
            .setName(element.name)
            .setDescription(element.description)
            .addStringOption(element.option)
            .toJSON();
    });

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commandMap });
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;
    try {
        await client.commands.get(interaction.commandName).execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply({ content: "Something went wrong!", ephemeral: true });
    }
});


client.login(process.env.TOKEN);