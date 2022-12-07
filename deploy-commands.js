require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commandInfo = fs.readFileSync(path.join(__dirname, "/data/commands.json"));
global.infos = JSON.parse(commandInfo);

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));



console.log(commandFiles);

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const guild_id = "500746367837274125"; // test serv Id
// const optc_guild = "238332843602739213";; // official serv

rest.put(Routes.applicationGuildCommands("951907092304891955", guild_id), { body: commands })
    .then(() => console.log('Commande envoyée bg!'))
    .catch(console.error);