require('dotenv').config()

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: GatewayIntentBits.Guilds });
const { registerEvents, registerCommands } = require('./utils.js');

global.duelList = new Map();

registerEvents(client);
registerCommands(client);

client.login(process.env.TOKEN);