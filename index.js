require('dotenv').config()

const { Client, GatewayCloseCodes, GatewayIntentBits } = require('discord.js');
const client = new Client( { intents: GatewayIntentBits.Guilds});
const { registerEvents, registerCommands } = require('./utils.js');

registerEvents(client);
registerCommands(client);

client.login(process.env.TOKEN);