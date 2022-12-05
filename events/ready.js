const ActivityType = require ('discord.js')

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log('bot on');
        client.user.setPresence({
            activities: [{ name: `rent! | / commands on dev`, type: ActivityType.Playing }],
          });
    }
}