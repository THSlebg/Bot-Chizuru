require('dotenv').config()

const { table } = require("console");
const { channel } = require("diagnostics_channel");

const { title, env } = require('process');
const { Client, GatewayCloseCodes, GatewayIntentBits } = require('discord.js');
const client = new Client( { intents: GatewayIntentBits.Guilds});
const { registerEvents, registerCommands } = require('./utils.js');

registerEvents(client);
registerCommands(client);

client.login(process.env.TOKEN);