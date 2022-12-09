module.exports = {
    name: 'interactionCreate',
    once: false,
    execute(interaction) {

        console.log(interaction.isChatInputCommand());
        console.log(interaction.isModalSubmit());

        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            console.log(command);
            if (!command) return;

            try {
                command.execute(interaction);
            } catch (err) {
                console.log(err);
                interaction.reply({ content: "Something went wrong ... :/", ephemeral: true });
            }
        } else if (interaction.isModalSubmit()) {
            const modal = interaction.customId;
            console.log(modal + " received");

            switch (modal) {
                case "eventForm":
                    require("../reaction/eventForm").execute(interaction);
                    break;
                case "feedbackForm":
                    require("../reaction/feedbackForm").execute(interaction);
                    break;
                case "duel":
                    require("../reaction/duelForm").execute(interaction);
                    break;
                default:
                    break;
            }
        } else if (interaction.isButton()) {
            const btnid = interaction.customId;
            console.log(btnid + " clicked");

            if (btnid.startsWith('Start_d')){
                require("../buttons/duel_handler/Start_d.js").execute(interaction);
            }
            else if (btnid.startsWith('GG|')) {
                require("../buttons/duel_handler/gg.js").execute(interaction);
            }

            switch (btnid) {
                case "Ready_d":
                    require("../buttons/duel_handler/Ready_d.js").execute(interaction);
                    break;
                case "Cancel_d":
                    require("../buttons/duel_handler/Cancel_d.js").execute(interaction);
                    break;
                case "Room_+":
                case "Room_n":
                    require("../buttons/duel_handler/Room_d.js").execute(interaction);
                    break;
                case "Synth_d":
                    require("../buttons/duel_handler/Synth_d.js").execute(interaction);
                    break;
                default:
                    break;
            }
        } else return;
    }
}
