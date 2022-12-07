require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: GatewayIntentBits.Guilds });

const fs = require('node:fs');
const path = require('node:path');

const commandInfo = fs.readFileSync(path.join(__dirname, "/data/commands.json"));
global.infos = JSON.parse(commandInfo);
const { registerEvents, registerCommands } = require('./utils.js');

global.duelList = new Map();

registerEvents(client);
registerCommands(client);

client.login(process.env.TOKEN);