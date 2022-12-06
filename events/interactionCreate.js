module.exports = {
    name: 'interactionCreate',
    once: false,
    execute(interaction) {

        console.log(interaction.isChatInputCommand())
        console.log(interaction.isModalSubmit())

        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            console.log(command)
            if (!command) return;

            try {
                command.execute(interaction);
            } catch (err) {
                console.log(err);
                interaction.reply({ content: "Something went wrong ... :/", ephemeral: true });
            }
        } else if (interaction.isModalSubmit()) {
            const modal = interaction.customId
            console.log(modal + " received")
            //ola
            if (modal === "eventForm") { require("../reaction/eventForm").execute(interaction) }
            else if (modal === "feedbackForm") { require("../reaction/feedbackForm").execute(interaction) }
            else if (modal === "duel") { require("../reaction/duelForm").execute(interaction) }
        } else if (interaction.isButton()) {
            const btnid = interaction.customId
            console.log(btnid + " clicked")

            if (btnid === "Ready_d") { require("../buttons/duel_handler/Ready_d.js").execute(interaction) }
            else if (btnid === "Cancel_d") { require("../buttons/duel_handler/Cancel_d.js").execute(interaction) }
            else if (btnid === "Room_+" || btnid === "Room_n") { require("../buttons/duel_handler/Room_d.js").execute(interaction) }
            else if (btnid === "Synth_d") { require("../buttons/duel_handler/Synth_d.js").execute(interaction) }
        } else return;
    }
}
