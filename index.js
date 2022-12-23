require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: GatewayIntentBits.Guilds });

const fs = require('node:fs');
const path = require('node:path');
const { registerEvents, registerCommands } = require('./utils.js');

const commandInfo = fs.readFileSync(path.join(__dirname, "/data/commands.json"));
global.infos = JSON.parse(commandInfo);

const gfInfo = fs.readFileSync(path.join(__dirname, "/data/girlfriend/girlfriends.json"));
global.gf = JSON.parse(gfInfo);

global.duelList = new Map();
global.index = new Map();
global.userRent = new Map();


registerEvents(client);
registerCommands(client);

client.login(process.env.TOKEN);