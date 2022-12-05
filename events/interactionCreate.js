// const path = require('path');
// let projectpath = path.join(__dirname, "..")
// let datapath = path.normalize(projectpath)
// let reactionpath = fs.readFileSync(path.join(datapath, "reaction/eventForm.js"));
// const eventForm = require(reactionpath)

const eventForm = require("../reaction/eventForm");
const feedbackForm = require("../reaction/feedbackForm");
const duelForm = require("../reaction/duelForm");


module.exports = {
    name: 'interactionCreate',
    once: false,
    execute(interaction){

        console.log(interaction.isChatInputCommand())
        console.log(interaction.isModalSubmit())

        if(interaction.isChatInputCommand()){
        
        const command = interaction.client.commands.get(interaction.commandName);
        console.log(command)
        if(!command) return;

        try {
            command.execute(interaction);
        }
        catch (err) {
            console.log(err);
            interaction.reply({ content: "Something went wrong ... :/", ephemeral: true});
        }
        }

        if(interaction.isModalSubmit()){

        const modal = interaction.customId
        console.log(modal)

        if      (modal === "eventForm")             {eventForm.execute(interaction)}
        else if (modal === "feedbackForm")          {feedbackForm.execute(interaction)}
        else if (modal === "duel")                  {duelForm.execute(interaction)}

        }
    }
}
