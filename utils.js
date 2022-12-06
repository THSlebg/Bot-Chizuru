const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

exports.registerEvents = (client) => {
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    console.log(eventFiles);

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once)
            client.once(event.name, (...args) => event.execute(...args));
        else
            client.on(event.name, (...args) => event.execute(...args));
    }
}

exports.registerCommands = (client) => {
    client.commands = new Collection();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    console.log(commandFiles)

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        client.commands.set(command.data.name, command);
    }
}